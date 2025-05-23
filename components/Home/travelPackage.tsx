import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getTravelPackages } from "@/services/packagesServices";
import { useInfiniteQuery } from "@tanstack/react-query";

// Package categories data
const packageCategories = ["Traveler Choose", "Hajj", "Honeymoon", "Alpine"];

// Interface for package data
interface PackageItem {
  id: number;
  title: string;
  location: string;
  price_basic: string;
  duration_days: string;
  image?: any;
  media_urls?: string | string[];
}


// Travel Packages Section Component
const TravelPackagesSection = ({
  activePackageTab,
  setActivePackageTab,
}: {
  activePackageTab: string;
  setActivePackageTab: (tab: string) => void;
}) => {
  // Calculate screen width to set card width dynamically
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 32 - 8) / 2; // Accounting for padding and gap

  // Get the appropriate data based on active tab
  const getPackagesData = () => {
    switch (activePackageTab) {
      case "Traveler Choose":
        // return travelerChoosePackages;
      case "Hajj":
        // return hajjPackages;
      case "Honeymoon":
        // return honeymoonPackages;
      case "Alpine":
        // return alpinePackages;
      default:
        // return travelerChoosePackages;
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["travelPackages", activePackageTab],
    queryFn: ({ pageParam }) => getTravelPackages(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Calculate if there are more pages based on meta data
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
    console.log("from line 89",error);
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
        <View className="py-4 justify-center items-center">
          <ActivityIndicator size="small" color="#E11D48" />
        </View>
      );
    }

    if (!hasNextPage) {
      return (
        <View className="py-4 justify-center items-center">
          <Text className="text-gray-500">No More Travel Packages.</Text>
        </View>
      );
    }

    return null;
  };

  // Render individual package card
  const renderPackageCard = ({ item }: { item: PackageItem }) => (
    <TouchableOpacity
      className='rounded-xl overflow-hidden mb-4 mx-1'
      activeOpacity={0.8}
      style={{ width: cardWidth }}>
      {/* Image */}
      <Image
        source={typeof item?.media_urls === 'string' && item?.media_urls ? { uri: item.media_urls } : item?.image}
        className='w-full h-60'
        resizeMode='cover'
      />

      {/* Duration Tag */}
      <View className='absolute top-2 right-2 px-2 py-1 bg-yellow-400 rounded-lg'>
        <Text className='text-xs font-bold text-gray-800'>
          {item?.duration_days}
        </Text>
      </View>

      {/* Dark overlay for text visibility */}
      <View className='absolute bottom-0 left-0 right-0 h-24 bg-black opacity-50' />

      {/* Content */}
      <View className='absolute bottom-0 left-0 right-0 p-2'>
        <Text className='text-sm font-bold text-amber-400'>Start Price {item?.price_basic}</Text>
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

  const packagesData = data?.pages.flatMap((page: { data: PackageItem[] }) => page.data) || [];
  return (
    <View className='mt-5 px-4 mb-20'>
      <Text className='text-xl font-bold text-gray-800'>Travel package</Text>

      <View className='flex-row my-4'>
        {data &&
          packageCategories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-4 py-1 ${
                activePackageTab === category
                  ? "bg-rose-500 px-4 rounded-full"
                  : ""
              }`}
              onPress={() => setActivePackageTab(category)}>
              <Text
                className={`text-base ${
                  activePackageTab === category
                    ? "text-white font-semibold"
                    : "text-gray-500"
                }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
      </View>

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
      />
    </View>
  );
};

export default TravelPackagesSection;