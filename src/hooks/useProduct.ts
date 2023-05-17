import { QueryFunctionContext, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../models/Product.model";
import axios, { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";

const fetchProduct = async ({ queryKey }: QueryFunctionContext): Promise<Product> => {
  const id = queryKey[1];
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};

export const useProduct = (id: string | number) => {
  const queryClient = useQueryClient();
  return useQuery<Product, AxiosError>({
    queryKey: [QUERY_KEYS.getProduct, id.toString()],
    queryFn: fetchProduct,
    initialData: () => {
      const products: Product[] | undefined = queryClient.getQueryData([QUERY_KEYS.getProducts]);
      const product = products?.find((p) => p.id == id);
      console.log({ products, product });
      return product;
    },
  });
};
