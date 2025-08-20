import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:9000/products";
export function useRecentProducts() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", `last-${numDays}`],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}`);
      const productsData = data.filter((product) => {
        const productDate = new Date(product.addedAt).getTime();

        const query = new Date(queryDate).getTime();

        return productDate >= query;
      });
      return productsData;
    },
  });
  return { products, isLoading, numDays };
}
