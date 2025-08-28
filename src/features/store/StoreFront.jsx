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
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Navigation Header - Full Width */}
      <div className="bg-white shadow-lg border-b border-gray-200 p-4 w-full sticky top-0 z-10">
        <StoreNav>
          <div className="flex items-center gap-6">
            <NavLink
              to="products"
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-50"
            >
              Products
            </NavLink>
            <CategoryFilter />
          </div>
          <div className="flex-1 max-w-md mx-4">
            <Search query={query} setQuery={setQuery} elements="products" />
          </div>

          <div className="flex items-center gap-4">
            {query.trim() && (
              <NumResults
                results={visibleProducts}
                value={"Product"}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
              />
            )}
            <NavLink
              to="shoppingCart"
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-50"
            >
              Cart
            </NavLink>
            <NavLink
              to="my-orders"
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-50"
            >
              My Orders
            </NavLink>
          </div>
        </StoreNav>
      </div>

      {/* Main Content Area - Full Width with Padding */}
      <div className="w-full px-8 py-6">
        {!query.trim() ? (
          <div className="mb-8">
            <h1 className="text-2xl text-blue-500 mb-4">
              Welcome to store {storeId}
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Featured Products
            </h2>
          </div>
        ) : null}

        {/* Products Grid/List */}
        <div className="w-full">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
                >
                  <Product product={product} link={`products/${product.id}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {query ? "No products found" : "No Featured Products available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreFront;
