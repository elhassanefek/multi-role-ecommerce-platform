import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../contexts/StoreContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export function useProduct() {
  const { BASE_URL } = useStore();
  const { productId } = useParams();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/${productId}`);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching product Details");
      }
    },
    enabled: !!productId,
  });
  return { product, isLoading, error };
}
