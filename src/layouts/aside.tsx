import { useContext } from "react";
import clsx from "clsx";
import Cart from "../components/cart";
import { CartContext } from "../context/cart-context";

function ASide() {
  const { isCartOpen } = useContext(CartContext);

  return (
    <aside
      className={clsx("absolute", {
        "right-0": isCartOpen,
        "-right-80": !isCartOpen,
      })}
    >
      <Cart />
    </aside>
  );
}

export default ASide;
