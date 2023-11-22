import React from "react";

export const IncomingMessage = ({ msg }) => (
  <div className="incoming_msg">
    <div className="incoming_msg_img">
      <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
    </div>
    <div className="received_msg">
      <div className="received_withd_msg">
        <p>{msg.mensaje}</p>
      </div>
    </div>
  </div>
);
