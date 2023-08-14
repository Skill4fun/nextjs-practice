const ProductList = ({ products }) => {
  return (
    <>
      <h1>List of Products</h1>
      {products.map(product => {
        return (
          <div key={product.id}>
            <h2>
              {product.id} {product.title} {product.price}
            </h2>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default ProductList;

export async function getStaticProps() {
  console.log("Generating / Regenerating ProductList..")

  const response = await fetch(`http://localhost:4000/products`);
  const data = await response.json();

  return {
    props: {
      products: data,
    },
    revalidate: 30, //asking Next.js to revalidate this ProductList page every specified secs, which ensure the updated products data is served almost immediately without having to rebuild the entire app
  }
}
