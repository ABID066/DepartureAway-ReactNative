import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveLoginInfo: (token: string) => Promise<void>;
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

  // ✅ Axios instance
  const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL as string, 
  });

  // ✅ Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("verifyToken");

        if (token) {
          const { data } = await axiosInstance.get("/user/userBYToken", {
            headers: {
              Authorization: `${token}`,
            },
          });
          const userData = await data.data;

          setUser({
            id: userData?.id,
            userName: userData?.userName,
            name: userData?.name,
            email: userData?.email,
            phone: userData?.phone,
            role: userData?.role,
            image: userData?.image,
          });
        } else {
          setUser(null);
        }
      } catch (error: any) {
        // console.error(
        //   "Auth check failed:",
        //   error?.response?.data || error.message
        // );
        setUser(null);
        await AsyncStorage.removeItem("verifyToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Save login info
  const saveLoginInfo = async (token: string) => {
    await AsyncStorage.setItem("verifyToken", token);

    try {
      const { data } = await axiosInstance.get("/user/userBYToken", {
        headers: {
          Authorization: `${token}`,
        },
      });

      const userData = await data.data;

      setUser({
        id: userData?.id,
        userName: userData?.userName,
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
        role: userData?.role,
        image: userData?.image,
      });
    } catch (error: any) {
      // console.error(
      //   "Login verify failed:",
      //   error?.response?.data || error.message
      // );
      setUser(null);
    }
  };

  // ✅ Logout
  const logout = async () => {
    await AsyncStorage.removeItem("verifyToken");
    setUser(null);
  };

  const authInfo: AuthContextType = {
    user,
    setUser,
    loading,
    saveLoginInfo,
    logout,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
