import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import user from "../assets/user.png";
import { useTheme } from "../hooks/useTheme";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../firebase";
import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { NoteForm } from "../components/NoteForm";
import NoteList from "../components/NoteList";

export const BookDetail = () => {
  let { id } = useParams();
  // let url = `http://localhost:2801/books/${id}`;
  // const { data: book, loading, error } = useFetch(url);

  let navigate = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1000);
  //   }
  // }, [error, navigate]);

  let { getDocument } = useFirestore();
  let { data: book, error, loading } = getDocument("books", id);

  let { isDark } = useTheme();
  return (
    <div className="h-screen">
      {loading && <div>Loading ...</div>}

      {book && (
        <>
          <div
            className="grid grid-cols-2 sm:text-left md:ml-20 text-center"
            key={book.id}
          >
            <div className="space-y-2">
              <div className="  m-8 text-2xl font-bold text-slate-600 drop-shadow-xl shadow-red">
                {book.title}
              </div>
              <div className="flex">
                {book.genres.map((g) => (
                  <div key={g} className="m-[2px]">
                    <span className=" rounded-full bg-blue-500 text-white p-1 text-[10px] ">
                      {g}
                    </span>
                  </div>
                ))}
              </div>
              <div className={`${isDark ? "text-white" : ""}`}>
                {book.description}
              </div>
            </div>
            <img src={book.cover} alt="" className="w-[90%] h-[440px]" />
          </div>
          <div>
            <h3 className="text-xl text-primary font-bold my-3 text-center">
              my notes
            </h3>
            {/* note component */}
            <NoteForm />
            <NoteList />
          </div>
        </>
      )}
    </div>
  );
};
