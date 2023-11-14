import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import user from "../assets/user.png";
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
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              className="bg-gray-50 w-[80%] mx-auto md:ml-20 shadow-md border-2 p-3"
            ></textarea>
            <div className="ml-20 border-2 shadow-md p-3 w-[90%]">
              <div>
                <div className="flex space-x-3">
                  <img src={user} alt="" className="h-12 w-12" />
                  <div>
                    <h3>ppw</h3>
                    <div className="text-gray-400">20.4.2021</div>
                  </div>
                </div>

                <div className="mt-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti velit molestiae hic, deserunt perspiciatis, veritatis
                  odit aut placeat officiis ipsam quasi eligendi nemo fugiat!
                  Culpa corporis odio debitis ea deleniti?
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
