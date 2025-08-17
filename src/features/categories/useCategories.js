import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCategories() {
  const url = "http://localhost:9000";
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${url}/categories`);
        return res.data;
      } catch {
        throw new Error("Error fetching categories...");
      }
    },
  });
  return { categories, isLoading, error };
}
