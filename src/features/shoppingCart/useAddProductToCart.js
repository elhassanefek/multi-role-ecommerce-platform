import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";
import toast from "react-hot-toast";

export function useAddProductToCart() {
  const { BASE_URL } = useStore();
  const queryClient = useQueryClient();
  const { mutate: addProduct, isLoading: isAdding } = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axios.post(`${BASE_URL}/shoppingCart`, newProduct);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product successfully added to Cart");
      queryClient.invalidateQueries({ queryKey: ["CartProducts"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAdding, addProduct };
}
