import React from "react";
import userLogo from "../assets/user.png";
import { useTheme } from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function NoteList() {
  let { getCollection } = useFirestore();
  let { id } = useParams();
  let {
    error,
    data: notes,
    loading,
  } = getCollection("notes", ["bookUid", "==", id]);
  let { isDark } = useTheme();
  return (
    <div className=" w-[90%] ">
      {!!notes.length &&
        notes.map((note) => (
          <div key={note.id} className="ml-20 border-2 shadow-md p-3 w-[90%]">
            <div className="flex space-x-3">
              <img src={userLogo} alt="" className="h-12 w-12" />
              <div>
                <h3 className={`${isDark ? "text-primary" : ""}`}>ppw</h3>
                <div className="text-gray-400">20.4.2021</div>
              </div>
            </div>

            <div className={`mt-3 ${isDark ? "text-white" : ""}`}>
              {note.body}
            </div>
          </div>
        ))}
    </div>
  );
}
