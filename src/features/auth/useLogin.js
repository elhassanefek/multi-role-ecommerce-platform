import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9002/users";

export function useLogin() {
  const [user, setUser] = useLocalStorageState(null, "user");
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await axios.get(
        `${API_URL}?email=${email}&password=${password}`
      );
      if (data.length === 0) {
        throw new Error("Invalid email or password");
      }
      return data[0];
    },
    onSuccess: (userData) => {
      console.log(userData);
      setUser(userData);
      toast.success(`Welcome back, ${userData.email}`);

      // Navigate to seller dashboard after successful login
      navigate("/seller/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoggingIn, error, user };
}
