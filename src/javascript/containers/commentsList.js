import React from "react";
import Comment from "../components/comment";

const CommentsList = ({data}) => {
  const { currentUser, comments } = data
  const commentElRef = React.useRef();
  const replyElRef = React.useRef();

  const commentAction = (event, action) => {
    const commentElement = event.currentTarget.parentNode.parentNode.parentNode

    switch (action) {
      case 'reply':
        console.log('replying' )
        break;

      case 'update':
        console.log('updating' )
        break;

      case 'delete':
        console.log('deleting')
        window.alert('Comment has been deleted')
        commentElement.remove()
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
            <li key={comment.id} ref={commentElRef}>
              <Comment

                currentUser={currentUser}
                comment={comment}
                commentAction={(event, action) => commentAction(event, action)}
              />
              { /* if a comment has replies then render those replies as
              comments in another list inside the same <li>*/ }
              { comment.replies.length > 0 ?
                <ul className='replies'>
                { comment.replies.map(reply => {
                  return (
                    <li key={reply.id} ref={replyElRef}>
                      <Comment
                        currentUser={currentUser}
                        comment={reply}
                        commentAction={(event, action) => commentAction(event, action )}
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
