import React, { useState } from "react";
import { Product } from "../types/product";

export const CollectionContext = React.createContext<{
  products: Product[];
  setProducts: (products: Product[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  products: [],
  setProducts: () => {
    console.error("setProducts has been invoked without initialization");
  },
  loading: false,
  setLoading: () => {
    console.error("setLoading has been invoked without initialization");
  },
});

function CollectionProvider({ children }: React.PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <CollectionContext.Provider
      value={{ products, setProducts, loading, setLoading }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export default CollectionProvider;
