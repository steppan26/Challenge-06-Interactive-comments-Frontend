import React from "react";

const Comment = ({ content = '', score = 0, user = {}, createdAt = '', replies = [] }) => {
  return(
    <div>
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={user.image.png} alt="user profile" />
          <h3 className='comment-username'>{user.username}</h3>
          <h4 className='date-created'>{createdAt}</h4>
        </div>
        <p>{content}</p>
        <h4>{score}</h4>
      </div>
      <ul className='replies'>
        {
          replies.length > 0 ?
            replies.map(reply => {
              return(
                <div className='comment-list-item'>
                  <div className="comment-header">
                    <img src={reply.user.image.png} alt="user profile" />
                    <h3 className='comment-username'>{reply.user.username}</h3>
                    <h4 className='date-created'>{reply.createdAt}</h4>
                  </div>
                  <p>{reply.content}</p>
                  <h4>{reply.score}</h4>
                </div>
              )
            })
          :
          <div></div>
        }
      </ul>
    </div>
  )
}

export default Comment;
