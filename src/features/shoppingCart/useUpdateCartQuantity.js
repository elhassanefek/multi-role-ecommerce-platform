import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateCartQuantity() {
  const url = "http://localhost:9000";
  const queryClient = useQueryClient();

  const { mutate: updateQuantity, isLoading: isUpdating } = useMutation({
    mutationFn: async (idandQty) => {
      const res = await axios.patch(`${url}/shoppingCart/${idandQty.id}`, {
        quantity: idandQty.quantity,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CartProducts"] });
    },
  });
  return { updateQuantity, isUpdating };
}
