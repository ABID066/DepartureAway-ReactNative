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
    // console.error("API Error:", error);
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
    // console.error("API Error:", error);
    throw error;
  }
};

// Get Service by ID Function (Replace with your actual API endpoint)
export const getServiceById = async (serviceId: string) => {
  try {
    const { data } = await axiosCommon.get(`/service/${serviceId}`);
    return data;
  } catch (error) {
    // console.error("API Error:", error);
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
    // console.error("API Error:", error);
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

// ? Travel Packages Services Related Function

// Add New Service Function
export const createTravelServicePackage = async (
  serviceData: TravelServiceData
) => {
  try {
    const { data } = await axiosCommon.post(`/Tour/create-tour`, serviceData);
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// Get ALl Travel Packages Function
export const getTravelPackages = async (page = 1, limit = 10, filter = "") => {
  try {
    const { data } = await axiosCommon.get(
      `/Tour/all-tour?page=${page}&limit=${limit}&searchTerm=${filter}`
    );
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// Get Single Travel Package Function
export const getSingleTravelPackage = async (id: string) => {
  try {
    const { data } = await axiosCommon.get(`/Tour/ById/${id}`);
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// Update a Single Travel Package Function
export const updateTravelPackage = async (
  packageId: string,
  packageData: TravelServiceData
) => {
  try {
    const { data } = await axiosCommon.put(
      `/Tour/update/${packageId}`,
      packageData
    );
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// Delete a Single Travel Package Function
export const deleteTravelPackage = async (id: string) => {
  try {
    const { data } = await axiosCommon.delete(`/Tour/delete/${id}`);
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// ? Flight Service Related All Function

// Add New Service Function
export const createFlightServicePackage = async (
  serviceData: TravelServiceData
) => {
  try {
    const { data } = await axiosCommon.post(
      `/flight/create-flight`,
      serviceData
    );
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// Get ALl Travel Packages Function
export const getFlightPackages = async (page = 1, limit = 10, filter = "") => {
  try {
    const { data } = await axiosCommon.get(
      `/flight/all-flight?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};

// Get ALl Travel Packages Function
export const getSingleFlightPackages = async (id: string) => {
  try {
    const { data } = await axiosCommon.get(`/flight/ById/${id}`);
    return data;
  } catch (error) {
    // console.error("API Error:", error);
    throw error;
  }
};
