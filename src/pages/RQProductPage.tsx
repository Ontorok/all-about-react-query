import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

const RQProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id as string);

  if (isLoading) return <div>Loading Product....</div>;

  return (
    <div className="flex justify-between">
      <div>
        <div>
          <span>Product Name: </span>
          <span>{product?.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{product?.description}</span>
        </div>
        <div>
          <span>Category: </span>
          <span>{product?.category}</span>
        </div>
        <div>
          <span>Price: </span>
          <span>{product?.price}</span>
        </div>
        <div>
          <span>Discount: </span>
          <span>{product?.discountPercentage}</span>
        </div>
        <div>
          <span>Stock: </span>
          <span>{product?.stock}</span>
        </div>
      </div>
      <div>
        <img src={product?.thumbnail} alt="" />
      </div>
    </div>
  );
};

export default RQProductPage;
