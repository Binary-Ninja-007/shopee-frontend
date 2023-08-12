import axios from "axios";
import { Product } from "../types/product";

interface GetProductsRequestData {
  search: string | null;
}

export function getProducts({
  search,
}: GetProductsRequestData): PromiseLike<Product[]> {
  return axios
    .get<{ products: Product[] }>("/api/products", { params: { search } })
    .then(({ data: { products } }) => products);
}
