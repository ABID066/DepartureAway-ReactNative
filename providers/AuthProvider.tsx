import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  image?: string;
  userName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setToken: (verifyToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔁 Check user on first load
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const verifyToken = await AsyncStorage.getItem("verifyToken");
        if (!verifyToken) {
          setUser(null);
        }else{
          setUser(user);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Login: Just store verifyToken
  const setToken = async (verifyToken: string) => {
    setLoading(true);
    await AsyncStorage.setItem("verifyToken", verifyToken);
    setLoading(false);
  };

  // ❌ Logout: Clear verifyToken + user
  const logout = async () => {
    setLoading(true);
    await AsyncStorage.removeItem("verifyToken");
    setUser(null);
    setLoading(false);
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    setUser,
    setToken,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
