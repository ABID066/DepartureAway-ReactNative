import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useServicePackages } from "@/hooks/useServicePackages";
import { useAuth } from "@/hooks/useAuth";

const itemsPerPage = 10;

const CountryServices = () => {
  const router = useRouter();
  const { getCountryData, deleteCountryData } = useServicePackages();

  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Admin-only infinite query
  const {
    data: infiniteData,
    fetchNextPage,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["countryPackages", "services"],
    queryFn: ({ pageParam = 1 }) => getCountryData(pageParam, itemsPerPage),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage?.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const { mutateAsync: deleteCountryDataMutation } = useMutation({
    mutationKey: ["delete-country", "services"],
    mutationFn: async (id: string) => await deleteCountryData(id),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Country deleted successfully",
      });
      router.replace("/dashboard/country-data");
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to delete country",
      });
    },
  });

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteCountryDataMutation(selectedId);
    setModalVisible(false);
    setSelectedId(null);
  };

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    if (newPage > (infiniteData?.pages.length || 0)) {
      await fetchNextPage();
    }
  };

  const currentPageData = infiniteData?.pages[currentPage - 1]?.data || [];
  const totalItems = infiniteData?.pages[0]?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isFetching && currentPage === 1) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF1A5A" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading countries</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center my-6">
        <Text className="text-2xl font-bold">Country Management</Text>
        <Link href="/dashboard/country-data/add-new" asChild>
          <TouchableOpacity className="bg-[#FF1A5A] px-4 py-2 rounded-lg">
            <Text className="text-white font-medium">+ Add New Country</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {currentPageData.length > 0 ? (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="min-w-[800px]">
              {/* Table Header */}
              <View className="flex-row bg-gray-50 border border-gray-200 rounded-t-md">
                <View className="w-[10%] px-4 py-3">
                  <Text className="font-medium text-gray-600">Country</Text>
                </View>
                <View className="w-[60%] px-4 py-3">
                  <Text className="font-medium text-gray-600">Description</Text>
                </View>
                <View className="w-[15%] px-4 py-3">
                  <Text className="font-medium text-gray-600">Image</Text>
                </View>
                <View className="w-[15%] px-4 py-3">
                  <Text className="font-medium text-gray-600">Actions</Text>
                </View>
              </View>

              {/* Table Body */}
              {currentPageData.map((country: CountryData) => (
                <View
                  key={country._id}
                  className="flex-row border-b border-gray-100"
                >
                  <View className="w-[10%] px-4 py-3">
                    <Text className="font-medium">{country.title}</Text>
                  </View>
                  <View className="w-[60%] px-4 py-3">
                    <Text numberOfLines={2} className="text-gray-600">
                      {country.description}
                    </Text>
                  </View>
                  <View className="w-[15%] px-4 py-3">
                    {country.imageUrl ? (
                      <Image
                        source={{ uri: country.imageUrl }}
                        className="w-12 h-12 rounded-md"
                      />
                    ) : (
                      <Text className="text-gray-400">No image</Text>
                    )}
                  </View>
                  <View className="w-[15%] px-4 py-3 flex-row space-x-4">
                    <Link
                      href={`/dashboard/country-data/update/${country._id}`}
                      asChild
                    >
                      <TouchableOpacity>
                        <Text className="text-blue-500">Edit</Text>
                      </TouchableOpacity>
                    </Link>
                    <TouchableOpacity  className="ml-4" onPress={() => confirmDelete(country._id || "")}>
                      <Text className="text-red-500">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Pagination */}
          <View className="flex-row justify-center items-center mt-4 space-x-2">
            <TouchableOpacity
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded mr-2 ${
                currentPage === 1 ? "bg-gray-200" : "bg-[#FF1A5A]"
              }`}
            >
              <Text
                className={`font-medium ${
                  currentPage === 1 ? "text-gray-500" : "text-white"
                }`}
              >
                Prev
              </Text>
            </TouchableOpacity>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <TouchableOpacity
                  key={page}
                  onPress={() => handlePageChange(page)}
                  className={`px-4 py-2 mr-2 rounded ${
                    currentPage === page ? "bg-[#FF1A5A]" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      currentPage === page ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className={`px-4 py-2 ml-2 rounded ${
                currentPage === totalPages || isFetching
                  ? "bg-gray-200"
                  : "bg-[#FF1A5A]"
              }`}
            >
              <Text
                className={`font-medium ${
                  currentPage === totalPages || isFetching
                    ? "text-gray-500"
                    : "text-white"
                }`}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-600">
            No countries found. Create your first country.
          </Text>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4 text-center">
              Confirm Deletion
            </Text>
            <Text className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this country? This action cannot be
              undone.
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="px-6 py-2 bg-gray-200 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-6 py-2 bg-red-500 rounded-lg"
                onPress={handleDelete}
              >
                <Text className="font-medium text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CountryServices;