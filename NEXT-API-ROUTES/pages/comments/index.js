import { useState } from 'react';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchComments = async () => {
    const response = await fetch(`/api/comments`)
    const data = await response.json();
    setComments(data);
    return data;
  }

  const submitComment = async () => {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);

  }



  return (
    <>
      <input type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Submit Comment</button>

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