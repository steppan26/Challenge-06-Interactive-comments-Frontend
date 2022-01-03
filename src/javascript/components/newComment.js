import React from "react";

const NewComment = ({ currentUser, text = 'SEND', content = '', customClass = '', isReply = false, submitComment}) => {
  return(
    <div className={('comment-reply-wrapper ' + customClass)}>
      { text.toUpperCase() === 'UPDATE' ?
        null
      :
        <img src={currentUser.image.png} alt="user profile" className="avatar"/>
      }
      <textarea placeholder="Add a comment..." className="comment-reply-input" defaultValue={content}></textarea>
      <div className="btn-submit" onClick={event => submitComment(event)}>{text}</div>
    </div>
  )
}

export default NewComment;
