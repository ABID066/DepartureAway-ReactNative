import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const axiosSecure = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  // const { logOut } = useAuth()
  const router = useRouter();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("error tracked in the interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          // await logOut()
          router.push("/signIn");
        }
        return Promise.reject(error);
      }
    );
  }, [router]);

  return axiosSecure;
};

export default useAxiosSecure;
