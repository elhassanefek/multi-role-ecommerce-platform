import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export function useOrder(orderId) {
  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      try {
        const res = await axios.get(`http://localhost:9001/orders/${orderId}`);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching order Details");
      }
    },
  });
  return { order, isLoading, error };
}
