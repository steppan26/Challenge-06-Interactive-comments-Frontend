import React from "react";
import Comment from "../components/comment";

const CommentsList = ({data}) => {
  return(
    <ul className='comment-list-group'>
      {
        data.comments.map(comment => {
          return(
            <li key={comment.id}>
              <Comment
                  content={comment.content}
                  score={comment.score}
                  user={comment.user}
                  createdAt={comment.createdAt}
              />
              { /* if a comment has replies then render those replies as
              comments in another list inside the same <li>*/ }
              {comment.replies.length > 0 ?
                  <ul className='replies'>
                {comment.replies.map(reply => {
                  return (
                      <Comment
                          key={reply.id}
                          content={reply.content}
                          score={reply.score}
                          user={reply.user}
                          createdAt={reply.createdAt}
                          replyingTo={reply.replyingTo}
                      />
                      )
                    })}
                    </ul>
                : null
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default CommentsList;
