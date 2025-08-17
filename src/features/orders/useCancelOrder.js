import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useCancelOrder() {
  const url = "http://localhost:9001";
  const queryClient = useQueryClient();
  const { mutate: cancelOrder, isLoading: isCanceling } = useMutation({
    mutationFn: async (updatedOrder) => {
      const res = await axios.patch(
        `${url}/orders/${updatedOrder.id}`,
        updatedOrder
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order successfully canceled");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { cancelOrder, isCanceling };
}
