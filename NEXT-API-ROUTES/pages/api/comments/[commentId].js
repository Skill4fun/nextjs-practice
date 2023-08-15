import { comments } from '../../../data/comments';
//Dinamic routes solution for comments

export default function handler(req, res) {
  const { commentId } = req.query;
  //find comment based on its ID:
  const comment = comments.find((comment) => comment.id === parseInt(commentId));

  //send back the specified comment
  res.status(200).json(comment);
}