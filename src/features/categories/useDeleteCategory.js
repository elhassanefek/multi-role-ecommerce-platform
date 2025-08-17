import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteCategory() {
  const url = "http://localhost:9000";
  const queryCLient = useQueryClient();
  const { mutate: deleteCategory, isLoading: isDeletingCategory } = useMutation(
    {
      mutationFn: async (id) => {
        const res = await axios.delete(`${url}/categories/${id}`);
        return res.data;
      },
      onSuccess: () => {
        queryCLient.invalidateQueries({ queryKey: ["categories"] });
      },
    }
  );
  return { deleteCategory, isDeletingCategory };
}
