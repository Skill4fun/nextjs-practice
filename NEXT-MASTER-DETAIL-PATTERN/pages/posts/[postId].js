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
  return {
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