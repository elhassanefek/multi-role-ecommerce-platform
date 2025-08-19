import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:9002/users";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: async (updateUser) => {
      const { data } = await axios.patch(
        `${API_URL}/${updateUser.id}`,
        updateUser
      );
    },
    onSuccess: () => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"]);
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
