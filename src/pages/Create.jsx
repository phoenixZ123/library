// import React from 'react'

import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const Create = () => {
 let {data,loading,error}=useFetch(' http://localhost:2801/books')
  const[title,setTitle]=useState('');
  const[description,setDescription]=useState('');
  const[NewGenres,setNewGenres]=useState('');
  const[genres,setGenres]=useState(["fiction","adven"]);

  const addGenres=()=>{

  }
  
  return (
    <form className="md:max-w-lg mx-auto mt-5">
      <div className="flex flex-wrap mb-6">
        {/* title */}
        <div className="w-96 px-2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
         
          >
            Book Title
          </label>
          <input onChange={e=> setTitle(e.target.value)} value={title}
            className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Enter book title"
          />
          
        </div>
        {/* des */}
        <div className="md:w-full px-2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            
          >
           Book Description
          </label>
          <textarea value={description} onChange={e=> setDescription(e.target.value)}
          type="text"
            className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"          
            placeholder="Enter book description"
          />
          
        </div>
        {/* genres */}
        <div className="w-96 px-2 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
         
          >
            Book Genres
          </label>
          <div className="flex items-center space-x-1">
          <input value={NewGenres} onChange={e=> setNewGenres(e.target.value)}
            className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Enter genres"
          />
           <button onClick={addGenres} className="bg-indigo-500 p-1 rounded-md mb-3">
           <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-4 h-4 text-white" 
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
           </button>
          </div>
          {/* genres show */}
          <div className="flex flex-wrap m-1">
                    {genres.map((g) => (
                      <div key={g} className="m-[2px]">
                        <span className=" rounded-full bg-primary text-white p-1 text-[10px] ">
                          {g}
                        </span>
                      </div>
                    ))}
                  </div>
        </div>
        {/* add book btn*/}
        <button className="w-full bg-primary cursor-pointer px-2 py-4 font-semibold rounded-xl h-6 text-white w-18 text-[15px] flex justify-center items-center">
          
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add Book</span>
            </div>
          
        </button>
      </div>
    </form>
  );
};
