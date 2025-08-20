import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:9001/orders";
export function useRecentOrders() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders", `last-${numDays}`],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}`);
      const ordersData = data.filter((order) => {
        const orderDate = new Date(order.createdAt).getTime();

        const query = new Date(queryDate).getTime();

        return orderDate >= query;
      });
      return ordersData;
    },
  });
  return { orders, isLoading, numDays };
}
