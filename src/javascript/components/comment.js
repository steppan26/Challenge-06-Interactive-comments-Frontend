import React from "react";
import NewComment from "./newComment";
import VotesCounter from './votesCounter'
import ModalDestroy from "./modalDestroy";

const autoheight = (element) => {
  element.style.height = (element.scrollHeight - 26) + "px";
}

const Comment = ({ currentUser, comment, submitComment, updateScore, destroyComment }) => {
  const [updating, setUpdating] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false)

  const { content, score, user, createdAt, replyingTo } = comment

  const [commentScore, updateCommentScore] = React.useState(score)

  const updateCounter = (event) => {
    let newScore = score
    if(event.currentTarget.innerText === '+'){
      newScore = commentScore === (score - 1) ? score : score + 1
      updateCommentScore(newScore)
    } else {
      if (commentScore > 0){
        newScore = commentScore === (score + 1) ? score : score - 1
        updateCommentScore(newScore)
      }
    }
    if (newScore !== score) {
      if (!comment.voted.includes(currentUser.username)) {
        updateScore(newScore, comment)
      }
    } else {
      updateScore(null, comment)
    }
  }

  async function updateContentEl(element) {
    setUpdating(!updating)
    return await Promise.resolve(element)
  }

  const postComment = (event, isReply = false) => {
    const textareaElement = event.currentTarget.parentNode.querySelector('textarea')
    if (textareaElement.value) {
      if (isReply){
        textareaElement.parentNode.classList.add('hidden')
      } else {
        updateContentEl()
      }
      submitComment(textareaElement, isReply)
      textareaElement.value = ''
    }
  }

  const commentAction = (event, action) => {
    const commentElement = event.currentTarget.parentNode.parentNode.parentNode

    switch (action) {
      case 'reply':
        commentElement.parentNode.querySelector('.comment-reply-wrapper').classList.toggle('hidden');
        break;

      case 'update':
        updateContentEl(commentElement)
          .then(element => {
            if (!element.querySelector('.update-comment')) { return }

            const textareaEl = element.querySelector('.update-comment').querySelector('textarea')
            if (textareaEl){ autoheight(textareaEl) }
          })
        break;

      case 'delete':
        setModalVisible(true)
        document.querySelector('body').classList.add('modal-open')
        break;

      default:
        break;
    }
  }

  const modalAction = (action) => {
    document.querySelector('body').classList.remove('modal-open')
    setModalVisible(false)
    if (action === 'delete'){
      destroyComment()
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
      { modalVisible ? <ModalDestroy action={action => modalAction(action)} /> : null }
      <div className='comment-list-item'>
        <div className="comment-header">
          <img src={process.env.PUBLIC_URL + user.image.png} alt="user profile" className="avatar" />
          <h4 className='comment-username'>{user.username} {userIdentifier}</h4>
          <h5 className='date-created'>{createdAt}</h5>
        </div>
        { updating ?
          <NewComment currentUser={currentUser}
                      text='UPDATE'
                      content={content}
                      customClass="update-comment"
                      submitComment={event => postComment(event)}
          />
          :
          <p className="comment-content"><span className='user-replying-to'>{userReplyingTo}</span> {content}</p>
        }
        <div className="comment-footer">
          <VotesCounter votes={commentScore}
                        updateCounter={event => updateCounter(event)}
          />
          <div className="comment-actions">{postUserActions}</div>
        </div>
      </div>
      <NewComment currentUser={currentUser}
                  text='REPLY'
                  customClass="hidden"
                  submitComment={event => postComment(event, true)}
      />
    </>
  )
}

export default Comment;
