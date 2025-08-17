import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useEditCustomer() {
  const url = "http://localhost:9001";
  const queryClient = useQueryClient();

  const { mutate: editCustomer, isLoading: isEditing } = useMutation({
    mutationFn: async (updatedCustomer) => {
      const res = await axios.patch(
        `${url}/customers/${updatedCustomer.id}`,
        updatedCustomer
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return { editCustomer, isEditing };
}
