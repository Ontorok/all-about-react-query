import { AxiosError } from "axios";
import Loader from "../components/Loader";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../models/Product.model";
import { useNavigate } from "react-router-dom";

const ReactQueryPage = () => {
  const navigate = useNavigate();
  const onSuccess = (data: Product[]) => {
    // console.log({
    //   text: "Side effect performed affter fetching data",
    //   data,
    // });
  };

  const onError = (err: AxiosError) => {
    // console.log({
    //   text: "Side effect performed affter encountering error",
    //   err,
    // });
  };
  // const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeros(onSuccess, onError);
  const { data, isLoading, isError, error, isFetching, refetch } = useProducts(onSuccess, onError);

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
            <th className="border border-slate-300 p-2">Title</th>
            <th className="border border-slate-300 p-2">Description</th>
            <th className="border border-slate-300 p-2">Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => {
            return (
              <tr
                key={product.id}
                className="hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  navigate(`/react-query/${product.id}`);
                }}
              >
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

      {isError && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error?.message}</h2>}
    </div>
  );
};

export default ReactQueryPage;
