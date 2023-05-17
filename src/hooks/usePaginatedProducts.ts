import { useQuery } from "@tanstack/react-query";
import { Product } from "../models/Product.model";
import axios, { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";
import { ResponseType } from "../types/httpTypes";

const fetchProducts = async (pageNumber: number, pageSize: number): Promise<ResponseType<Product>> => {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=${pageSize}&skip=${pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize}`
  );
  const products: Product[] = res.data.products;
  const total: number = res.data.total;
  const skip: number = res.data.skip;
  const limit: number = res.data.limit;
  return {
    result: products,
    total,
    skip,
    limit,
  };
};

export const usePaginatedProducts = (pageNumber: number, pageSize: number) => {
  return useQuery<ResponseType<Product>, AxiosError>({
    queryKey: [QUERY_KEYS.getProducts, pageNumber, pageSize],
    queryFn: () => fetchProducts(pageNumber, pageSize),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
