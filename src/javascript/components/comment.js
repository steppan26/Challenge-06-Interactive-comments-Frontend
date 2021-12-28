import React from "react";
import VotesCounter from './votesCounter'

const Comment = ({ currentUser, commentAction, content = '', score = 0, user = {}, createdAt = '', replyingTo }) => {
  const [commentScore, updateCommentScore] = React.useState(score)
  const userReplyingTo = replyingTo ? `@${replyingTo}` : null
  const updateCounter = (event) => {
    if(event.currentTarget.innerText === '+'){
      updateCommentScore(commentScore + 1)
    } else {
      if (commentScore > 0){
        updateCommentScore(commentScore - 1)
      }
    }
  }
  // renders the 'you' identifier if post belongs to current user
  const userIdentifier = (user.username === currentUser.username ? <span className='user-identifier'>you</span> : null)
  // renders the 'delete' and 'edit' buttons if post belongs to current user
  const postUserActions = (user.username === currentUser.username ?
    <>
      <div className='btn delete' onClick={() => commentAction('delete')}><i className="fas fa-trash"></i> Delete</div>
      <div className='btn edit' onClick={() => commentAction('update')}><i className="fas fa-pen"></i> Edit</div>
    </>
    :
    <div className='btn reply' onClick={() => commentAction('reply')}><i className="fas fa-reply"></i> Reply</div>
  )
  return(
    <>
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={process.env.PUBLIC_URL + user.image.png} alt="user profile" />
          <h4 className='comment-username'>{user.username} {userIdentifier}</h4>
          <h5 className='date-created'>{createdAt}</h5>
        </div>
        <p><span className='user-replying-to'>{userReplyingTo}</span> {content}</p>
        <VotesCounter
          votes={commentScore}
          updateCounter={event => updateCounter(event)}
        />
        <div className="comment-actions">{postUserActions}</div>
      </div>
    </>
  )
}

export default Comment;
