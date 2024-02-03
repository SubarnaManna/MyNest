import React from "react";
import "../style/review.css";

const Pgreview = (props) => {
  return (
    <>
      <div className="gmail-date-comment">
        <div className="gmail-date">
          <h3>{props.obj.ClientEmail}</h3>
          <p>07/10/2023</p>
        </div>
        <div className="comment">
          <p>
            {props.obj.ClientFeedback}
          </p>
        </div>
      </div>
    </>
  );
};

export default Pgreview;