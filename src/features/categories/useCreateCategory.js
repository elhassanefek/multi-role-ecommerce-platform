import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateCategory() {
  const url = "http://localhost:9000";
  const queryclient = useQueryClient();
  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: async (newCategory) => {
      const res = await axios.post(`${url}/categories`, newCategory);
      return res.data;
    },
    onSuccess: () =>
      queryclient.invalidateQueries({ queryKey: ["categories"] }),
  });
  return { createCategory, isCreating };
}
