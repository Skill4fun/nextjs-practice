const PostList = ({ posts }) => {

  return (
    <>
      <h1>List of Posts:</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <p>Post ID: {post.id}</p>
            <h2>Title: {post.title}</h2>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default PostList;


export async function getStaticProps() {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts')
  const data = await response.json();

  return {
    props: {
      posts: data.slice(0, 3)
    }
  };
}