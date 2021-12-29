import React from "react";

const VotesCounter = ({ votes = 0, updateCounter }) => {
  return(
    <div className="votes-wrapper">
      <div className='increase-votes' onClick={event => updateCounter(event)}>+</div>
      <h4>{votes}</h4>
      <div className='decrease-votes' onClick={event => updateCounter(event)}>-</div>
    </div>
  )
}

export default VotesCounter;
