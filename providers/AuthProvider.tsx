import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  saveLoginInfo: (verifyToken: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("from line number 31: ",user);

  // 🔁 Check user on first load
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const verifyToken = await AsyncStorage.getItem("verifyToken");
        if (!verifyToken) {
          setUser(null);
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
  const saveLoginInfo = async (verifyToken: string, user: User) => {
    setLoading(true);
    await AsyncStorage.setItem("verifyToken", verifyToken);
    setUser(user);
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
    saveLoginInfo,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// 🪝 Custom hook for useAuth
