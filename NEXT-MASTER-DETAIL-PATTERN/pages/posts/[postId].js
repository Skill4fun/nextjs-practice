const Post = ({ post }) => {
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


//getStaticPaths to inform nextjs of the possible values that postId.js page should be staticly generated for
export async function getStaticPaths() {
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
    /*
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
    fallback: false,
  }
  */

    //dinamically generated paths object:
    paths: paths,
    fallback: false,

  }

}


//context paramater is an object which contains a key called params, 
//in this case it contains the 'postId' route paramater
export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.postId}`);
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  }
}