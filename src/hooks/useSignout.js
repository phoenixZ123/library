import { signOut } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../firebase";

export const useSignout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    try {
      setLoading(true);
      let out = await signOut(auth);
      setLoading(false);
      setError("");
      return out.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, logOut };
};
