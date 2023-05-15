import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SuperHero } from "../models/SuperHero.model";
import { QUERY_KEYS } from "../constants/queryKeys";
import Loader from "../components/Loader";

const ReactQueryPage = () => {
  const fetchHeros = async (): Promise<SuperHero[]> => {
    const res = await axios.get("http://localhost:4100/superheroes");
    return res.data;
  };

  const onSuccess = (data: SuperHero[]) => {
    console.log({
      text: "Side effect performed affter fetching data",
      data,
    });
  };

  const onError = (err: AxiosError) => {
    console.log({
      text: "Side effect performed affter encountering error",
      err,
    });
  };
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<SuperHero[], AxiosError, string[]>({
    queryKey: [QUERY_KEYS.getSuperHeros],
    queryFn: fetchHeros,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data: SuperHero[]): string[] => data.map((hero) => hero.name),
  });

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

      {data?.map((hero) => {
        return <h5>{hero}</h5>;
      })}
      {isError && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error?.message}</h2>}
    </div>
  );
};

export default ReactQueryPage;
