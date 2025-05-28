import useAxiosCommon from "@/hooks/useAxiosCommon";

const axiosCommon = useAxiosCommon();

// Add New Service Function
export const createServicePackage = async (serviceData: ServiceData) => {
  try {
    const { data } = await axiosCommon.post(
      `/service/create-service`,
      serviceData
    );
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Get All Services Function
export const getAllServices = async (page = 1, limit = 10) => {
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

// Get ALl Travel Packages Function
export const getTravelPackages = async (page = 1, limit = 10) => {
  try {
    const { data } = await axiosCommon.get(
      `/Tour/all-tour?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Get Service by ID Function (Replace with your actual API endpoint)
export const getServiceById = async (serviceId: string) => {
  try {
    const { data } = await axiosCommon.get(`/service/${serviceId}`);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Update Service Function (Replace with your actual API endpoint)
export const updateService = async (
  serviceId: string,
  serviceData: ServiceData
) => {
  try {
    const { data } = await axiosCommon.put(
      `/service/update/${serviceId}`,
      serviceData
    );
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
// Delete Service Function (Replace with your actual API endpoint)
export const deleteService = async (serviceId: string) => {
  try {
    const { data } = await axiosCommon.delete(`/service/delete/${serviceId}`);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

