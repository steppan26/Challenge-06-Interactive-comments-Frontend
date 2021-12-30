import React from "react";
import Comment from "../components/comment";
import NewComment from "../components/newComment";

const CommentsList = ({data}) => {
  const { currentUser } = data
  const [ comments, updateComments] = React.useState(data.comments)
  const commentElRef = React.useRef();
  const replyElRef = React.useRef();
  const [nextId, setNextId] = React.useState(5)

  const getCommentId = () => {
    setNextId(nextId => ++nextId)
    return nextId
  }

  const submitComment = (event) => {
    const textareaElement = event.currentTarget.parentNode.querySelector('textarea')
    const newComment = {
      "id": getCommentId(),
      "content": textareaElement.value,
      "createdAt": '1 minute ago',
      "score": 0,
      "voted": [],
      "user": currentUser,
      "replies": []
    }
    updateComments([...comments, newComment])
    textareaElement.value = ''
  }

  const replyComment = (attributes = {}) => {
    const { isReply, textareaElement, username, originalCommentId, commentId} = attributes
    if (isReply){
      const newComment = {
        "id": getCommentId(),
        "content": textareaElement.value,
        "createdAt": '1 minute ago',
        "score": 0,
        "voted": [],
        "replyingTo": username,
        "user": currentUser
      }
      comments.forEach((comment, index) => {
        if (comment.id === originalCommentId) {
          const newComments = [...comments]
          newComments[index].replies = [...comment.replies, newComment]
          updateComments(newComments)
        }
      })
    } else {
      const newComments = comments.map(comment => {
        if (comment.id === commentId) {
          comment.content = textareaElement.value
        } else {
          comment.replies.forEach(reply => {
            if (reply.id === commentId) {
              reply.content = textareaElement.value
            }
          })
        }
        return comment
      })
      updateComments(newComments)
    }
  }

  const updateScore = (score = null, commentId = 0) => {
    if (score) {
        const newComments = comments.map(comment => {
          if (comment.id === commentId) {
            comment.voted.push(currentUser.username)
          } else {
            comment.replies.forEach(reply => {
              if (reply.id === commentId) {
                comment.voted.push(currentUser.username)
              }
            })
          }
          return comment
        })
        updateComments(newComments)
    } else {
      const newComments = comments.map(comment => {
        if (comment.id === commentId) {
          comment.voted.splice(comment.voted.indexOf(currentUser.username), 1);
        } else {
          comment.replies.forEach(reply => {
            if (reply.id === commentId) {
              comment.voted.splice(comment.voted.indexOf(currentUser.username), 1);
            }
          })
        }
        return comment
      })
      updateComments(newComments)
    }
  }

  const destroyComment = (commentId) => {
    const newComments = []
    comments.forEach((comment) => {
      if (comment.id === commentId) { return }
      else {
        comment.replies = comment.replies.filter(reply => {
          return reply.id === commentId ? false : true
        })
      }
      newComments.push(comment)
    })
    updateComments(newComments)
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
                submitComment={
                  (textareaElement, isReply) => replyComment(
                    {
                      username: comment.user.username,
                      originalCommentId: comment.id,
                      commentId: comment.id,
                      textareaElement,
                      isReply
                    }
                  )}
                  updateScore={(score, comment) => updateScore(score, comment.id)}
                destroyComment={() => destroyComment(comment.id)}
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
                        submitComment={
                          (textareaElement, isReply) => replyComment(
                            {
                              username: reply.user.username,
                              originalCommentId: comment.id,
                              commentId: reply.id,
                              textareaElement,
                              isReply
                            }
                          )}
                          updateScore={(score, comment) => updateScore(score, reply.id)}
                        destroyComment={() => destroyComment(reply.id)}
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
      <NewComment
        currentUser={currentUser}
        submitComment={(event) => submitComment(event)}
      />
    </>
  )
}

export default CommentsList;
