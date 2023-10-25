import React from "react";
import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
  switch(action.type){
    //...state is light,overwrite payload
    case "CHANGE_THEME" : return {...state,theme:action.payload}
    return state;
  }
};

// by wrapping provider component call children
export const ThemeContextProvider = ({ children }) => {
  // state
  const [state, dispatch] = useReducer(ThemeReducer, {
    theme: "light",//light is default para
  });

  const changeTheme = (theme) => {
    // action is {type,payload}
    // payload is change & transfer changes data(dispatch is action)
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };
  const isDark=state.theme == 'dark';//true
  return (
    // destructure to state...
    <ThemeContext.Provider value={{ ...state, changeTheme,isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
