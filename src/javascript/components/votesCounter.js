import React from "react";

const VotesCounter = ({ votes = 0 }) => {
  return(
    <>
      <div class="votes-wrapper">
        <div class='increase-votes'>+</div>
        <h4>{votes}</h4>
        <div class='decrease-votes'>-</div>
      </div>
    </>
  )
}

export default VotesCounter;
