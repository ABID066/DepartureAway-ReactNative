import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { getAllServices } from "@/services/packagesServices";
import { useInfiniteQuery } from "@tanstack/react-query";

const AllServices = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
    queryKey: ["travelPackages", "services"],
    queryFn: ({ pageParam = 1 }) => getAllServices(pageParam, itemsPerPage),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });

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

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    if (newPage > (data?.pages.length || 0)) {
      await fetchNextPage();
    }
  };

  const currentPageData = data?.pages[currentPage - 1]?.data || [];
  const totalItems = data?.pages[0]?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <View className='flex-1 bg-white p-4'>
      <View className='flex-row justify-between items-center my-6'>
        <Text className='text-2xl font-bold'>All Services</Text>
        <Link href='/dashboard/services/add-new-service' asChild>
          <TouchableOpacity className='bg-[#FF1A5A] px-4 py-2 rounded-lg'>
            <Text className='text-white font-medium'>+ Create New Service</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView
        className='flex max-h-auto mt-16'
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View className='min-w-[1000px]'>
          {/* Table Header */}
          <View className='flex-row bg-gray-50 border border-gray-200 rounded-t-md gap-1'>
            <View className='w-[30%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>TITLE</Text>
            </View>
            <View className='w-[12%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                CATEGORY
              </Text>
            </View>
            <View className='w-[12%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                BASIC PRICE
              </Text>
            </View>
            <View className='w-[15%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                STANDARD PRICE
              </Text>
            </View>
            <View className='w-[15%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                PREMIUM PRICE
              </Text>
            </View>
            <View className='w-[10%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                ACTIONS
              </Text>
            </View>
          </View>

          {/* Table Body */}
          {status === "success" ? (
            <ScrollView>
              {currentPageData?.map((service: ServiceData, index: number) => (
                <View
                  key={index + 1}
                  className='flex-row border border-t-0 border-gray-100 gap-1'>
                  <View className='w-[30%] px-4 py-3'>
                    <Text
                      numberOfLines={1}
                      className='font-medium text-base overflow-hidden'>
                      {service.title}
                    </Text>
                  </View>
                  <View className='w-[12%] px-4 py-3'>
                    <Text className='text-gray-600 text-base'>
                      {service.category}
                    </Text>
                  </View>
                  <View className='w-[12%] px-4 py-3'>
                    <Text className='text-gray-600 text-base'>
                      ${service.price_basic}
                    </Text>
                  </View>
                  <View className='w-[15%] px-4 py-3'>
                    <Text className='text-gray-600 text-base'>
                      ${service.price_standard}
                    </Text>
                  </View>
                  <View className='w-[15%] px-4 py-3'>
                    <Text className='text-gray-600 text-base'>
                      ${service.price_premium}
                    </Text>
                  </View>
                  <View className='w-[10%] px-4 py-3 flex-row gap-4'>
                    <TouchableOpacity>
                      <Text className='text-blue-500 text-base'>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className='text-red-500 text-base'>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded ${
            currentPage === 1 ? "bg-gray-200" : "bg-[#FF1A5A]"
          }`}>
          <Text
            className={`font-bold ${
              currentPage === 1 ? "text-gray-500" : "text-white"
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
          disabled={!hasNextPage && currentPage === totalPages}
          className={`px-3 py-2 rounded ${
            !hasNextPage && currentPage === totalPages
              ? "bg-gray-200"
              : "bg-[#FF1A5A]"
          }`}>
          <Text
            className={`font-bold ${
              !hasNextPage && currentPage === totalPages
                ? "text-gray-500"
                : "text-white"
            }`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllServices;
