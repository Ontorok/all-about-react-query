import { useState, useEffect } from "react";
import axios, { type AxiosError } from "axios";
import { Product } from "../models/Product.model";

const TraditionalFetchPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setData(res.data.products);
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
        return <h5 key={hero.id}>{hero.title}</h5>;
      })}

      {error && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error}</h2>}
    </div>
  );
};

export default TraditionalFetchPage;
