import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { Modal } from "react-native";
import { useServicePackages } from "@/hooks/useServicePackages";

const FlightServices = () => {
  const router = useRouter();
  const { deleteFlightPackage, getFlightPackages } = useServicePackages();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const itemsPerPage = 10;

  const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
    queryKey: ["flightPackages", "services"],
    queryFn: ({ pageParam = 1 }) => getFlightPackages(pageParam, itemsPerPage),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    if (newPage > (data?.pages.length || 0)) {
      await fetchNextPage();
    }
  };

  const { mutateAsync: deleteFlightPackageMutation, reset } = useMutation({
    mutationKey: ["flight-services", "services"],
    mutationFn: async (id: string) => await deleteFlightPackage(id),
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Flight Service Deleted Successfully",
        position: "top",
      });
      reset();
      router.push("/dashboard/services/flight-services");
    },
  });

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteFlightPackageMutation(selectedId);
    } catch (error) {
      console.error("Error deleting flight package:", error);
      Toast.show({
        type: "error",
        text1: "Failed to delete flight service",
        position: "top",
      });
    } finally {
      setModalVisible(false);
      setSelectedId(null);
    }
  };

  if (status === "pending") {
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

  const currentPageData = data?.pages[currentPage - 1]?.data || [];
  const totalItems = data?.pages[0]?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextButtonDisabled =
    (!hasNextPage && currentPage === totalPages) || status !== "success";
  const prevButtonDisabled = currentPage === 1 || status !== "success";

  return (
    <View className='flex-1 bg-white p-4'>
      <View className='flex-row justify-between items-center my-6'>
        <Text className='text-2xl font-bold'>Flight Services</Text>
        <Link href='/dashboard/services/flight-services/create-new' asChild>
          <TouchableOpacity className='bg-[#FF1A5A] px-4 py-2 rounded-lg'>
            <Text className='text-white font-medium'>
              + Create New Flight Service
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView
        className='flex max-h-auto mt-16'
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View className='min-w-[1200px]'>
          {/* Table Header */}
          <View className='flex-row bg-gray-50 border border-gray-200 rounded-t-md gap-1'>
            <View className='w-[26%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base uppercase'>
                Economic Title
              </Text>
            </View>
            <View className='w-[26%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base uppercase'>
                Business Title
              </Text>
            </View>
            <View className='w-[12%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base uppercase'>
                Location
              </Text>
            </View>
            <View className='w-[10%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base uppercase'>
                Economic PRICE
              </Text>
            </View>
            <View className='w-[10%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base uppercase'>
                Business PRICE
              </Text>
            </View>
            <View className='w-[15%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base uppercase'>
                ACTIONS
              </Text>
            </View>
          </View>

          {/* Table Body */}
          {status === "success" ? (
            <ScrollView>
              {currentPageData?.map(
                (service: FlightServiceData, index: number) => (
                  <View
                    key={index + 1}
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
                        ${service?.economicPrice}
                      </Text>
                    </View>
                    <View className='w-[10%] px-4 py-3'>
                      <Text className='text-gray-600 text-base'>
                        ${service?.businessPrice}
                      </Text>
                    </View>

                    <View className='w-[15%] px-4 py-3 flex-row gap-4'>
                      <Link
                        href={`/dashboard/services/flight-services/update/${service?._id}`}
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
          ) : (
            <View className='justify-center items-center max-w-[100vw]'>
              <ActivityIndicator size='large' color='#E11D48' />
            </View>
          )}
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
                        currentPage === page ? "text-white" : "text-gray-500"
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

export default FlightServices;
