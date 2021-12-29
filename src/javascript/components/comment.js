import React from "react";
import NewComment from "./newComment";
import VotesCounter from './votesCounter'

const Comment = ({ currentUser, comment }) => {
  let updating = false
  const { content, score, user, createdAt, replyingTo } = comment

  const [commentScore, updateCommentScore] = React.useState(score)

  const updateCounter = (event) => {
    if(event.currentTarget.innerText === '+'){
      updateCommentScore(commentScore + 1)
    } else {
      if (commentScore > 0){
        updateCommentScore(commentScore - 1)
      }
    }
  }

  const commentAction = (event, action) => {
    const commentElement = event.currentTarget.parentNode.parentNode.parentNode

    switch (action) {
      case 'reply':
        event.currentTarget.parentNode.parentNode.nextSibling.classList.toggle('hidden');
        break;

      case 'update':
        const newEl = commentElement.querySelector('.comment-content')
        console.log('updating', newEl)
        break;

      case 'delete':
        console.log('deleting')
        window.alert('Comment has been deleted')
        commentElement.remove()
        break;

      default:
        break;
    }
  }

  const userReplyingTo = replyingTo ? `@${replyingTo}` : null
  // renders the 'you' identifier if post belongs to current user
  const userIdentifier = (user.username === currentUser.username ? <span className='user-identifier'>you</span> : null)
  // renders the 'delete' and 'edit' buttons if post belongs to current user
  const postUserActions = (user.username === currentUser.username ?
    <>
      <div className='btn delete' onClick={ event => commentAction(event, 'delete') }><i className="fas fa-trash"></i> Delete</div>
      <div className='btn edit' onClick={ event => commentAction(event, 'update') }><i className="fas fa-pen"></i> Edit</div>
    </>
    :
    <div className='btn reply' onClick={ event => commentAction(event, 'reply') }><i className="fas fa-reply"></i> Reply</div>
  )
  return(
    <>
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={process.env.PUBLIC_URL + user.image.png} alt="user profile" className="avatar" />
          <h4 className='comment-username'>{user.username} {userIdentifier}</h4>
          <h5 className='date-created'>{createdAt}</h5>
        </div>
        { updating ?
          <div>Updating</div>
        :
          <p className="comment-content"><span className='user-replying-to'>{userReplyingTo}</span> {content}</p>
        }
        <VotesCounter
          votes={commentScore}
          updateCounter={event => updateCounter(event)}
        />
        <div className="comment-actions">{postUserActions}</div>
      </div>
      <NewComment currentUser={currentUser} text='REPLY' />
    </>
  )
}

export default Comment;
