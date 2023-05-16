import { useQuery } from "@tanstack/react-query";
import { SuperHero } from "../models/SuperHero.model";
import axios, { AxiosError } from "axios";
import { QUERY_KEYS } from "../constants/queryKeys";

const fetchHeros = async (): Promise<SuperHero[]> => {
  const res = await axios.get("http://localhost:4100/superheroes");
  return res.data;
};

export const useSuperHeros = (onSuccess: (data: SuperHero[]) => void, onError: (err: AxiosError) => void) => {
  return useQuery<SuperHero[], AxiosError>({
    queryKey: [QUERY_KEYS.getSuperHeros],
    queryFn: fetchHeros,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};
