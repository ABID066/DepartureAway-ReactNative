import axios from "axios";
const axiosCommon = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
