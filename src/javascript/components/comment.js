import React from "react";

const Comment = ({ content = '', score = 0, user = {}, createdAt = '' }) => {
  return(
    <>
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={user.image.png} alt="user profile" />
          <h3 className='comment-username'>{user.username}</h3>
          <h4 className='date-created'>{createdAt}</h4>
        </div>
        <p>{content}</p>
        <h4>{score}</h4>
      </div>
    </>
  )
}

export default Comment;
