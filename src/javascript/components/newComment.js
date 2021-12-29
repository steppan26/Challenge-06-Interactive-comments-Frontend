import React from "react";

const NewComment = ({ currentUser, text = 'SEND'}) => {
  
  return(
    <div className="comment-reply-wrapper hidden">
      <img src={process.env.PUBLIC_URL + currentUser.image.png} alt="user profile" className="avatar"/>
      <textarea placeholder="Add a comment..." className="comment-reply-input"></textarea>
      <div className="btn-submit">{text}</div>
    </div>
  )
}

export default NewComment;
