import useAxiosSecure from "@/hooks/useAxiosSecure";

export function useServicePackages() {
  const axiosSecure = useAxiosSecure();

  // Add New Service Function
  const createServicePackage = async (serviceData: ServiceData) => {
    try {
      const { data } = await axiosSecure.post(
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
  const getAllServices = async (page = 1, limit = 10) => {
    try {
      const { data } = await axiosSecure.get(
        `/service/-all-service?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Get Service by ID Function (Replace with your actual API endpoint)
  const getServiceById = async (serviceId: string) => {
    try {
      const { data } = await axiosSecure.get(`/service/${serviceId}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Update Service Function (Replace with your actual API endpoint)
  const updateService = async (serviceId: string, serviceData: ServiceData) => {
    try {
      const { data } = await axiosSecure.put(
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
  const deleteService = async (serviceId: string) => {
    try {
      const { data } = await axiosSecure.delete(`/service/delete/${serviceId}`);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  // ? Travel Packages Services Related Function

  // Add New Travel Service Function
  const createTravelServicePackage = async (serviceData: TravelServiceData) => {
    try {
      const { data } = await axiosSecure.post(`/Tour/create-tour`, serviceData);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Get ALl Travel Packages Function
  const getTravelPackages = async (page = 1, limit = 10, filter = "") => {
    try {
      const { data } = await axiosSecure.get(
        `/Tour/all-tour?page=${page}&limit=${limit}&searchTerm=${filter}`
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  //Get Travel Packages for a single user
  const getTravelPackagesForUser = async (userId = "") => {
    try {
      const { data } = await axiosSecure.get(`/Tour/user/tour/${userId}`);
      return data;
    } catch (error) {
      // console.error("from line 176 API Error:", error);
      throw error;
    }
  };
  // Get Single Travel Package Function
  const getSingleTravelPackage = async (id: string) => {
    try {
      const { data } = await axiosSecure.get(`/Tour/ById/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Update a Single Travel Package Function
  const updateTravelPackage = async (
    packageId: string,
    packageData: TravelServiceData
  ) => {
    try {
      const { data } = await axiosSecure.put(
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
  const deleteTravelPackage = async (id: string) => {
    try {
      const { data } = await axiosSecure.delete(`/Tour/delete/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // ? Flight Service Related All Function

  // Add New Flight Service Function
  const createFlightServicePackage = async (serviceData: FlightServiceData) => {
    try {
      const { data } = await axiosSecure.post(
        `/flight/create-flight`,
        serviceData
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Get ALl Flight Packages Function
  const getFlightPackages = async (page = 1, limit = 10, filter = "") => {
    try {
      const { data } = await axiosSecure.get(
        `/flight/all-flight?page=${page}&limit=${limit}&searchTerm=${filter}`
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Get Flight Packages for a single user
  const getFlightPackagesForUser = async (userId = "") => {
    try {
      const { data } = await axiosSecure.get(`/flight/user/flight/${userId}`);
      return data;
    } catch (error) {
      // console.error("from line 176 API Error:", error);
      throw error;
    }
  };

  // Get Single Flight Packages Function
  const getSingleFlightPackage = async (id: string) => {
    try {
      const { data } = await axiosSecure.get(`/flight/ById/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Update a Single Flight Package Function
  const updateFlightPackage = async (
    packageId: string,
    packageData: FlightServiceData
  ) => {
    try {
      const { data } = await axiosSecure.put(
        `/flight/update/${packageId}`,
        packageData
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Delete a Single Flight Package Function
  const deleteFlightPackage = async (id: string) => {
    try {
      const { data } = await axiosSecure.delete(`/flight/delete/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };


  // ? Hotel Service Related All Function
  // Add New Hotel Service Function
  const createHotelServicePackage = async (serviceData: HotelServiceData) => {
    try {
      const { data } = await axiosSecure.post(
        `/hotel/create-hotel`,
        serviceData
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  
  // Get ALl Hotel Packages Function
  const getHotelPackages = async (page = 1, limit = 10, filter = "") => {
    try {
      const { data } = await axiosSecure.get(
        `/hotel/all-hotel?page=${page}&limit=${limit}&searchTerm=${filter}`
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Get Hotel Packages for a single user
  const getHotelPackagesForUser = async (userId = "") => {
    try {
      const { data } = await axiosSecure.get(`/hotel/user/hotel/${userId}`);
      return data;
    } catch (error) {
      // console.error("from line 176 API Error:", error);
      throw error;
    }
  };

  // Get Single Hotel Packages Function
  const getSingleHotelPackage = async (id: string) => {
    try {
      const { data } = await axiosSecure.get(`/hotel/ById/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Update a Single Travel Package Function
  const updateHotelPackage = async (
    packageId: string,
    packageData: HotelServiceData
  ) => {
    try {
      const { data } = await axiosSecure.put(
        `/hotel/update/${packageId}`,
        packageData
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Delete a Single Hotel Package Function
  const deleteHotelPackage = async (id: string) => {
    try {
      const { data } = await axiosSecure.delete(`/hotel/delete/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // ? Guider Service Related All Function
  // Add New Guider Service Function
  const createGuiderServicePackage = async (serviceData: GuiderServiceData) => {
    try {
      const { data } = await axiosSecure.post(
        `/guider/create-guider`,
        serviceData
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  
  // Get ALl Guider Packages Function
  const getGuiderServices = async (page = 1, limit = 10, filter = "") => {
    try {
      const { data } = await axiosSecure.get(
        `/guider/all-guider?page=${page}&limit=${limit}&searchTerm=${filter}`
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Get Guider Packages for a single user
  const getGuiderServicesForUser = async (userId = "") => {
    try {
      const { data } = await axiosSecure.get(`/guider/user/guider/${userId}`);
      return data;
    } catch (error) {
      // console.error("from line 176 API Error:", error);
      throw error;
    }
  };

  // Get Single Guider Packages Function
  const getSingleGuiderService = async (id: string) => {
    try {
      const { data } = await axiosSecure.get(`/guider/ById/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Update a Single Guider Package Function
  const updateGuiderService = async (
    packageId: string,
    packageData: GuiderServiceData
  ) => {
    try {
      const { data } = await axiosSecure.put(
        `/guider/update/${packageId}`,
        packageData
      );
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  // Delete a Single Guider Package Function
  const deleteGuiderService = async (id: string) => {
    try {
      const { data } = await axiosSecure.delete(`/guider/delete/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };


  // ? messages related services function

  const sendMessage = async (receiverId: string, message: string) => {
    try {
      const { data } = await axiosSecure.post(`/message/send/${receiverId}`, {
        messages: message,
      });
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  const getMessages = async (id: string) => {
    if (!id) return [];
    try {
      const { data } = await axiosSecure.get(`/message/${id}`);
      return data;
    } catch (error) {
      // console.error("API Error:", error);
      throw error;
    }
  };

  return {
    createServicePackage,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    createTravelServicePackage,
    getTravelPackages,
    getTravelPackagesForUser,
    getSingleTravelPackage,
    updateTravelPackage,
    deleteTravelPackage,
    createFlightServicePackage,
    getFlightPackages,
    getFlightPackagesForUser,
    getSingleFlightPackage,
    updateFlightPackage,
    deleteFlightPackage,
    createHotelServicePackage,
    getHotelPackages,
    getHotelPackagesForUser,
    getSingleHotelPackage,
    updateHotelPackage,
    deleteHotelPackage,
    createGuiderServicePackage,
    getGuiderServices,
    getGuiderServicesForUser,
    getSingleGuiderService,
    updateGuiderService,
    deleteGuiderService,
    getMessages,
    sendMessage,
  };
}
