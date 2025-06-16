import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useServicePackages } from "@/hooks/useServicePackages";
import { useAuth } from "@/hooks/useAuth";

const itemsPerPage = 10;

const HotelServices = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { getHotelPackages, getHotelPackagesForUser, deleteHotelPackage } =
    useServicePackages();

  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Admin: Infinite Query
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    status: infiniteStatus,
    error: infiniteError,
  } = useInfiniteQuery({
    queryKey: ["hotelPackages", "services"],
    queryFn: ({ pageParam = 1 }) => getHotelPackages(pageParam, itemsPerPage),
    initialPageParam: 1,
    enabled: user?.role === "admin",
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage?.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });

  // Non-admin: Normal Query (All at once)
  const {
    data: userData,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryKey: ["userHotelPackages", user?.id],
    queryFn: () => getHotelPackagesForUser(user?.id),
    enabled: user?.role !== "admin",
  });

  const { mutateAsync: deleteHotelPackageMutation, reset } = useMutation({
    mutationKey: ["hotel-services", "services"],
    mutationFn: async (id: string) => await deleteHotelPackage(id),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Hotel Service Deleted Successfully",
        position: "top",
      });
      reset();
      router.push("/dashboard/services/hotel-services");
    },
  });

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteHotelPackageMutation(selectedId);
    } catch (error) {
      console.error("Error deleting hotel package:", error);
      Toast.show({
        type: "error",
        text1: "Failed to delete hotel service",
        position: "top",
      });
    } finally {
      setModalVisible(false);
      setSelectedId(null);
    }
  };

  // Handle current page data
  const getCurrentPageData = () => {
    if (user?.role === "admin") {
      return infiniteData?.pages[currentPage - 1]?.data || [];
    } else {
      const allData = userData?.data || [];
      const startIndex = (currentPage - 1) * itemsPerPage;
      return allData?.slice(startIndex, startIndex + itemsPerPage);
    }
  };

  const getTotalItems = () => {
    if (user?.role === "admin") {
      return infiniteData?.pages[0]?.meta?.total || 0;
    } else {
      return userData?.data?.length || 0;
    }
  };

  const loading =
    (user?.role === "admin" && infiniteStatus === "pending") ||
    (user?.role !== "admin" && userStatus === "pending");

  const error =
    (user?.role === "admin" && infiniteError) ||
    (user?.role !== "admin" && userError);

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    if (user?.role === "admin" && newPage > (infiniteData?.pages.length || 0)) {
      await fetchNextPage();
    }
  };

  const currentPageData = getCurrentPageData();
  const totalItems = getTotalItems();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const nextButtonDisabled =
    (user?.role === "admin"
      ? !hasNextPage && currentPage === totalPages
      : currentPage === totalPages) || loading;
  const prevButtonDisabled = currentPage === 1 || loading;

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#E11D48' />
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-red-500'>Error loading packages</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white p-4'>
      <View className='flex-row justify-between items-center my-6'>
        <Text className='text-2xl font-bold'>Hotel Services</Text>
        <Link href='/dashboard/services/hotel-services/create-new' asChild>
          <TouchableOpacity className='bg-[#FF1A5A] px-4 py-2 rounded-lg'>
            <Text className='text-white font-medium'>
              + Create New Hotel Service
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      {currentPageData.length > 0 ? (
        <>
          <ScrollView
            className='flex max-h-auto mt-16'
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View className='min-w-[1200px]'>
              {/* Table Header */}
              <View className='flex-row bg-gray-50 border border-gray-200 rounded-t-md gap-1'>
                <View className='w-[26%] px-4 py-3'>
                  <Text className='font-medium text-gray-600 text-base uppercase'>
                    Basic Package
                  </Text>
                </View>
                <View className='w-[26%] px-4 py-3'>
                  <Text className='font-medium text-gray-600 text-base uppercase'>
                    Standard Package
                  </Text>
                </View>
                <View className='w-[12%] px-4 py-3'>
                  <Text className='font-medium text-gray-600 text-base uppercase'>
                    Location
                  </Text>
                </View>
                <View className='w-[10%] px-4 py-3'>
                  <Text className='font-medium text-gray-600 text-base uppercase'>
                    Basic Price
                  </Text>
                </View>
                <View className='w-[10%] px-4 py-3'>
                  <Text className='font-medium text-gray-600 text-base uppercase'>
                    Standard Price
                  </Text>
                </View>
                <View className='w-[15%] px-4 py-3'>
                  <Text className='font-medium text-gray-600 text-base uppercase'>
                    Actions
                  </Text>
                </View>
              </View>

              {/* Table Body */}
              <ScrollView>
                {currentPageData?.map(
                  (service: HotelServiceData, index: number) => (
                    <View
                      key={index}
                      className='flex-row border border-t-0 border-gray-100 gap-1'>
                      <View className='w-[26%] px-4 py-3'>
                        <Text
                          numberOfLines={1}
                          className='font-medium text-base overflow-hidden'>
                          {service?.title}
                        </Text>
                      </View>
                      <View className='w-[26%] px-4 py-3'>
                        <Text
                          numberOfLines={1}
                          className='font-medium text-base overflow-hidden'>
                          {service?.title1}
                        </Text>
                      </View>
                      <View className='w-[12%] px-4 py-3'>
                        <Text className='text-gray-600 text-base'>
                          {service?.location}
                        </Text>
                      </View>
                      <View className='w-[10%] px-4 py-3'>
                        <Text className='text-gray-600 text-base'>
                          ${service?.basicPrice}
                        </Text>
                      </View>
                      <View className='w-[10%] px-4 py-3'>
                        <Text className='text-gray-600 text-base'>
                          ${service?.standardPrice}
                        </Text>
                      </View>
                      <View className='w-[15%] px-4 py-3 flex-row gap-4'>
                        <Link
                          href={`/dashboard/services/hotel-services/update/${service?._id}`}
                          asChild>
                          <Text className='text-blue-500 text-base'>Edit</Text>
                        </Link>
                        <TouchableOpacity
                          onPress={() =>
                            confirmDelete(String(service?._id || ""))
                          }>
                          <Text className='text-red-500 text-base'>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          </ScrollView>

          {/* Pagination */}
          <View className='flex-row justify-center items-center mt-4 gap-2 py-4 max-w-[100vw]'>
            <TouchableOpacity
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={prevButtonDisabled}
              className={`px-3 py-2 rounded ${
                prevButtonDisabled ? "bg-gray-200" : "bg-[#FF1A5A]"
              }`}>
              <Text
                className={`font-bold ${
                  prevButtonDisabled ? "text-gray-500" : "text-white"
                }`}>
                Prev
              </Text>
            </TouchableOpacity>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                const showFirst = page === 1;
                const showLast = page === totalPages;
                const showAround = Math.abs(page - currentPage) <= 1;
                return showFirst || showLast || showAround;
              })
              .map((page, index, array) => {
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <Text className='text-gray-500'>...</Text>
                      <TouchableOpacity
                        onPress={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded ${
                          currentPage === page ? "bg-[#FF1A5A]" : "bg-gray-200"
                        }`}>
                        <Text
                          className={`font-bold ${
                            currentPage === page
                              ? "text-white"
                              : "text-gray-500"
                          }`}>
                          {page}
                        </Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  );
                }
                return (
                  <TouchableOpacity
                    key={page}
                    onPress={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded ${
                      currentPage === page ? "bg-[#FF1A5A]" : "bg-gray-200"
                    }`}>
                    <Text
                      className={`font-bold ${
                        currentPage === page ? "text-white" : "text-gray-500"
                      }`}>
                      {page}
                    </Text>
                  </TouchableOpacity>
                );
              })}

            <TouchableOpacity
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={nextButtonDisabled}
              className={`px-3 py-2 rounded ${
                nextButtonDisabled ? "bg-gray-200" : "bg-[#FF1A5A]"
              }`}>
              <Text
                className={`font-bold ${
                  nextButtonDisabled ? "text-gray-500" : "text-white"
                }`}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {user?.role === "admin" ? (
            <View className='flex-1 items-center justify-center bg-white px-4'>
              <Text className='text-lg text-gray-600 font-medium text-center'>
                No{" "}
                <Text className='text-[#FF1A5A] font-bold'>Hotel Services</Text>{" "}
                found in the system.
              </Text>
              <Text className='text-sm text-gray-500 mt-2 text-center'>
                Please ask users to create some or use the{" "}
                <Text className='text-[#FF1A5A] font-semibold'>
                  "+ Create New Hotel Service"
                </Text>{" "}
                button to add one.
              </Text>
            </View>
          ) : (
            <View className='flex-1 items-center justify-center bg-white px-4'>
              <Text className='text-lg text-gray-600 font-medium text-center'>
                You haven't created any{" "}
                <Text className='text-[#FF1A5A] font-bold'>Hotel Services</Text>{" "}
                yet.
              </Text>
              <Text className='text-sm text-gray-500 mt-2 text-center'>
                Start by tapping on the{" "}
                <Text className='text-[#FF1A5A] font-semibold'>
                  "+ Create New Hotel Service"
                </Text>{" "}
                button above.
              </Text>
            </View>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}>
        <View className='flex-1 justify-center items-center bg-black/40'>
          <View className='bg-white p-6 rounded-lg w-80 shadow-lg'>
            <Text className='text-lg font-bold mb-4 text-center'>
              Are you sure you want to delete this service?
            </Text>
            <View className='flex-row justify-between mt-4'>
              <TouchableOpacity
                className='bg-gray-200 px-4 py-2 rounded'
                onPress={() => setModalVisible(false)}>
                <Text className='text-gray-700 font-bold'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='bg-red-500 px-4 py-2 rounded'
                onPress={handleDelete}>
                <Text className='text-white font-bold'>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HotelServices;
