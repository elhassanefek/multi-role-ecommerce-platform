import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useDeleteCustomer() {
  const url = "http://localhost:9001";
  const queryCLient = useQueryClient();
  const { mutate: deleteCustomer, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${url}/customers/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Customer successfully deleted");
      queryCLient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteCustomer, isDeleting };
}
