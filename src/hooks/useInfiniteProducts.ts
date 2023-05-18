import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { Product } from "../models/Product.model";
import axios, { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";
import { ResponseType } from "../types/httpTypes";

const pageSize = 10;
const fetchInfinteProducts = async ({ pageParam = 1 }: QueryFunctionContext): Promise<ResponseType<Product[]>> => {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=${pageSize}&skip=${pageParam === 1 ? 0 : (pageParam - 1) * pageSize}`
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

export const useInfiniteProducts = () => {
  return useInfiniteQuery<ResponseType<Product[]>, AxiosError>({
    queryKey: [QUERY_KEYS.getInfiniteProducts],
    queryFn: fetchInfinteProducts,
    getNextPageParam: (lastPage, pages) => {
      const pageCount = Math.ceil(lastPage.total / pageSize);
      return pages.length < pageCount ? pages.length + 1 : undefined;
    },
  });
};
