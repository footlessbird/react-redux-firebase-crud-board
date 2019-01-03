import React from "react";
import moment from 'moment'

const Comment = ({comment}) => {
  return (
      <div className="card z-depth-1" id="comment-box">
        <div className="card-content">
            <h6>{comment.comment} </h6>
            <span className="grey-text">by {comment.authorFirstName}</span>
            <div className="grey-text">{moment(comment.createdAt).calendar()}</div>
        </div>
      </div>
  );
};

export default Comment;
