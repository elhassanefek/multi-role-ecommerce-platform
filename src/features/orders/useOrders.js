import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrders() {
  const url = "http://localhost:9001";

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${url}/orders`);
        return res.data;
      } catch (err) {
        throw new Error("Error fetching Orders");
      }
    },
  });
  return { orders, isLoading, error };
}
