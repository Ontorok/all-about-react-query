import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { SuperHero } from "../models/SuperHero.model";
import axios, { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";

const fetchHero = async ({ queryKey }: QueryFunctionContext): Promise<SuperHero> => {
  const id = queryKey[1];
  const res = await axios.get(`http://localhost:4100/superheroes/${id}`);
  return res.data;
};

export const useSuperHero = (id: number) => {
  return useQuery<SuperHero, AxiosError>({
    queryKey: [QUERY_KEYS.getSuperHero, id.toString()],
    queryFn: fetchHero,
    refetchOnWindowFocus: false,
  });
};
