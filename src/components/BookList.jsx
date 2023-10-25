import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { transparent } from "tailwindcss/colors";

export const BookList = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);

  let search = params.get("search");
  let url = `http://localhost:2801/books/${search ? `?q=${search}` : ""}`;

  const { data: books, loading, error } = useFetch(url);
  // console.log(books);
  let{isDark}=useTheme();
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-2 ml-9">
        {error && <div>{error}</div>}
        {loading && <div className="">Loading ...</div>}
        {!!books &&
          books.map((data) => (
            <Link to={`http://localhost:5173/books/${data.id}`} key={data.id}>
              <div className={`p-1 border-1 border w-[180px] ${isDark ? 'bg-dcard border-primary text-white': 'bg-transparent'}`}>
                {/* <img src={user} /> */}
                <img src={data.image} alt="" className="w-full h-[220px]"/>
                <div className="space-y-2 text-center">
                  <div className="mt-2 text-md">{data.title} </div>
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
      {!!books && !books.length && (
        <p className="text-center text-xl text-gray-500">
          No Search Results Found
        </p>
      )}
    </>
  );
};
