import React from "react";
import VotesCounter from './votesCounter'

const Comment = ({ content = '', score = 0, user = {}, createdAt = '', replyingTo }) => {
  const userReplyingTo = replyingTo ? `@${replyingTo}` : null
  return(
    <>
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={process.env.PUBLIC_URL + user.image.png} alt="user profile" />
          <h4 className='comment-username'>{user.username}</h4>
          <h5 className='date-created'>{createdAt}</h5>
        </div>
        <p><span className='user-replying-to'>{userReplyingTo}</span> {content}</p>
        <VotesCounter votes={score} />
      </div>
    </>
  )
}

export default Comment;
