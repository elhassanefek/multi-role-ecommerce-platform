import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";

export function useCart() {
  const { BASE_URL } = useStore();
  const {
    data: shoppingCartProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["CartProducts"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/shoppingCart`);
        return res.data;
      } catch (err) {
        throw new Error("Error fetching Cart products");
      }
    },
  });
  return { shoppingCartProducts, isLoading, error };
}
