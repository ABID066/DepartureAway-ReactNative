import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useServicePackages } from "@/hooks/useServicePackages";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

// Travel Packages Section Component
const GuiderServices = () => {
  const { getGuiderServices } = useServicePackages();
  const router = useRouter();
  const dataLimit = 10;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["guider", "services", "guiders"],
    queryFn: ({ pageParam }) => getGuiderServices(pageParam, dataLimit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);

      // Return next page number if there are more pages, null if we're at the end
      return page < totalPages ? page + 1 : null;
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
    console.log(error);
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-red-500'>Error loading packages</Text>
      </View>
    );
  }

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View className='py-4 justify-center items-center'>
          <ActivityIndicator size='small' color='#E11D48' />
        </View>
      );
    }

    if (!hasNextPage) {
      return (
        <View className='py-6 justify-center items-center'>
          <Text className='text-gray-500'>No More Guider Data Available.</Text>
        </View>
      );
    }

    return null;
  };

  // Render individual package card
  const renderPackageCard = ({ item }: { item: GuiderServiceData }) => (
    <TouchableOpacity
      key={item._id}
      onPress={() =>
        router.push({
          pathname: "/guider/details/[id]",
          params: { guiderId: item?._id },
        })
      }
      className='border border-gray-100 bg-white rounded-lg overflow-hidden shadow-sm flex-1 mb-6 max-w-[48%]'>
      <View className='p-3'>
        <View className='flex-row items-center'>
          <Image
            source={
              item?.imageUrl
                ? { uri: item.imageUrl[0] }
                : require("@/assets/images/profile.jpg")
            }
            className='w-10 h-10 rounded-full'
          />
          <View className='ml-1 bg-rose-50 py-1 px-2 rounded-full'>
            <Text className='text-[#F13F5F] font-bold text-sm'>
              ${item?.hourlyRate}
            </Text>
          </View>
        </View>
        <View className='ml-2 mt-2'>
          <Text className='text-sm font-bold text-gray-800'>{item?.name}</Text>
          <View className='flex-row items-center'>
            <Ionicons name='star' size={14} color='#FFD700' />
            <Text className='text-xs text-gray-500 ml-1'>
              {item?.rating}/5 ({item?.totalReviews} Reviews)
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const packagesData =
    data?.pages.flatMap((page: { data: GuiderServiceData[] }) => page.data) ||
    [];
  return (
    <View>
      <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[180px] md:min-h-[200px]'>
        <TouchableOpacity
          className='absolute left-[5%] top-11'
          onPress={() => router.back()}>
          <Image source={icons?.arrowLeft} className='w-6 h-6' />
        </TouchableOpacity>

        <Image
          source={images?.logo}
          className='w-[40%] max-w-[162px] h-[46px] mt-3'
          accessibilityLabel='Departure Away logo, stylized pink and orange circle with text Departure Away'
          resizeMode='contain'
        />

        <Text className='text-2xl font-bold text-gray-800 my-4 text-center absolute bottom-0 '>
          Explore All Our Guider Services
        </Text>
      </View>
      <View className='py-6 px-4'>
        {/* Use FlatList instead of flex-wrap for more reliable grid layout */}
        <FlatList
          data={packagesData}
          renderItem={renderPackageCard}
          keyExtractor={(item, index) => (index + 1).toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          className='max-h-[85%]'
        />
      </View>
    </View>
  );
};

export default GuiderServices;
