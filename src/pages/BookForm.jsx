// import React from 'react'

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
// import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, storage } from "../firebase";
import { useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const BookForm = () => {
  let { id } = useParams();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [file, setImgFile] = useState(null);
  const [NewGenres, setNewGenres] = useState("");
  const [genres, setGenres] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState("");
  // update
  useEffect(function () {
    if (id) {
      setIsEdit(true);
      let ref = doc(database, "books", id);
      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          let { title, description, genres, file, author } = doc.data();
          setTitle(title);
          setDescription(description);
          setGenres(genres);
          setImgFile(file);
          setAuthor(author);
        } else {
          setIsEdit(false);
          setTitle("");
          setImgFile("");
          setGenres([]);
          setAuthor("");
        }
      });
    }
  }, []);

  const addGenres = () => {
    // client side

    if (NewGenres && genres.includes(NewGenres)) {
      alert("should not same genres");
      setNewGenres("");
      return;
    }
    setGenres((pre) => [...pre, NewGenres]);
    setNewGenres("");
  };
  let navigate = useNavigate();

  let uploadFileToFirebase = async (file) => {
    let uniFileName = Date.now().toString() + "_" + file.name;
    let path = "/covers/" + user.uid + "/" + uniFileName;
    // console.log(path);
    let StorageRef = ref(storage, path);
    let res = await uploadBytes(StorageRef, file);
    // return url
    return await getDownloadURL(StorageRef);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    let url = await uploadFileToFirebase(file);
    console.log(url);
    let item = {
      title,
      author,
      description,
      cover: url,
      genres,
      uid: user.uid,
    };

    if (isEdit) {
      let { updateDocument } = useFirestore();
      await updateDocument("books", item, id);
    } else {
      let { addDocument } = useFirestore();
      await addDocument("books", item);
    }
    navigate("/");
  };

  const handlePhoto = (e) => {
    setImgFile(e.target.files[0]);
  };

  // listen to photo upload

  let handlePreviewImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file]);
  return (
    <div className="h-screen">
      <form className="max-w-lg mx-auto mt-5" onSubmit={submitForm}>
        <div className="grid grid-cols-1 space-y-1">
          {/* title */}
          <div className="w-96 px-1">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Book Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter book title"
            />
          </div>
          {/* author */}
          <div className="w-96 px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Author
            </label>
            <input
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Enter book author"
            />
          </div>
          {/* des */}
          <div className="md:w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Book Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Enter book description"
            />
          </div>
          {/* genres */}
          <div className="w-96 px-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Book Genres
            </label>
            <div className="flex items-center space-x-1">
              <input
                value={NewGenres}
                onChange={(e) => setNewGenres(e.target.value)}
                className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Enter genres"
              />
              <button
                onClick={addGenres}
                type="button"
                className="bg-indigo-500 p-1 rounded-md mb-2"
              >
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
              {/* genres show */}
              <div className="flex flex-wrap m-1 mb-3 w-full">
                {genres.map((g) => (
                  <div key={g} className="m-[2px]">
                    <span className=" rounded-full bg-primary text-white p-1 text-[10px] ">
                      {g}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* book image file */}
          <div className="w-96 px-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Choose book image
            </label>
            <div className="">
              <input
                onChange={handlePhoto}
                className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="file"
                placeholder=""
              />
              {preview && (
                <img
                  src={preview}
                  alt=""
                  className="my-3"
                  width={500}
                  height={500}
                />
              )}
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

              <span className="hidden md:block">
                {isEdit ? "Update" : "Create Book"}
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
