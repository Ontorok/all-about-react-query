import Loader from "../components/Loader";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import React from "react";

const RQInfiniteProducts = () => {
  const { data, isLoading, isError, error, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteProducts();

  if (isLoading)
    return (
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>Loading....</span>
      </h2>
    );
  if (isError)
    return (
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>{error.message}</span>
      </h2>
    );

  return (
    <div>
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>React Query Infinite LIst</span>

        {/* {isFetching && <Loader />} */}
      </h2>
      <div className="h-96 overflow-y-auto border border-stone-800 p-4">
        <table className="border-collapse border border-slate-400 ">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">ID</th>
              <th className="border border-slate-300 p-2">Title</th>
              <th className="border border-slate-300 p-2">Description</th>
              <th className="border border-slate-300 p-2">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {data.pages.map((group, index) => {
              return (
                <React.Fragment key={index + 1}>
                  {group.result.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-200 cursor-pointer">
                      <td className="border border-slate-300 p-2">{product.id}</td>
                      <td className="border border-slate-300 p-2">{product.title}</td>
                      <td className="border border-slate-300 p-2">{product.description}</td>
                      <td className="border border-slate-300 p-2">
                        <img className="w-10 h-7 mx-auto my-0" src={product.thumbnail} alt={product.title} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-baseline mt-4">
        <button
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          Load More
          {isFetching && <Loader />}
          {isFetchingNextPage && <Loader color="red" />}
        </button>
      </div>
    </div>
  );
};

export default RQInfiniteProducts;
