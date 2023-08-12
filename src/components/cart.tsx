import { useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../context/cart-context";
import CartItem from "./cart-item";

interface CartProps {
  readOnly?: boolean;
}

function Cart({ readOnly = false }: CartProps) {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [cartItems, total] = useMemo(() => {
    const cartItems = Object.values(cart);
    const total = cartItems.reduce(
      (sum, item) => sum + item.qty * item.product.price,
      0,
    );
    return [cartItems, total];
  }, [cart]);

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((cartItem, index) => (
          <li key={index}>
            <CartItem data={cartItem} readOnly={readOnly} />
          </li>
        ))}
      </ul>
      <h3>Total:</h3>
      <span>${total}</span>
      {!readOnly && <button onClick={handleCheckOut}>Check Out</button>}
    </div>
  );
}

export default Cart;
