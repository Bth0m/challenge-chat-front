import React from "react";

export const OutgoingMessage = ({ msg }) => (
  <div className="outgoing_msg">
    <div className="sent_msg">
      <p>{msg.mensaje}</p>
    </div>
  </div>
);
