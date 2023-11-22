import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const SidebarChatItem = ({ usuario }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActive } = chatState;
  const onClick = () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });
  };

  return (
    <div
      className={` chat_list ${usuario.uid === chatActive && "active_chat"}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
