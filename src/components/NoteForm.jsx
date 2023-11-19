import React from "react";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";
import { useEffect } from "react";

export const NoteForm = ({ type = "create", setEditNote, editNote }) => {
  let { id } = useParams();
  let { addDocument, updateDocument } = useFirestore();
  // let { isDark } = useTheme();
  let [body, setBody] = useState("");

  let submit = async (e) => {
    e.preventDefault();

    if (type == "create") {
      let data = {
        body,
        bookUid: id,
        // date: serverTimestamp(),
      };
      await addDocument("notes", data);
    } else {
      editNote.body = body;
      await updateDocument("notes", editNote, editNote.id, false);
      setEditNote(null);
    }
    setBody("");
  };

  useEffect(() => {
    if (type == "update") {
      setBody(editNote.body);
    }
  }, [type]);
  return (
    <form onSubmit={submit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        cols="30"
        rows="5"
        className="bg-gray-50 outline-none w-[85%] mx-auto md:ml-20 shadow-md border-2 p-2"
      ></textarea>
      <br />

      <div className="flex space-x-5 my-2">
        <button type="submit" className="bg-primary p-1 rounded-lg md:ml-20 ">
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

            <span className="">{type == "create" ? "Add Note" : "update"}</span>
          </div>
        </button>
        {type == "update" && (
          <button
            type="button"
            onClick={() => setEditNote("")}
            className="p-1 h-9 rounded-md border-red-600 border-2 text-primary"
          >
            cancel
          </button>
        )}
      </div>
    </form>
  );
};
