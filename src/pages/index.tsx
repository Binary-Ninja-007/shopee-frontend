import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../api/product";
import LoadingSkeleton from "../components/loading-skeleton";
import ProductBox from "../components/product-box";
import SearchForm from "../components/search-form";
import { CollectionContext } from "../context/collection-context";

function Collection() {
  const { products, setProducts, loading, setLoading } =
    useContext(CollectionContext);

  const [searchParams] = useSearchParams({ search: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProducts({
          search: searchParams.get("search"),
        });
        setProducts(products);
      } catch {
        toast.error("An error occured while fetching products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, [searchParams, setProducts, setLoading]);

  return (
    <section>
      <SearchForm />
      <ul>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          products.map((product) => (
            <li key={product.id}>
              <ProductBox data={product} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default Collection;
