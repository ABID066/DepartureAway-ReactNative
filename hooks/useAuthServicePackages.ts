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

  const getAllUserData = async () => {
    try {
      const { data } = await axiosSecure.get(`/user/all-users`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getServiceCreatorInfo = async (creatorId: string) => {
    try {
      const { data } = await getAllUserData();
      const creatorData = data.find(
        (user: UserData1) => user?.id === creatorId
      );
      console.log(creatorData);
    } catch (error) {}
  };

  const getUserDataByEmail = async (email: string) => {
    try {
      const { data } = await axiosSecure.get(`/user/userByEmail/${email}`);
      return data;
    } catch (error) {
      throw error;
    }
  };
  const getUserDataByToken = async () => {
    try {
      const { data } = await axiosSecure.get(`/user/userByToken`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // update user profile

  const updateUserProfile = async (
    userId: string,
    updateUserData: UserData1
  ) => {
    try {
      const { data } = await axiosSecure.patch(
        `/user/updateUSerProfile/${userId}`,
        updateUserData
      );
      return data;
    } catch (error) {
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

  //
  const getAllUserName = async () => {
    try {
      const { data } = await axiosSecure.get(`/user/all-userName`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      const { data } = await axiosCommon.post(
        "/auth/resendVerificationCode",
        {email}
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    createUser,
    verifyOTP,
    loginUser,
    getAllUserData,
    getAllUserName,
    getUserDataByEmail,
    getUserDataByToken,
    updateUserProfile,
    getTopRatedGuider,
    getServiceCreatorInfo,
    resendVerificationCode
  };
}
