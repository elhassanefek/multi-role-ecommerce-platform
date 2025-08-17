import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateCustomer() {
  const url = "http://localhost:9001";
  const queryclient = useQueryClient();

  const { mutate: createCustomer, isLoading: isCreating } = useMutation({
    mutationFn: async (newCustomer) => {
      const res = await axios.post(`${url}/customers`, newCustomer);
      return res.data;
    },
    onSuccess: () => queryclient.invalidateQueries({ queryKey: ["customers"] }),
  });
  return { createCustomer, isCreating };
}
