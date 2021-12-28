import React from "react";
import VotesCounter from './votesCounter'

const Comment = ({ content = '', score = 0, user = {}, createdAt = '', replyingTo }) => {
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
  return(
    <>
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={process.env.PUBLIC_URL + user.image.png} alt="user profile" />
          <h4 className='comment-username'>{user.username}</h4>
          <h5 className='date-created'>{createdAt}</h5>
        </div>
        <p><span className='user-replying-to'>{userReplyingTo}</span> {content}</p>
        <VotesCounter
          votes={commentScore}
          updateCounter={event => updateCounter(event)}
        />
      </div>
    </>
  )
}

export default Comment;
