import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";

export function useSellerProducts() {
  const { BASE_URL } = useStore();
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data;
    },
  });
  return { products, isLoading, error };
}
