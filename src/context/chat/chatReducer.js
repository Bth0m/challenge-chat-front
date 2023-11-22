import { types } from "../../types/types";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.usuarioCargados:
      return {
        ...state,
        users: [...action.payload],
      };
    case types.activarChat:
      if (state.chatActive === action.payload) return state;
      return {
        ...state,
        chatActive: action.payload,
      };

    case types.nuevoMensaje:
      if (
        state.chatActive === action.payload.de ||
        state.chatActive === action.payload.para
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }

    case types.cerrarSesion:
      return {
        uid: "",
        chatActive: null,
        users: [],
        messages: [],
      };

    default:
      return state;
  }
};
