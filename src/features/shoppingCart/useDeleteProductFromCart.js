import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";
import toast from "react-hot-toast";

export function useDeleteProductFromCart() {
  const { BASE_URL } = useStore();
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
    mutationFn: async (productId) => {
      const res = await axios.delete(`${BASE_URL}/shoppingCart/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product successfully deleted from Cart");
      queryClient.invalidateQueries({ queryKey: ["CartProducts"] });
    },
  });

  return { isDeleting, deleteProduct };
}
