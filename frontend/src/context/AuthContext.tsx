// src/context/AuthContext.tsx
import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { token } from "../utils/constants";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// دالة لجلب بيانات المستخدم من الباك إند
const fetchUser = async (): Promise<User | null> => {
  if (!token) return null;

  const { data } = await axios.get("http://localhost:5000/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // استخدام React Query لجلب المستخدم

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: Infinity,
    retry: false,
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    window.location.reload(); // لإعادة تحميل بيانات المستخدم من الباك إند
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // لتحديث الحالة بعد تسجيل الخروج
  };

  return (
    <AuthContext.Provider
      value={{ user: userData || null, login, logout, isLoading: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
