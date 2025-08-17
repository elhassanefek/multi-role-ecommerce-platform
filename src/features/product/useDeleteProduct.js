import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const { BASE_URL } = useStore();
  const queryCLient = useQueryClient();
  const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_URL}/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product successfully deleted");
      queryCLient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteProduct, isDeleting };
}
