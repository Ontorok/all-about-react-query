import { AxiosError } from "axios";
import { SuperHero } from "../models/SuperHero.model";
import Loader from "../components/Loader";
import { useSuperHeros } from "../hooks/useSuperHeros";
import { Link } from "react-router-dom";

const ReactQueryPage = () => {
  const onSuccess = (data: SuperHero[]) => {
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
  const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeros(onSuccess, onError);

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

      {data?.map((hero, index) => {
        return (
          <Link key={hero.id} to={`/react-query/${hero.id}`}>
            <h5 key={index + 1} className="cursor-pointer">
              {hero.name}
            </h5>
          </Link>
        );
      })}
      {isError && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error?.message}</h2>}
    </div>
  );
};

export default ReactQueryPage;
