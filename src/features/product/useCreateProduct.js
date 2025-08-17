import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../../contexts/StoreContext";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const { BASE_URL } = useStore();
  const queyClient = useQueryClient();

  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axios.post(`${BASE_URL}/products`, newProduct);
      return res.data;
    },
    onSuccess: () => {
      toast.success("New product successfully created");
      queyClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createProduct };
}
