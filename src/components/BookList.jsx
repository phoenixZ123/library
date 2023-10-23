import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const BookList = () => {
  let url = "http://localhost:2801/books";

  const { data: books, loading, error } = useFetch(url);
  console.log(books);
  
  return (
    <>{error && <div>{error}</div>}
      {loading && <div className="">Loading ...</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3 ">
        {!!books &&
          books.map((data) => (
            <Link to={`http://localhost:5173/books/${data.id}`} key={data.id}>
              <div className="p-1 border-1 border ">
                {/* <img src={user} /> */}
                <img src={data.image} alt="" />
                <div className="space-y-2 text-center">
                  <div className="mt-2 text-md">{data.title} </div>

                  {/* <div className="text-[12px] text-left">
                    {data.description}
                  </div> */}
                  <div className="flex flex-wrap m-1">
                    {data.genres.map((g) => (
                      <div key={g} className="m-[2px]">
                        <span className=" rounded-full bg-blue-500 text-white p-1 text-[10px] ">
                          {g}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};
