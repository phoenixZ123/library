import React, { useState } from 'react'
import { useEffect } from 'react'
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        let abortController=new AbortController();
        let signal=abortController.signal;

        setLoading(true)
        fetch(url,{
            signal
        })
            .then(res => {
                if (!res.ok) {
                    throw Error("something was wrong");
                }
                return res.json()
            })
            .then(data => {
                setData(data);   
                setError(null);
                setLoading(false)

            }).catch(e => { setError(e.message); })

            // cleanup func
        return ()=>{
            abortController.abort();
        }
    }, [url])

    return { data, loading, error }
}



