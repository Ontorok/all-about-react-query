import { useState, useEffect } from "react";
import { SuperHero } from "../models/SuperHero.model";
import axios, { type AxiosError } from "axios";

const TraditionalFetchPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SuperHero[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4100/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">Loading....</h2>;

  return (
    <div>
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">Traditional Fetch Page</h2>
      {data.map((hero) => {
        return <h5 key={hero.id}>{hero.name}</h5>;
      })}

      {error && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error}</h2>}
    </div>
  );
};

export default TraditionalFetchPage;
