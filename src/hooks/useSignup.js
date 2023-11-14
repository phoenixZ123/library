import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../firebase";

export const useSignup = () => {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  let signUp = async (email, password) => {
    try {
      setLoading(true);
      //  signal will show to provide signUp func
      let res = await createUserWithEmailAndPassword(auth, email, password);
      setError("");
      setLoading(false);
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, signUp };
};
