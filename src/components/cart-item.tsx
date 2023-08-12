import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import { CartItemData } from "../types/cart";
import TrashSVG from "../assets/trash.svg";

interface CartItemProps {
  data: CartItemData;
  readOnly: boolean;
}

function CartItem({ data, readOnly = false }: CartItemProps) {
  const { removeFromCart } = useContext(CartContext);

  const handleRemove = () => {
    removeFromCart(data.product);
  };

  return (
    <div>
      <h3>{data.product.name}</h3>
      <span>{data.qty}</span>
      <span>${data.product.price}</span>
      {!readOnly && (
        <button onClick={handleRemove}>
          <img src={TrashSVG} alt="remove" />
        </button>
      )}
    </div>
  );
}

export default CartItem;
