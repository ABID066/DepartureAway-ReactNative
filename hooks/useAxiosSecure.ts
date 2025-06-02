import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks/useAuth";

const axiosSecure = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// ✅ Custom hook
const useAxiosSecure = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ Request interceptor to attach token in headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem("verifyToken");
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // ✅ Response interceptor for 401/403
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        // console.log("Interceptor Error:", error?.response?.status);
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logout();
          router.push("/signIn");
        }
        return Promise.reject(error);
      }
    );

    // ✅ Eject interceptor on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, router]);

  return axiosSecure;
};

export default useAxiosSecure;
