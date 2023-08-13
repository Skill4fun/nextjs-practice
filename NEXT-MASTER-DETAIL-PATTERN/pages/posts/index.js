import Link from 'next/link';

const PostList = ({ posts }) => {

  return (
    <>
      <h1>List of Posts:</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`} passHref /*if it has a child which is not an anchor tag*/ >
              <p>Post ID: {post.id}</p>
              <h2>Title: {post.title}</h2>
            </Link>
            <hr />
          </div >
        )
      })}
    </>
  )
}

export default PostList;


export async function getStaticProps() {
  const response = await fetch(`http://jsonplaceholder.typicode.com/posts`)
  const data = await response.json();

  return {
    props: {
      posts: data,
    }
  };
}