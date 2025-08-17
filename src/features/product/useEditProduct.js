import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useStore } from "../../contexts/StoreContext";
import axios from "axios";

export function useEditProduct() {
  const { BASE_URL } = useStore();
  const queryClient = useQueryClient();

  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    mutationFn: async ({ id, updatedFields }) => {
      const res = await axios.patch(
        `${BASE_URL}/products/${id}`,
        updatedFields
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product successflully edited");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editProduct, isEditing };
}
