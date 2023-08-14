import { useRouter } from 'next/router';

const Post = ({ post }) => {
  /*
  const router = useRouter();
  //until the props is not available in the component loading fallback page appears, nextjs is generating HTML and Json in the background.. (we cant access to id/title/body yet, because fallback key is set true in getStaticPaths)
    if (router.isFallback) {
      return <h1>Loading...</h1>
    }
  */

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
    fallback: 'blocking',
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
// 6. When to use:
// The true value is most suitable if your app has a very large number of static pages that depend on data
// e.g. A large e-commerce site:
// You want all product pages to be pre-rendered but if you have a few thousand products, builds can take a really long time. So you may statically generate a small subset of products that are popular and use "fallback: TRUE" for the rest.
// When someone request a page that's not generated yet, the user will see the page with a loading indicator.
// Shortly after, "getStaticProps" finishes and the page will be rendered with the requested data. From then onwards, everyone who requests the same page will get the statically pre-rendered page
// This ensures that users always have a fast experience while preserving fast builds and the benefits of "Static Generation"
//- BLOCKING:
// 1. (same as fallback is set to FALSE or TRUE) The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
// 2. The paths that have not been generated at build time will not result in a 404 page. Instead, on the first request, Next.js will render the page on the server and return the generated HTML.
// 3. When that's done, the browser receives the HTML for the generated path. From the users perspective, it will transition from "the browser is requesting to page" to "the full page is loaded". There is no flash of loading/fallback state.
// 4. At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
// 5. When to use:
// On a UX level, sometimes, people prefer the page to be loaded without a loading indicator if the wait time is a few milli seconds. This helps avoid the layout shift.
// Technical reason: Some crawlers did not support JavaScript. The loading page woud be rendered and then the full page woud be loaded which was causing a problem.
// (Next.js recommends fallback set to TRUE, unless you see a problem with it, which case you can use fallback set to BLOCKING)

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