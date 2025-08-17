import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  const url = "http://localhost:9001";

  const { mutate: updateOrder, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedOrder) => {
      const res = await axios.patch(
        `${url}/orders/${updatedOrder.id}`,
        updatedOrder
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Failed to update order");
    },
  });
  return { updateOrder, isUpdating };
}
