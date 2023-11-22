import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useSocket } from "../hooks/useSocket";
import { ChatContext } from "./chat/ChatContext";
import { types } from "../types/types";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, handleConnectSocket, handleDisconnectSocket } =
    useSocket("http://localhost:8080");

  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      handleConnectSocket();
    }
  }, [auth, handleConnectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      handleDisconnectSocket();
    }
  }, [auth, handleDisconnectSocket]);

  useEffect(() => {
    socket?.on("user-list", (users) => {
      dispatch({
        type: types.usuarioCargados,
        payload: users,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("message", (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
