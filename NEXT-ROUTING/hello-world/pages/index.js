import Link from 'next/link';
import { useRouter } from 'next/router';

function Home() {

  const router = useRouter();


  const handleClick = () => {
    console.log('Placing your order')

    //Programmatic routing
    router.push('/product')
    // router.replace('/product') //to replace history
  }

  //Client-side routing >> LINK
  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/blog'>
        Blog
      </Link>
      <Link href='/product'>
        Products
      </Link>
      <button onClick={handleClick}>
        Place Order
      </button>
    </div>
  )
}

export default Home;