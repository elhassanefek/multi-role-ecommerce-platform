import { useEffect, useState } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useUser() {
  const [user, setUser] = useLocalStorageState(null, "user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate any async authentication checks here if needed
    // You could validate the user token here if using JWT
    setLoading(false);
  }, []);

  function logout() {
    setUser(null);
    // Optional: Clear other localStorage items if needed
    // localStorage.removeItem('token');
  }

  function updateUser(updatedData) {
    setUser((prev) => ({ ...prev, ...updatedData }));
  }

  // Validate user object structure if needed
  function isValidUser(user) {
    return user && typeof user === "object" && user.email;
  }

  return {
    user,
    isAuthenticated: !!user && isValidUser(user),
    loading,
    logout,
    updateUser,
  };
}
