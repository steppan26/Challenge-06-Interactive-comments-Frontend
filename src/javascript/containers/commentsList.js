import React from "react";
import Comment from "../components/comment";

const CommentsList = ({data}) => {
  const { currentUser, comments } = data
  const commentAction = (action, commentId) => {
    switch (action) {
      case 'reply':
        console.log('replying', commentId)
        break;

      case 'update':
        console.log('updating', commentId)
        break;

      case 'delete':
        console.log('deleting', commentId)
        break;

      default:
        break;
    }
  }

  return(
    <ul className='comment-list-group'>
      {
        comments.map(comment => {
          return(
            <li key={comment.id}>
              <Comment
                currentUser={currentUser}
                comment={comment}
                commentAction={(action) => commentAction(action, comment.id)}
              />
              { /* if a comment has replies then render those replies as
              comments in another list inside the same <li>*/ }
              { comment.replies.length > 0 ?
                <ul className='replies'>
                { comment.replies.map(reply => {
                  return (
                    <li key={reply.id}>
                      <Comment
                        currentUser={currentUser}
                        comment={reply}
                        commentAction={(action) => commentAction(action, reply.id)}
                      />
                    </li>
                  )
                })}
                </ul>
                : null
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default CommentsList;
