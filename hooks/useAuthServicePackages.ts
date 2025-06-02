import useAxiosCommon from "@/hooks/useAxiosCommon";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export function useAuthServicePackages() {
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const createUser = async (userData: UserData) => {
    try {
      const { data } = await axiosCommon.post(`/user/create-user`, userData);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  const verifyOTP = async (otpCode: string) => {
    try {
      const { data } = await axiosCommon.patch(`/user/verifyEmail`, {
        code: otpCode,
      });
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  const loginUser = async (authData: { email: string; password: string }) => {
    try {
      const { data } = await axiosCommon.post(`/auth/login`, authData);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // ? Guider Related Function
  const getTopRatedGuider = async () => {
    try {
      const { data } = await axiosSecure.get(`/guider/all-guider`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  return {
    createUser,
    verifyOTP,
    loginUser,
    getTopRatedGuider,
  };
}
