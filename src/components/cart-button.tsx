import { useContext } from "react";
import CartSVG from "../assets/cart.svg";
import { CartContext } from "../context/cart-context";

function CartButton() {
  const { qty, toggleCart } = useContext(CartContext);

  const handleClick = () => {
    toggleCart();
  };

  return (
    <button onClick={handleClick}>
      <img src={CartSVG} alt="cart" />
      <div>{qty}</div>
    </button>
  );
}

export default CartButton;
