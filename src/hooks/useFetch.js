import React, { useState } from "react";
import { useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    let options = {
      signal,
      method,
    };
    setLoading(true);
 // fetch data
 let fetchData = () => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw Error("something was wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
       })
      .catch((e) => {
        setError(e.message);
      });
  };
    if (method == "POST" && postData) {
        
      options = {
        ...options,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      };
      fetchData()
    }
    if(method=="GET"){
        fetchData()
    }
   

    // cleanup func
    return () => {
      abortController.abort();
    };
  }, [url, postData]);

  return { setPostData, data, loading, error };
};
