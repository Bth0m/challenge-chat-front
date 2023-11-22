import { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();

const initalState = {
  uid: "",
  chatActive: null,
  users: [],
  messages: [],
};

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initalState);

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
