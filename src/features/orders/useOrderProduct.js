import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import toast from "react-hot-toast";

export function useOrderProduct() {
  const url = "http://localhost:9001";

  const { mutate: orderProduct, isLoading: isOrdering } = useMutation({
    mutationFn: async (newOrder) => {
      const res = await axios.post(`${url}/orders`, newOrder);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Products successfully ordered");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { orderProduct, isOrdering };
}
