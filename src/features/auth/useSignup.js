import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:9002/users";

export function useSignup() {
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isLoading: isSigningup,
    error,
  } = useMutation({
    mutationFn: async (newUser) => {
      const { data: existing } = await axios.get(
        `${API_URL}?email=${newUser.email}`
      );
      if (existing.length > 0) {
        throw new Error("User already exists");
      }
      const { data } = await axios.post(API_URL, newUser);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Signup successful!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isSigningup, error };
}
