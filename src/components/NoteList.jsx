import React from "react";
import userLogo from "../assets/user.png";
import { useTheme } from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useParams } from "react-router-dom";
import edit from "../assets/edit-book.svg";
import moment from "moment";
import trush from "../assets/delete.svg";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NoteForm } from "./NoteForm";
export default function NoteList() {
  let { getCollection } = useFirestore();
  let { id } = useParams();
  let {
    error,
    data: notes,
    loading,
  } = getCollection("notes", ["bookUid", "==", id]);

  let { deleteDocument } = useFirestore();
  let [editNote, setEditNote] = useState("");
  let deleteNote = async (id) => {
    await deleteDocument("notes", id);
  };
  let editToNote = () => {};
  let { isDark } = useTheme();
  return (
    <div className=" w-[90%] ">
      {!!notes.length &&
        notes.map((note) => (
          <div
            key={note.id}
            className="ml-20 border-2 shadow-md p-2 w-[70%] mb-3"
          >
            <div className="flex space-x-3">
              <img src={userLogo} alt="" className="h-12 w-12" />
              <div className="w-full">
                <h3 className={`${isDark ? "text-primary" : ""}`}>ppw</h3>
                <div className=" mt-3 flex justify-between">
                  <div className={` ${isDark ? "text-white" : ""}`}>
                    NOTE : {editNote?.id !== note.id && note.body}
                  </div>
                </div>

                <div className="text-gray-400">
                  {moment(note?.date?.seconds * 1000).fromNow()}
                </div>
              </div>
              {/* delete and edit */}
              <div className="flex  space-x-1 p-1 h-9  items-center">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1  active:text-blue-500 rounded-md text-white"
                >
                  <div className="flex justify-center p-1">
                    <img src={trush} alt="" className="w-10" />
                    {/* <span className="text-sm">Delete</span> */}
                  </div>
                </button>

                <img
                  src={edit}
                  onClick={() => setEditNote(note)}
                  className="active:text-blue-300 cursor-pointer"
                  alt=""
                />
              </div>
            </div>

            {/* ? is null state operator */}
            {editNote?.id == note.id && (
              <NoteForm
                type="update"
                setEditNote={setEditNote}
                editNote={editNote}
              />
            )}
          </div>
        ))}
    </div>
  );
}
