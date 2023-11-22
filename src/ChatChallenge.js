import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";
import { ChatProvider } from "./context/chat/ChatContext";

export const ChatChallenge = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};
