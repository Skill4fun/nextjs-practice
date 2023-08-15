import { useState } from 'react';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState([{ comment: '' }]);

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

  const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  }

  const modifyComment = async (commentId, newCommentText) => {
    const response = await fetch(`api/comments/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ newCommentText }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
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
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
            <input type="text"
              value={newComment.comment}
              onChange={(e) => setNewComment(comment[comment.id] = e.target.value, console.log(newComment))}
            />
            <button onClick={() => modifyComment(comment.id, newComment)}>Modify Comment</button>
          </div>
        )
      })}
    </>
  )
}

export default CommentsPage;