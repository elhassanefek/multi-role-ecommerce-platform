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
    mutationFn: async ({ email, password, role }) => {
      const { data } = await axios.get(
        `${API_URL}?email=${email}&password=${password}&$role=${role}`
      );
      if (data.length === 0) {
        throw new Error("Invalid credentials or role");
      }
      return data[0];
    },
    onSuccess: (userData) => {
      console.log(userData);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name || userData.email}`);

      //role based navigation
      if (userData.role === "seller") {
        navigate("/seller/dashboard", { replace: true });
      } else if (userData.role === "customer") {
        navigate("/store", { replace: true });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoggingIn, error, user };
}
