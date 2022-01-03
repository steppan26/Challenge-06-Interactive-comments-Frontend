import React from "react";

const ModalDestroy = ({ action }) => {
  return(
    <>
      <div className="modal-background">
        <div className="modal-wrapper">
          <h3 className="modal-title">Delete comment</h3>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
          <div className="buttons-wrapper">
            <div className="btn cancel" onClick={() => action('cancel')}>NO, CANCEL</div>
            <div className="btn delete" onClick={() => action('delete')}>YES, DELETE</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDestroy;
