import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:9001/customers";
export function useRecentCustomers() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: customers } = useQuery({
    queryKey: ["customers", `last-${numDays}`],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}`);
      const customersData = data.filter((customer) => {
        const customerDate = new Date(customer.createdAt).getTime();

        const query = new Date(queryDate).getTime();

        return customerDate >= query;
      });
      return customersData;
    },
  });
  return { customers, isLoading };
}
