import { AxiosError } from "axios";
import Loader from "../components/Loader";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../models/Product.model";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../hooks/useAddProduct";
import { useEffect } from "react";

const RQProductsPage = () => {
  const navigate = useNavigate();
  const onSuccess = (data: Product[]) => {
    // console.log({
    //   text: "Side effect performed affter fetching data",
    //   data,
    // });
  };

  const onError = (err: AxiosError) => {
    // console.log({
    //   text: "Side effect performed affter encountering error",
    //   err,
    // });
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useProducts(onSuccess, onError);
  const { data: savedProduct, mutateAsync, isLoading: isAdding } = useAddProductMutation();

  const onAddProduct = async () => {
    const product: Product = {
      id: 1,
      title: "iPhone 10",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    };

    const abc = await mutateAsync(product);
  };

  if (isLoading)
    return (
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>Loading....</span>
      </h2>
    );

  return (
    <div>
      <h2 className="bg-sky-800 text-white p-2 text-center rounded mb-2">
        <span>React Query Fetch Page</span>
        <button
          className="ml-3 bg-slate-400 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600"
          onClick={() => refetch()}
        >
          Fetch
        </button>
        <button
          className="ml-3 bg-blue-400 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600"
          onClick={onAddProduct}
        >
          Add Product
        </button>
        {isFetching && <Loader />}
        {isAdding && <Loader color="green" />}
      </h2>
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Title</th>
            <th className="border border-slate-300 p-2">Description</th>
            <th className="border border-slate-300 p-2">Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => {
            return (
              <tr
                key={product.id}
                className="hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  navigate(`/react-query/${product.id}`);
                }}
              >
                <td className="border border-slate-300 p-2">{product.title}</td>
                <td className="border border-slate-300 p-2">{product.description}</td>
                <td className="border border-slate-300 p-2">
                  <img className="w-10 h-7 mx-auto my-0" src={product.thumbnail} alt={product.title} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isError && <h2 className="bg-red-100 text-red-800 p-2 text-center rounded mb-2">{error?.message}</h2>}
    </div>
  );
};

export default RQProductsPage;
