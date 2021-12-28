import React from "react";
import Comment from "../components/comment";

const CommentsList = ({data}) => {
  console.log(data)
  const current_user = data.currentUser;
  const comments = data.comments;
  console.log(current_user, comments)
  return(
    <ul className='comment-list-group'>
      {
        comments.map(comment => {
          return(
            <li key={comment.id}>
              <Comment content={comment.content} score={comment.score} user={comment.user} createdAt={comment.createdAt} />
              <ul className='replies'>
                {
                  comment.replies.length > 0 ?
                    comment.replies.map(reply => {
                      return (
                        <Comment content={reply.content} score={reply.score} user={reply.user} createdAt={reply.createdAt} />
                      )
                    })
                    :
                    <div></div>
                }
              </ul>
            </li>
          )
        })
      }
    </ul>
  )
}

export default CommentsList;
