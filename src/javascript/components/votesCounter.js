import React from "react";

const CommentScoreEl = React.forwardRef((props, ref) => {
  return <h4 ref={ref}>{props.props}</h4>
})

const VotesCounter = ({ votes = 0, updateCounter }) => {
  const postScore = React.useRef(null)
  let commentScore = votes

  return(
    <div className="votes-wrapper">
      <div className='increase-votes' onClick={event => updateCounter(event)}>+</div>
      <CommentScoreEl ref={postScore} props={commentScore} />
      <div className='decrease-votes' onClick={event => updateCounter(event)}>-</div>
    </div>
  )
}

export default VotesCounter;
