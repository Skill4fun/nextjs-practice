import { comments } from '../../../data/comments';
//Dinamic routes solution for comments

export default function handler(req, res) {
  const { commentId } = req.query;

  if (req.method === 'GET') {

    //find comment based on its ID:
    const comment = comments.find((comment) => comment.id === parseInt(commentId));

    //send back the specified comment
    res.status(200).json(comment);

  } else if (req.method === 'DELETE') {
    //find comment to based on its ID:
    const deletedComment = comments.find((comment) => comment.id === parseInt(commentId));

    //get the index of the comment based on its ID
    const index = comments.findIndex(
      (comment) => comments.id === parseInt(commentId)
    )

    //delete the specified comment from data
    comments.splice(index, 1);

    //send back deleted comment
    res.status(200).json(deletedComment);

  }

  if (req.method === 'PATCH') {
    const { newCommentText } = req.body;

    //find comment based on its ID:
    const modifiedComment = comments.find((comment) => comment.id === parseInt(commentId));

    modifiedComment.text = newCommentText;

    //send back modified comment
    res.status(200).json(modifiedComment);
  }

}

