import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useServicePackages } from "@/hooks/useServicePackages";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

const ExclusiveOffer = () => {
  // Calculate screen width to set card width dynamically
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 32 - 8) / 2; // Accounting for padding and gap
  const { getAllServices } = useServicePackages();
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
    queryKey: ["exclusive-offer", "services"],
    queryFn: ({ pageParam }) => getAllServices(pageParam, dataLimit),
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
          <Text className='text-gray-500'>No More Offer Data Available.</Text>
        </View>
      );
    }

    return null;
  };

  // Render individual package card
  const renderPackageCard = ({ item }: { item: ServiceData }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/exclusive-offer/details/[id]",
          params: { id: item?._id },
        });
      }}
      className='rounded-xl overflow-hidden mb-4 mx-1'
      activeOpacity={0.8}
      style={{ width: cardWidth }}>
      {/* Image */}
      <Image
        source={
          typeof item?.media_urls[0] === "string"
            ? { uri: item.media_urls[0] }
            : { uri: "https//:placeimg.com/640/480/any?r=0.888" }
        }
        className='w-full h-60'
        resizeMode='cover'
      />

      <View className='absolute top-2 left-2 px-2 py-1 bg-yellow-400 rounded-lg'>
        <Text className='text-xs font-bold text-gray-800'>
          {item?.category}
        </Text>
      </View>
      {/* Duration Tag */}
      <View className='absolute top-2 right-2 px-2 py-1 bg-yellow-400 rounded-lg'>
        <Text className='text-xs font-bold text-gray-800'>
          {item?.duration_days} days
        </Text>
      </View>

      {/* Dark overlay for text visibility */}
      <View className='absolute bottom-0 left-0 right-0 h-24 bg-black opacity-50' />

      {/* Content */}
      <View className='absolute bottom-0 left-0 right-0 p-2'>
        <Text className='text-sm font-bold text-amber-400'>
          Start Price {item?.price_basic}
        </Text>
        <Text className='text-sm font-bold text-white mt-0.5'>
          {item?.title}
        </Text>
        <View className='flex-row items-center mt-0.5'>
          <Ionicons name='location-outline' size={14} color='#fff' />
          <Text className='text-sm text-white mx-1' numberOfLines={2}>
            {item?.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const packagesData =
    data?.pages.flatMap((page: { data: ServiceData[] }) => page.data) || [];

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
          Explore All Our Exclusive Offer
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

export default ExclusiveOffer;
