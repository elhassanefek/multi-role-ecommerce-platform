import { useProductsContext } from "../../contexts/ProductContext";

import Product from "./Product";
import StoreNav from "../store/StoreNav";
import Search from "../../ui/Search";
import NumResults from "../../ui/NumResults";

import { useFilter } from "../../hooks/useFilter";
import { useStore } from "../../contexts/StoreContext";
import CategoryFilter from "../categories/CategoryFilter";

import { useProducts } from "./useProducts";
import toast from "react-hot-toast";
function ProductList() {
  const { query, setQuery } = useProductsContext();
  const { selectedCategory } = useStore();
  const { filterProducts } = useFilter();
  const { products, isLoading, error } = useProducts();

  const filteredProducts = filterProducts(products, query, selectedCategory);

  if (isLoading) return <p>Loading...</p>;
  if (error) return toast.error(error);
  return (
    <div>
      <StoreNav>
        <CategoryFilter />
        <Search query={query} setQuery={setQuery} />
        <NumResults results={filteredProducts} value={"Product"} />
      </StoreNav>

      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id}>
              <Product product={product} link={`${product.id}`} />
            </li>
          ))
        ) : (
          <p>{query ? "No products found" : "No Products available"}</p>
        )}
      </ul>
    </div>
  );
}

export default ProductList;
