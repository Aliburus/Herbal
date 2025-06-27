import { useState, useEffect } from "react";
import { AdminUser } from "../types";
import {
  login as apiLogin,
  logout as apiLogout,
  getMe,
} from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMe()
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiLogin({ email, password });
      setUser(res.data.user);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isUser: user?.role === "user",
  };
};
