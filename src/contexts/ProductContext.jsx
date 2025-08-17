import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const value = useMemo(() => {
    return {
      query,
      debouncedQuery,
      setQuery,
    };
  }, [query, debouncedQuery]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

function useProductsContext() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
}

export { ProductProvider, useProductsContext };
