import axios from "axios";
import { Product } from "../models/Product.model";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";

const addProduct = async (product: Partial<Product>): Promise<Product> => {
  const res = await axios.post(`https://dummyjson.com/products/adds`, product);
  const result = res.data;
  return result;
};

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onMutate: (variables) => {
      const previousProducts = queryClient.getQueryData([QUERY_KEYS.getProducts]) as Product[];
      console.log(previousProducts);

      // Optimistically update to the new value
      queryClient.setQueryData<Product[]>([QUERY_KEYS.getProducts], (prev) => {
        if (!prev) return [];
        const old = prev.slice();
        const obj: Product = { ...variables, id: 101 } as Product;
        const newData: Product[] = [{ ...obj }, ...old];
        return newData;
      });

      // Return a context object with the snapshotted value
      return previousProducts;
    },

    onError: (_data, _variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.getProducts], context);
    },
  });
};
