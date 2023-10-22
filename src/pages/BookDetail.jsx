import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const BookDetail = () => {
  let { id } = useParams();
  let url = `http://localhost:2801/books/${id}`;
  const { data: book, loading, error } = useFetch(url);

  let navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [error, navigate]);
  

  return (
    <div>
      {book && (
        <div className="grid grid-cols-2 text-left " key={book.id}>
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
            <div>{book.description}</div>
          </div>
          <img src={book.image} alt="" className="w-[80%]" />
        </div>
      )}
    </div>
  );
};
