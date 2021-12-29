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

  const replyComment = (textareaElement, username, id, isReply = false) => {
    const newComment = {
      // "id": 1,
      "content": textareaElement.value,
      "createdAt": '1 minute ago',
      "score": 0,
      "replyingTo": username,
      "user": currentUser
    }
    if (isReply){
      comments.forEach((comment, index) => {
        if (comment.id === id) {
          const newComments = [...comments]
          newComments[index].replies = [...comment.replies, newComment]
          updateComments(newComments)
        }
      })
    } else {
      console.log('updating comment', newComment)
    }
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
                submitComment={(textareaElement, isReply) => replyComment(textareaElement, comment.user.username, comment.id, isReply)}
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
                        submitComment={(textareaElement, isReply) => replyComment(textareaElement, reply.user.username, comment.id, isReply )}
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
