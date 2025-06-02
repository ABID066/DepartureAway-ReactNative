import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useServicePackages } from "@/hooks/useServicePackages";

// Package categories data
const packageCategories = [
  { label: "Traveler Choose", value: "Traveler Choose" },
  { label: "Hajj", value: "hajj" },
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Alpine wanders", value: "alpine" },
  { label: "Adventure Tours", value: "adventure" },
  { label: "Cultural Tours", value: "cultural" },
  { label: "Beach & Resort", value: "beach" },
  { label: "City Tours", value: "city" },
  { label: "Nature & Wildlife", value: "nature" },
  { label: "Luxury Travel", value: "luxury" },
  { label: "Budget Travel", value: "budget" },
  { label: "Family Tours", value: "family" },
  { label: "Honeymoon Packages", value: "honeymoon" },
  { label: "Pilgrimage Tours", value: "pilgrimage" },
  { label: "Resort Stay", value: "resort" },
  { label: "Boat Trip", value: "boat-trip" },
  { label: "Mountains", value: "mountain" },
  { label: "Desert", value: "desert" },
];

// Interface for package data
interface PackageItem {
  id: number;
  title: string;
  location: string;
  price1: string;
  duration?: string;
  imageUrl: string[];
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
  const { getTravelPackages } = useServicePackages();
  const [filterType, setFilterType] = useState("");
  useEffect(() => {
    if (activePackageTab === "Traveler Choose") {
      setFilterType("");
    } else {
      setFilterType(activePackageTab);
    }
  }, [activePackageTab]);

  const dataLimit = 10;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["travelPackages", filterType, "services"],
    queryFn: ({ pageParam }) =>
      getTravelPackages(pageParam, dataLimit, filterType),
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
          <Text className='text-gray-500'>No Travel Packages Available.</Text>
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
        source={
          typeof item?.imageUrl[0] === "string"
            ? { uri: item.imageUrl[0] }
            : { uri: "https//:placeimg.com/640/480/any?r=0.888" }
        }
        className='w-full h-60'
        resizeMode='cover'
      />

      {/* Duration Tag */}
      <View className='absolute top-2 right-2 px-2 py-1 bg-yellow-400 rounded-lg'>
        <Text className='text-xs font-bold text-gray-800'>
          {item?.duration}
        </Text>
      </View>

      {/* Dark overlay for text visibility */}
      <View className='absolute bottom-0 left-0 right-0 h-24 bg-black opacity-50' />

      {/* Content */}
      <View className='absolute bottom-0 left-0 right-0 p-2'>
        <Text className='text-sm font-bold text-amber-400'>
          Start Price {item?.price1}
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
    data?.pages.flatMap((page: { data: PackageItem[] }) => page.data) || [];
  return (
    <View className='mt-5 px-4 mb-20'>
      <Text className='text-xl font-bold text-gray-800'>Travel package</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='py-4'>
        {data &&
          packageCategories.map((category, i) => (
            <TouchableOpacity
              key={i + 0}
              className={`mr-4 py-1 ${
                activePackageTab === category.value
                  ? "bg-[#F13F5F] px-4 rounded-full"
                  : ""
              }`}
              onPress={() => setActivePackageTab(category.value)}>
              <Text
                className={`text-base ${
                  activePackageTab === category.value
                    ? "text-white font-semibold"
                    : "text-gray-500"
                }`}>
                {category?.label}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

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
