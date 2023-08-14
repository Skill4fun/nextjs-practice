import { useRouter } from 'next/router';

const Post = ({ post }) => {
  const router = useRouter();

  //until the props is not available in the component loading fallback page appears, nextjs is generating HTML and Json in the background.. (we cant access to id/title/body yet, because fallback key is set true in getStaticPaths)
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div>
        <h2>{post.id}</h2>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </>
  )
}

export default Post;


//getStaticPaths is to inform nextjs of the possible values that postId.js page should be staticly generated for
export async function getStaticPaths() {
  //dinamically fetch all the post IDs (100pcs)

  const response = await fetch(`http://jsonplaceholder.typicode.com/posts`)
  const data = await response.json();
  const paths = data.map(post => {
    return {
      params: {
        postId: `${post.id}`, //it has to be stringified, so use `${}`
      }
    }
  })

  return {
    //hardcoded paths object:


    paths: [
      {
        params: { postId: '1' }
      },
      {
        params: { postId: '2' }
      },
      {
        params: { postId: '3' }
      },
    ],
    fallback: true,
  }
  /*
 
  //dinamically generated paths object:
  paths: paths,
  fallback: false, //fallback key is mandatory, can be: false/true/'blocking'
}
  */
}

////fallback key set to...:
//- FALSE:
// 1. The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
// 2. If fallback is set to false, then any paths not returned by getStaticPaths will result in 404 page.
// 3. When to use: 
// The false value is most suitable if you have an appllication with a small number of paths to pre - render.
// When new pages are not added often.
// A blog site with a few articles is a good example
//- TRUE:
// 1. The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
// 2. The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a "fallback" version of the page on the first request to such a path
// 3. In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.
// 4. When that's done, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user perspective, the page will be swapped from the fallback page to the full page.
// 5. At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.



//context paramater is an object which contains a key called params, 
//in this case it contains the 'postId' route paramater
export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.postId}`);
  const data = await response.json();

  //when we try to fetch the 101. post but we only have 100, 404 page appears using notFound set to TRUE:
  if (!data.id) {
    return {
      notFound: true,
    }
  }


  console.log(`Gererating page for /posts/${params.postId}`);

  return {
    props: {
      post: data,
    },
  }
}