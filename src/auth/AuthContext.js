import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchWithToken, fetchWithoutToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: 1,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  //<----------login----------------->//
  const login = async (email, password) => {
    const resp = await fetchWithoutToken("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
    }

    return resp.ok;
  };
  //----------------------------------//

  //<----------register----------------->//
  const register = async (nombre, email, password) => {
    const resp = await fetchWithoutToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      return true;
    }

    return resp.msg;
  };
  //----------------------------------//

  //<----------token----------------->//
  const checkToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await fetchWithToken("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);
  //----------------------------------//

  //<----------logout----------------->//
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: types.cerrarSesion,
    });
    setAuth({
      checking: false,
      logged: false,
    });
  };
  //----------------------------------//
  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        checkToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
