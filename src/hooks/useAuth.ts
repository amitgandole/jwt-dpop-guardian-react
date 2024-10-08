import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/constants";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("dpop-token")
  );

  useEffect(() => {
    const token = localStorage.getItem("dpop-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(BASE_API_URL + "login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem("dpop-token", data.accessToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("dpop-token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
