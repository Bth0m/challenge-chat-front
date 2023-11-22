import React, { useContext } from "react";
import { SidebarChatItem } from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const { uid } = auth;

  return (
    <div className="inbox_chat">
      {chatState.users
        .filter((user) => user.uid !== uid)
        .map((user) => (
          <SidebarChatItem key={user.uid} usuario={user} />
        ))}
      <div className="extra_space"></div>
    </div>
  );
};
