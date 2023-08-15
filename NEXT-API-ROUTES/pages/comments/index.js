import { useState } from 'react';



const CommentsPage = () => {
  const [comments, setComments] = useState([]);


  const fetchComments = async () => {
    const response = await fetch(`/api/comments`)
    const data = await response.json();
    setComments(data);
    return data;
  }

  return (
    <>
      <button onClick={fetchComments}>Load Comments</button>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            <h1 >Comment ID: {comment.id}</h1>
            <p>{comment.text}</p>
          </div>
        )
      })}
    </>
  )
}

export default CommentsPage;