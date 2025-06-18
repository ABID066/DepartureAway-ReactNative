import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useServicePackages } from "@/hooks/useServicePackages";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

interface TravelServiceData {
  _id: string;
  title: string;
  location: string;
  price1: string;
  imageUrl: string[];
  isPopular: boolean;
}

interface CountryData {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const DiscoverPlacesSection = ({
  activeTab,
  setActiveTab,
  currentIndex,
  setCurrentIndex,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const router = useRouter();
  const tabs = ["For you", "Popular", "Country"];
  const { getCountryData, getTravelPackages } = useServicePackages();
  const queryClient = useQueryClient();
  const dataLimit = 10;

  // Reset scroll position and data when tab changes
  useEffect(() => {
    setCurrentIndex(0);
    // Reset queries when tab changes to ensure fresh data
    queryClient.resetQueries({
      queryKey: ["travelPackages", "services", activeTab],
      exact: true,
    });
    queryClient.resetQueries({
      queryKey: ["popularPackages", "services", activeTab],
      exact: true,
    });
    queryClient.resetQueries({
      queryKey: ["countryData", "services", activeTab],
      exact: true,
    });
  }, [activeTab]);

  // Query for country data
  const {
    data: fetchCountryData,
    fetchNextPage: fetchNextCountryPage,
    hasNextPage: hasNextCountryPage,
    isFetchingNextPage: isFetchingNextCountryPage,
    status: countryStatus,
    error: countryError,
    refetch: refetchCountry,
  } = useInfiniteQuery({
    queryKey: ["countryData", "services", activeTab],
    queryFn: ({ pageParam = 1 }) => getCountryData(pageParam, dataLimit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : null;
    },
  });

  // Query for regular travel packages (For you tab)
  const {
    data: tourData,
    fetchNextPage: fetchNextTourPage,
    hasNextPage: hasNextTourPage,
    isFetchingNextPage: isFetchingNextTourPage,
    status: tourStatus,
    error: tourError,
    refetch: refetchTours,
  } = useInfiniteQuery({
    queryKey: ["travelPackages", "services", activeTab],
    queryFn: ({ pageParam = 1 }) => getTravelPackages(pageParam, dataLimit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : null;
    },
  });

  // Query for popular packages (Popular tab)
  const {
    data: popularData,
    fetchNextPage: fetchNextPopularPage,
    hasNextPage: hasNextPopularPage,
    isFetchingNextPage: isFetchingNextPopularPage,
    status: popularStatus,
    error: popularError,
    refetch: refetchPopular,
  } = useInfiniteQuery({
    queryKey: ["popularPackages", "services", activeTab],
    queryFn: ({ pageParam = 2 }) => getTravelPackages(pageParam, dataLimit),
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : null;
    },
  });

  // Flatten the data
  const countryData =
    fetchCountryData?.pages.flatMap((page) => page.data).reverse() || [];
  const forYouPlaces = tourData?.pages.flatMap((page) => page.data) || [];
  const popularPlaces = popularData?.pages.flatMap((page) => page.data) || [];

  // Handle scroll to load more
  const handleScroll = useCallback(
    (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const cardWidth = activeTab === "Country" ? 270 : 200;
      const index = Math.round(offsetX / cardWidth);

      if (index !== currentIndex && index >= 0) {
        setCurrentIndex(index);

        // Load more when reaching near the end
        if (
          index >=
          (activeTab === "For you"
            ? forYouPlaces.length - 3 // Load earlier to prevent blank space
            : activeTab === "Popular"
            ? popularPlaces.length - 3
            : countryData.length - 3)
        ) {
          if (
            activeTab === "For you" &&
            hasNextTourPage &&
            !isFetchingNextTourPage
          ) {
            fetchNextTourPage();
          } else if (
            activeTab === "Popular" &&
            hasNextPopularPage &&
            !isFetchingNextPopularPage
          ) {
            fetchNextPopularPage();
          } else if (
            activeTab === "Country" &&
            hasNextCountryPage &&
            !isFetchingNextCountryPage
          ) {
            fetchNextCountryPage();
          }
        }
      }
    },
    [
      activeTab,
      currentIndex,
      forYouPlaces.length,
      popularPlaces.length,
      countryData.length,
      hasNextTourPage,
      isFetchingNextTourPage,
      hasNextPopularPage,
      isFetchingNextPopularPage,
      hasNextCountryPage,
      isFetchingNextCountryPage,
    ]
  );

  // Determine loading and error states based on active tab
  const isLoading =
    activeTab === "Country"
      ? countryStatus === "pending"
      : activeTab === "Popular"
      ? popularStatus === "pending"
      : tourStatus === "pending";

  const error =
    activeTab === "Country"
      ? countryError
      : activeTab === "Popular"
      ? popularError
      : tourError;

  if (isLoading && currentIndex === 0) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#E11D48' />
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-red-500'>
          Error loading {activeTab.toLowerCase()} data
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (activeTab === "Country") refetchCountry();
            else if (activeTab === "Popular") refetchPopular();
            else refetchTours();
          }}
          className='mt-2 px-4 py-2 bg-[#F13F5F] rounded-lg'>
          <Text className='text-white'>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Determine which content to show based on active tab
  const getDataAndRender = () => {
    if (activeTab === "For you") {
      return {
        data: forYouPlaces,
        renderItem: (item: TravelServiceData, index: number) =>
          renderPlaceCard(item, index),
      };
    } else if (activeTab === "Popular") {
      return {
        data: popularPlaces,
        renderItem: (item: TravelServiceData, index: number) =>
          renderPlaceCard(item, index),
      };
    } else {
      return {
        data: countryData,
        renderItem: (item: CountryData, index: number) =>
          renderCountryCard(item, index),
      };
    }
  };

  // Get the current content configuration
  const { data, renderItem } = getDataAndRender();

  // Render image-based places card
  const renderPlaceCard = (item: TravelServiceData, index: number) => (
    <TouchableOpacity
      key={`place-${item?._id}-${index}`}
      className='w-48 h-72 mr-5 rounded-xl overflow-hidden relative'
      onPress={() =>
        router.push({
          pathname: "/tour/details/[id]",
          params: { id: item?._id, img: item.imageUrl[0] },
        })
      }>
      <Image
        source={{ uri: item.imageUrl[0] }}
        className='w-full h-full'
        resizeMode='cover'
      />
      <TouchableOpacity className='absolute top-2 right-2 w-8 h-8 rounded-full bg-black bg-opacity-30 justify-center items-center'>
        <Ionicons
          name={item.isPopular ? "heart" : "heart-outline"}
          size={20}
          color={item.isPopular ? "#F13F5F" : "#fff"}
        />
      </TouchableOpacity>
      <View className='absolute top-2 left-2 px-2 py-1 bg-[#F13F5F] rounded-xl'>
        <Text className='text-white font-bold text-xs'>$ {item.price1}</Text>
      </View>
      <View className='absolute bottom-0 left-0 right-0 h-16 bg-black opacity-50' />
      <View className='absolute bottom-0 left-0 right-0 p-2'>
        <Text className='text-base font-bold text-white'>{item.title}</Text>
        <View className='flex-row items-center'>
          <Ionicons name='location-outline' size={12} color='#fff' />
          <Text className='text-xs text-white ml-1' numberOfLines={2}>
            {item.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render country card
  const renderCountryCard = (item: CountryData, index: number) => (
    <TouchableOpacity
      key={`country-${item._id}-${index}`}
      className='w-64 mb-2 mr-5 bg-white rounded-xl overflow-hidden shadow p-4'>
      <View className='flex-row items-center mb-2'>
        <Image
          source={{ uri: item.imageUrl }}
          className='w-8 h-6 rounded-sm'
          resizeMode='cover'
        />
        <Text className='text-lg font-bold text-gray-800 ml-2'>
          {item?.title}
        </Text>
      </View>
      <Text className='text-sm text-gray-600' numberOfLines={9}>
        {item?.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className='mt-5 px-4'>
      <View className='flex-row justify-between items-center mb-4'>
        <Text className='text-xl font-bold text-gray-800'>Discover Place</Text>
        <TouchableOpacity>
          <Text className='text-md border-[#F13F5F] border rounded-2xl px-2 py-1 text-[#F13F5F] font-semibold'>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row mb-4'>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`mr-5 py-1 ${
              activeTab === tab ? "bg-[#F13F5F] px-4 rounded-full" : ""
            }`}
            onPress={() => setActiveTab(tab)}>
            <Text
              className={`text-base ${
                activeTab === tab ? "text-white font-semibold" : "text-gray-500"
              }`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='pr-4'
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentOffset={{ x: 0, y: 0 }} // Ensure starts at beginning
      >
        {data.slice(0, 10).map((item, index) => renderItem(item as any, index))}
        {(isFetchingNextTourPage ||
          isFetchingNextPopularPage ||
          isFetchingNextCountryPage) && (
          <View className='w-48 h-72 mr-5 justify-center items-center'>
            <ActivityIndicator size='small' color='#E11D48' />
          </View>
        )}
      </ScrollView>

      <View className='flex-row justify-center mt-4'>
        {data.slice(0, 10).map((_, index) => (
          <View
            key={`dot-${index}`}
            className={`h-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-[#F13F5F] w-5" : "bg-gray-200 w-2"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default DiscoverPlacesSection;
