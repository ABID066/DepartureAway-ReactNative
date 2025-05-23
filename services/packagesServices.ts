import useAxiosCommon from "@/hooks/useAxiosCommon";

const axiosCommon = useAxiosCommon();
export const getTravelPackages = async (page = 1, limit = 10) => {
  try {
    const { data } = await axiosCommon.get(
      `/service/-all-service?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
