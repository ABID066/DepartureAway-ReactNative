import useAxiosCommon from "@/hooks/useAxiosCommon";

const axiosCommon = useAxiosCommon();
export const createUser = async (userData: UserData) => {
  try {
    const { data } = await axiosCommon.post(`/user/create-user`, userData);
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

export const verifyOTP = async (otpCode: string) => {
  try {
    const { data } = await axiosCommon.patch(`/user/verifyEmail`, {code: otpCode});
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const loginUser = async (authData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosCommon.post(`/auth/login`, authData);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ? Guider Related Function
export const getTopRatedGuider = async () => {
  try {
    const { data } = await axiosCommon.get(`/guider/all-guider`);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
