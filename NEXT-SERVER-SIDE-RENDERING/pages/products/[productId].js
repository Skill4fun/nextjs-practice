import { useRouter } from 'next/router';

const Product = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div key={product.id}>
        <h2>
          {product.id} {product.title} {product.price}
        </h2>
        <p>{product.description}</p>
        <hr />
      </div>
    </>
  )
}

export default Product;


export async function getStaticProps(context) {
  const { params } = context;
  console.log(`Regenerating Product ID: ${params.productId}...`)
  const response = await fetch(`http://localhost:4000/products/${params.productId}`);
  const data = await response.json();

  return {
    props: {
      product: data,
    },
    revalidate: 10,
  }
}

//pages for productId 2-3 is not generated at build time this case, only product 1
export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: '1' } }],
    fallback: true
  }
}
