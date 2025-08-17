import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCustomers() {
  const url = "http://localhost:9001";

  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${url}/customers`);
        return res.data;
      } catch (err) {
        throw new Error("Error fetching customers...");
      }
    },
  });
  return { customers, isLoading, error };
}
