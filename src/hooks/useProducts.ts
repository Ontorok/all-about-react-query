import { useQuery } from "@tanstack/react-query";
import { Product } from "../models/Product.model";
import axios, { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products;
};

export const useProducts = (onSuccess: (data: Product[]) => void, onError: (err: AxiosError) => void) => {
  return useQuery<Product[], AxiosError>({
    queryKey: [QUERY_KEYS.getProducts],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};
