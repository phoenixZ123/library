import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { auth } from "../firebase";
export const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "log_in": {
      return { ...state, user: action.payload };
    }
    case "log_out": {
      return { ...state, user: null };
    }
    case "auth_ready": {
      return { ...state, authReady: true };
    }
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    authReady: false,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "auth_ready" });
      if (user) {
        dispatch({ type: "log_in", payload: user });
      } else {
        dispatch({ type: "log_out" });
      }
    });
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
