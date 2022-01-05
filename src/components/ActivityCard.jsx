import React, { useState } from "react";
import IncomingCall from "../images/incoming-call.svg";
import OutgoingCall from "../images/outgoing-call.svg";

const ActivityCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    id,
    time,
    direction,
    from,
    to,
    duration,
    call_type,
    via,
    is_archived,
  } = props.data;

  const call_duration = duration / 60 + " mins " + (duration % 60) + " secs";
  return (
    <div className="card">
      <div className="card_inner" onClick={() => setShowDetails(!showDetails)}>
        <div>
          {direction === "outbound" ? (
            <img src={OutgoingCall} alt="" />
          ) : (
            <img src={IncomingCall} alt="" />
          )}
        </div>
        <div className="num_div">
          <p className="to">{to || "Private Number"}</p>
          <p className="from">Via: {via}</p>
        </div>
        <div>
          <span className="span">|</span> {time}
        </div>
      </div>
      {showDetails && (
        <div className="card_details">
          <p>
            {direction}, {call_duration} - {call_type}
          </p>
          <p>From: {from}</p>
          <button className="btn" onClick={() => props.action(id)}>
            {is_archived ? "Restore" : "Archive Call"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
