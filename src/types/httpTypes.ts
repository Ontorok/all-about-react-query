export type ResponseType<T> = {
  result: T[];
  total: number;
  skip: number;
  limit: number;
};
