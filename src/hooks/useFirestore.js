import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { database } from "../firebase";
import { useRef } from "react";

export default function useFirestore() {
  let getCollection = (colName, _q) => {
    console.log(_q);
    let qRef = useRef(_q).current;
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");

    useEffect(
      function () {
        setLoading(true);
        let ref = collection(database, colName);
        let queries = [];
        if (qRef) {
          queries.push(where(...qRef));
        }
        queries.push(orderBy("date", "desc"));
        let qry = query(ref, ...queries);

        onSnapshot(qry, (dt) => {
          if (dt.empty) {
            setError("No result found");
            setLoading(false);
          } else {
            let collectionDatas = [];
            dt.forEach((docs) => {
              let document = { id: docs.id, ...docs.data() };
              collectionDatas.push(document);
            });
            setData(collectionDatas);
            setLoading(false);
            setError("");
          }
        });
      },
      [qRef]
    );
    return { error, data, loading };
  };
  let getDocument = (colName, id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      let ref = doc(database, colName, id);
      onSnapshot(ref, (dt) => {
        if (dt.exists()) {
          let document = { id: dt.id, ...dt.data() };
          setData(document);
          setLoading(false);
          setError("");
        } else {
          setError("No document found");
          setLoading(false);
        }
      });
    }, [id]);
    return { data, error, loading };
  };
  let addDocument = async (colName, item) => {
    item.date = serverTimestamp();
    let ref = collection(database, colName);
    return addDoc(ref, item);
  };

  let deleteDocument = async (colName, id) => {
    let ref = doc(database, colName, id);
    return deleteDoc(ref);
  };
  let updateDocument = async (colName, item, id) => {
    item.date = serverTimestamp();
    let ref = doc(database, colName, id);
    return updateDoc(ref, item);
  };

  return {
    getCollection,
    addDocument,
    deleteDocument,
    updateDocument,
    getDocument,
  };
}
