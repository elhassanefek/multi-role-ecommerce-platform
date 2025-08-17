import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../contexts/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

export function UseClearCart(cartItems) {
  const { BASE_URL } = useStore();
  const queryClient = useQueryClient();
  const { mutate: clearCart, isLoading: isClearing } = useMutation({
    mutationFn: async () => {
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(`${BASE_URL}/shoppingCart/${item.id}`)
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["CartProducts"]);
    },
    onError: (err) => toast.error(err.message),
  });
  return { clearCart, isClearing };
}
