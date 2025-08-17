import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "./useUser";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout: logoutUser } = useUser();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: async () => {
      // If you have a logout API endpoint, call it here
      // await axios.post(`${API_URL}/logout`);
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear user from localStorage
      logoutUser();

      // Clear all react-query cache
      queryClient.removeQueries();

      // Redirect to home page instead of login
      navigate("/", { replace: true });

      toast.success("Logged out successfully");
    },
    onError: (error) => {
      toast.error("Error logging out");
      console.error(error);
    },
  });

  return { logout, isLoggingOut };
}
