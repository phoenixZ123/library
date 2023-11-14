import React from "react";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";

export const NoteForm = () => {
  let { id } = useParams();
  let { addDocument } = useFirestore();
  // let { isDark } = useTheme();
  let [body, setBody] = useState("");

  let addNote = async (e) => {
    e.preventDefault();
    let data = {
      body,
      bookUid: id,
      // date: serverTimestamp(),
    };
    await addDocument("notes", data);
    setBody("");
    alert("saved");
  };
  return (
    <form onSubmit={addNote}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        cols="30"
        rows="5"
        className="bg-gray-50 w-[80%] mx-auto md:ml-20 shadow-md border-2 p-3"
      ></textarea>
      <br />
      <button type="" className="bg-primary p-1 rounded-lg md:ml-20 my-2">
        <div className="flex items-center justify-center ">
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

          <span>add note</span>
        </div>
      </button>
    </form>
  );
};
