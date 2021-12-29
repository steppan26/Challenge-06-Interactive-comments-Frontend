import React from "react";
import Comment from "../components/comment";
import NewComment from "../components/newComment";

const CommentsList = ({data}) => {
  const { currentUser } = data
  const [ comments, updateComments] = React.useState(data.comments)
  const commentElRef = React.useRef();
  const replyElRef = React.useRef();

  const submitComment = (textareaElement) => {
    console.log('new comment', textareaElement.value)
    const newComment = {
      // "id": 1,
      "content": textareaElement.value,
      "createdAt": '1 minute ago',
      "score": 0,
      "user": currentUser,
      "replies": []
    }
    updateComments([...comments, newComment])
    textareaElement.value = ''
  }

  return(
    <>
      <ul className='comment-list-group'>
        { comments.map(comment => {
          return(
            <li key={comment.id} ref={commentElRef}>
              <Comment
                currentUser={currentUser}
                comment={comment}
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
                      />
                    </li>
                  )
                })}
                </ul>
                : null
              }
            </li>
          )
        })}
      </ul>
      <NewComment currentUser={currentUser}
        submitComment={(textareaElement) => submitComment(textareaElement)}
      />
    </>
  )
}

export default CommentsList;
