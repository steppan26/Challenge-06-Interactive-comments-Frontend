import React from "react";
import Comment from "../components/comment";

const CommentsList = ({data}) => {
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
        data.comments.map(comment => {
          return(
            <li key={comment.id}>
              <Comment
                currentUser={data.currentUser}
                commentAction={(action) => commentAction(action, comment.id)}
                content={comment.content}
                score={comment.score}
                user={comment.user}
                createdAt={comment.createdAt}
              />
              { /* if a comment has replies then render those replies as
              comments in another list inside the same <li>*/ }
              { comment.replies.length > 0 ?
                <ul className='replies'>
                { comment.replies.map(reply => {
                  return (
                    <li key={reply.id}>
                      <Comment
                        currentUser={data.currentUser}
                        commentAction={(action) => commentAction(action, reply.id)}
                        content={reply.content}
                        score={reply.score}
                        user={reply.user}
                        createdAt={reply.createdAt}
                        replyingTo={reply.replyingTo}
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
