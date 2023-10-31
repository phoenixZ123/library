import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useState } from "react";

export const BookDetail = () => {
  let { id } = useParams();
  // let url = `http://localhost:2801/books/${id}`;
  // const { data: book, loading, error } = useFetch(url);
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [error, navigate]);

  useEffect(() => {
    setLoading(true);
    let ref = doc(database, "books", id);
    getDoc(ref).then((dt) => {
      if(dt.exists()){
        let book = { id: dt.id, ...dt.data() };
      setBook(book);
      setLoading(false);
      setError('');
      }else{
        setError("No document found");
        setLoading(false)
      }
      
    });
  }, [id]);

  let { isDark } = useTheme();
  return (
    <div className="h-screen">
      {loading && <div>Loading ...</div>}
      
      {book && (
        <div className="grid grid-cols-2 sm:text-left md:ml-20" key={book.id}>
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
          <img src={book.image} alt="" className="w-[80%] h-[440px]" />
        </div>
      )}
    </div>
  );
};
