import { NavLink, useParams } from "react-router-dom";
import { useProductsContext } from "../../contexts/ProductContext";
import Product from "../product/Product";
import StoreNav from "./StoreNav";
import Search from "../../ui/Search";
import NumResults from "../../ui/NumResults";
import CategoryFilter from "../categories/CategoryFilter";
import { useFilter } from "../../hooks/useFilter";
import { useStore } from "../../contexts/StoreContext";
import { useProducts } from "../../features/product/useProducts";
function StoreFront() {
  const { storeId } = useParams();
  const { query, setQuery } = useProductsContext();

  const { products, isLoading, error } = useProducts();
  const { selectedCategory } = useStore();

  const { filterProducts } = useFilter();

  const featuredProducts = products.filter((product) => product.featured);

  const filteredProducts = filterProducts(products, query, selectedCategory);

  const visibleProducts =
    query.trim() !== ""
      ? filteredProducts
      : filterProducts(featuredProducts, "", selectedCategory);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  return (
    <div>
      <StoreNav>
        <NavLink to="products">Products</NavLink>
        <CategoryFilter />
        <Search query={query} setQuery={setQuery} elements="products" />
        {query.trim() && (
          <NumResults results={visibleProducts} value={"Product"} />
        )}
        <NavLink to="shoppingCart"> Cart </NavLink>
        <NavLink to="my-orders"> My Orders </NavLink>
      </StoreNav>
      {!query.trim() ? (
        <>
          <h1>Welcome to store {storeId}</h1>

          <h2>Featured Products</h2>
        </>
      ) : null}

      <ul>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <li key={product.id}>
              <Product product={product} link={`products/${product.id}`} />
            </li>
          ))
        ) : (
          <p>
            {query ? "No products found" : "No Featured Products available"}
          </p>
        )}
      </ul>
    </div>
  );
}

export default StoreFront;
