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

const TravelServices = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { getTravelPackages, getTravelPackagesForUser, deleteTravelPackage } =
    useServicePackages();

  const isAdmin = user?.role === "admin";
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ✨ Admin: InfiniteQuery
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    status: adminStatus,
    error: adminError,
  } = useInfiniteQuery({
    queryKey: ["travelPackages", "all"],
    queryFn: ({ pageParam = 1 }) => getTravelPackages(pageParam, itemsPerPage),
    initialPageParam: 1,
    enabled: isAdmin,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });

  // 👤 User: Simple Query
  const {
    data: userData,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryKey: ["userTravelPackages", user?.id],
    queryFn: () => getTravelPackagesForUser(user?.id),
    enabled: !isAdmin,
  });

  const { mutateAsync: deleteTravelMutation, reset } = useMutation({
    mutationKey: ["travelPackages", "delete"],
    mutationFn: async (id: string) => await deleteTravelPackage(id),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Travel Service Deleted Successfully",
        position: "top",
      });
      reset();
      router.replace("/dashboard/services/travel-services");
    },
  });

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteTravelMutation(selectedId);
    } catch {
      Toast.show({
        type: "error",
        text1: "Failed to delete travel service",
        position: "top",
      });
    } finally {
      setModalVisible(false);
      setSelectedId(null);
    }
  };

  const loading = isAdmin
    ? adminStatus === "pending"
    : userStatus === "pending";
  const error = isAdmin ? adminError : userError;

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

  const allData = isAdmin
    ? infiniteData?.pages.flatMap((p) => p.data) || []
    : userData?.data || [];

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentPageData = isAdmin
    ? infiniteData?.pages[currentPage - 1]?.data || []
    : allData.slice(start, end);

  const totalItems = isAdmin
    ? infiniteData?.pages[0]?.meta.total || 0
    : allData?.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextDisabled =
    (isAdmin
      ? !hasNextPage && currentPage === totalPages
      : currentPage === totalPages) || loading;
  const prevDisabled = currentPage === 1 || loading;

  const handlePage = async (page: number) => {
    setCurrentPage(page);
    if (isAdmin && page > (infiniteData?.pages.length || 0)) {
      await fetchNextPage();
    }
  };

  return (
    <View className='flex-1 bg-white p-4'>
      <View className='flex-row justify-between items-center my-6'>
        <Text className='text-2xl font-bold'>Travel Services</Text>
          <Link href='/dashboard/services/travel-services/create-new' asChild>
            <TouchableOpacity className='bg-[#FF1A5A] px-4 py-2 rounded-lg'>
              <Text className='text-white font-medium'>
                + Create New Travel Service
              </Text>
            </TouchableOpacity>
          </Link>
      </View>

      {currentPageData.length ? (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className='min-w-[1000px] mt-16'>
              <View className='flex-row bg-gray-50 border border-gray-200 rounded-t-md'>
                <Text className='w-[35%] px-4 py-3 font-medium text-base uppercase'>
                  Title
                </Text>
                <Text className='w-[15%] px-4 py-3 font-medium text-base uppercase'>
                  Category
                </Text>
                <Text className='w-[15%] px-4 py-3 font-medium text-base uppercase'>
                  Basic Price
                </Text>
                <Text className='w-[15%] px-4 py-3 font-medium text-base uppercase'>
                  Standard Price
                </Text>

                <Text className='w-[20%] px-4 py-3 font-medium text-base uppercase'>
                  Actions
                </Text>
              </View>

              {currentPageData.map((service: TravelServiceData, i: number) => (
                <View key={i} className='flex-row border-t border-gray-100'>
                  <Text className='w-[35%] px-4 py-3'>{service.title}</Text>
                  <Text className='w-[15%] px-4 py-3'>{service.category}</Text>
                  <Text className='w-[15%] px-4 py-3'>${service.price1}</Text>
                  <Text className='w-[15%] px-4 py-3'>${service.price2}</Text>
                  <View className='w-[20%] px-4 py-3 flex-row gap-4'>
                    <Link
                      href={`/dashboard/services/travel-services/update/${service._id}`}
                      asChild>
                      <Text className='text-blue-500'>Edit</Text>
                    </Link>
                    <TouchableOpacity
                      onPress={() => confirmDelete(service?._id || "")}>
                      <Text className='text-red-500'>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Pagination Controls */}
          <View className='flex-row justify-center items-center mt-4 gap-2'>
            <TouchableOpacity
              onPress={() => handlePage(currentPage - 1)}
              disabled={prevDisabled}
              className={`px-3 py-2 rounded ${
                prevDisabled ? "bg-gray-200" : "bg-[#FF1A5A]"
              }`}>
              <Text
                className={`font-bold ${
                  prevDisabled ? "text-gray-500" : "text-white"
                }`}>
                Prev
              </Text>
            </TouchableOpacity>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <TouchableOpacity
                  key={page}
                  onPress={() => handlePage(page)}
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
              )
            )}

            <TouchableOpacity
              onPress={() => handlePage(currentPage + 1)}
              disabled={nextDisabled}
              className={`px-3 py-2 rounded ${
                nextDisabled ? "bg-gray-200" : "bg-[#FF1A5A]"
              }`}>
              <Text
                className={`font-bold ${
                  nextDisabled ? "text-gray-500" : "text-white"
                }`}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className='flex-1 items-center justify-center bg-white px-4'>
          <Text className='text-lg text-gray-600 font-medium text-center'>
            {isAdmin ? (
              <>
                No{" "}
                <Text className='text-[#FF1A5A] font-bold'>
                  Travel Services
                </Text>{" "}
                found.
              </>
            ) : (
              <>
                You haven’t created any{" "}
                <Text className='text-[#FF1A5A] font-bold'>
                  Travel Services
                </Text>{" "}
                yet.
              </>
            )}
          </Text>
          {!isAdmin && (
            <Text className='text-sm text-gray-500 mt-2 text-center'>
              Tap on{" "}
              <Text className='text-[#FF1A5A] font-semibold'>
                “+ Create New Travel Service”
              </Text>{" "}
              to add one.
            </Text>
          )}
        </View>
      )}

      {/* Delete Modal */}
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

export default TravelServices;
