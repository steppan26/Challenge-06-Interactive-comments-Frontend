import React from "react";
import Comment from "../components/comment";

const CommentsList = ({data}) => {
  console.log(data)
  const current_user = data.currentUser;
  const comments = data.comments;
  console.log(current_user, comments)
  return(
    <ul className='comment-list-group'>
      {
        comments.map(comment => {
          return(
            <li key={comment.id}>
              <Comment content={comment.content} score={comment.score} user={comment.user} createdAt={comment.createdAt} replies={comment.replies} />
              <ul className='replies'>
                {
                  comment.replies.length > 0 ?
                    comment.replies.map(reply => {
                      return (
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
            </li>
          )
        })
      }
    </ul>
  )
}

export default CommentsList;
