import { Link } from "react-router-dom";
import trash from "../assets/delete.svg";
import edit from "../assets/edit-book.svg";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../firebase";
import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const BookList = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let search = params.get("search");

  let { getCollection, deleteDocument } = useFirestore();
  let { user } = useContext(AuthContext);
  console.log(user);
  let {
    error,
    data: books,
    loading,
  } = getCollection("books", ["uid", "==", user.uid]);

  let navigate = useNavigate();

  let deleteBook = async (e, id) => {
    e.preventDefault();
    await deleteDocument("books", id);
  };
  // setBooks((prev) => prev.filter((d) => d.id !== id));

  let { isDark } = useTheme();

  if (error) {
    return <p className="text-center text-2xl text-gray-500">{error}</p>;
  }

  // useEffect(function () {
  //   setLoading(true);
  //   let books = [];
  //   let ref = collection(database, "books");
  //   let qry = query(ref, orderBy("date", "desc"));
  //   // getDocs(qry).then((data) => {
  //   //   if (data.empty) {
  //   //     setError("No result found");
  //   //     setLoading(false);
  //   //   }
  //   //   if (data.empty == false) {
  //   //     data.forEach((d) => {
  //   //       books.push({ id: d.id, ...d.data() });
  //   //     });
  //   //     setBooks(books);
  //   //     setLoading(false);
  //   //     setError("");
  //   //   }
  //   // });
  //   // real time transition firebase
  //   onSnapshot(qry, (data) => {
  //     if (data.empty) {
  //       setError("No result found");
  //       setLoading(false);
  //     }
  //     if (data.empty == false) {
  //       data.forEach((d) => {
  //         books.push({ id: d.id, ...d.data() });
  //       });
  //       setBooks(books);
  //       setLoading(false);
  //       setError("");
  //     }
  //   });
  // }, []);

  // const deleteBook = async (e, id) => {
  //   e.preventDefault();
  //   let ref = doc(database, "books", id);
  //   await deleteDoc(ref);
  //   setBooks((prev) => prev.filter((p) => p.id != id));
  // };
  // let { isDark } = useTheme();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-2 ml-9">
        {loading && <div className="">Loading ...</div>}
        {!!books &&
          books.map((data) => (
            <Link to={`http://localhost:5173/books/${data.id}`} key={data.id}>
              <div
                className={`p-1 border-1 border w-[180px] ${
                  isDark ? "bg-dcard border-primary text-white" : ""
                }`}
              >
                <img src={data.cover} alt="" className="w-full h-[220px]" />
                <div className="space-y-2 text-center">
                  <div className="mt-2 text-md">{data.title} </div>
                  <div className="flex  m-1 justify-between items-center">
                    <div className="flex flex-wrap">
                      {data.genres.map((g) => (
                        <div key={g} className="m-[2px]">
                          <span className=" rounded-full bg-blue-500 text-white p-1 text-[10px] ">
                            {g}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`edit/${data.id}`}>
                        <img src={edit} alt="" />
                      </Link>

                      <img
                        src={trash}
                        alt=""
                        onClick={(e) => deleteBook(e, data.id)}
                        className="cursor-pointer active:bg-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {!!books && !books.length && (
        <p className="text-center text-xl text-gray-500">
          No Search Results Found
        </p>
      )}
    </>
  );
};
