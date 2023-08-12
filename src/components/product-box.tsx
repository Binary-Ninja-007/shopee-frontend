import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import { Product } from "../types/product";

interface ProductBoxProps {
  data: Product;
}

function ProductBox({ data }: ProductBoxProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(data);
  };

  return (
    <div>
      <h3>{data.name}</h3>
      <span>{data.price}</span>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductBox;
