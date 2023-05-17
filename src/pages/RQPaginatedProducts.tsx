import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";

const RQPaginatedProducts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, isLoading, isError, error, isFetching, refetch } = usePaginatedProducts(page, pageSize);
  useEffect(() => {
    console.log({ isLoading, isFetching });
  }, [isLoading, isFetching]);

  if (isLoading)
    return (
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>Loading....</span>
      </h2>
    );

  return (
    <div>
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>React Query Fetch Page</span>
        <button
          className="ml-3 bg-slate-400 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600"
          onClick={() => refetch()}
        >
          Fetch
        </button>
        {isFetching && <Loader />}
      </h2>
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">ID</th>
            <th className="border border-slate-300 p-2">Title</th>
            <th className="border border-slate-300 p-2">Description</th>
            <th className="border border-slate-300 p-2">Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data?.result.map((product) => {
            return (
              <tr
                key={product.id}
                className="hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  navigate(`/react-query/${product.id}`);
                }}
              >
                <td className="border border-slate-300 p-2">{product.id}</td>
                <td className="border border-slate-300 p-2">{product.title}</td>
                <td className="border border-slate-300 p-2">{product.description}</td>
                <td className="border border-slate-300 p-2">
                  <img className="w-10 h-7 mx-auto my-0" src={product.thumbnail} alt={product.title} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center items-baseline mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:bg-gray-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <select
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 disabled:bg-gray-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setPageSize(parseInt(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:bg-gray-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= (data?.total as number) / pageSize}
        >
          Next
        </button>
      </div>

      {isError && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error?.message}</h2>}
    </div>
  );
};

export default RQPaginatedProducts;
