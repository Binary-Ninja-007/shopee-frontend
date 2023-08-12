import React, { useState } from "react";
import { CartItemData } from "../types/cart";
import { Product } from "../types/product";

export const CartContext = React.createContext<{
  cart: Record<number, CartItemData>;
  qty: number;
  isCartOpen: boolean;
  purchasing: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  toggleCart: () => void;
  setPurchasing: (purchasing: boolean) => void;
}>({
  cart: {},
  qty: 0,
  isCartOpen: false,
  purchasing: false,
  addToCart: () => {
    console.error("addToCart has been invoked without initialization");
  },
  removeFromCart: () => {
    console.error("removeFromCart has been invoked without initialization");
  },
  toggleCart: () => {
    console.error("toggleCart has been invoked without initialization");
  },
  setPurchasing: () => {
    console.error("setPurchasing has been invoked without initialization");
  },
});

function CartProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useState<CartItemData[]>([]);
  const [qty, setQty] = useState(0);
  const [isCartOpen, setCartOpen] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const addToCart = (product: Product) => {
    setCart((cart) => ({
      ...cart,
      [product.id]: {
        product,
        qty: cart[product.id] ? cart[product.id].qty + 1 : 1,
      },
    }));
    setQty((qty) => qty + 1);
  };

  const removeFromCart = (product: Product) => {
    setQty((qty) => {
      if (cart[product.id]) {
        return qty - cart[product.id].qty;
      }
      return qty;
    });
    setCart((cart) => {
      if (cart[product.id]) {
        delete cart[product.id];
      }
      return { ...cart };
    });
  };

  const toggleCart = () => {
    setCartOpen((isCartOpen) => !isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        qty,
        isCartOpen,
        toggleCart,
        purchasing,
        setPurchasing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
