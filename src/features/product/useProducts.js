import { useQuery } from "@tanstack/react-query";
import { useProductsContext } from "../../contexts/ProductContext";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";

export function useProducts() {
  const { debouncedQuery } = useProductsContext();
  const { BASE_URL } = useStore();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`, {
          params:
            debouncedQuery.trim() !== "" ? { name_like: debouncedQuery } : {},
        });
        return res.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error Fetching products...");
      }
    },
  });
  return { products, isLoading, error };
}
