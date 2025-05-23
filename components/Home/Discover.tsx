import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Type definitions for better type safety
interface PlaceItem {
  id: number;
  name: string;
  location: string;
  price: string;
  image: any;
  favorite: boolean;
}

interface CountryItem {
  id: number;
  name: string;
  flag: any;
  description: string;
}

// Popular Places data (For "For you" tab)
const popularPlaces: PlaceItem[] = [
  {
    id: 1,
    name: "Grand Canyon",
    location: "AV Damero 770, Holles Q.A, Mexico",
    price: "$1200",
    image: require("@/assets/images/HomePic2.jpg"),
    favorite: true,
  },
  {
    id: 2,
    name: "Antolopa Canyon",
    location: "AV Damero 770, Holles Q.A, Mexico",
    price: "$1200",
    image: require("@/assets/images/HomePic2.jpg"),
    favorite: true,
  },
  {
    id: 3,
    name: "Mountain View",
    location: "AV Damero 770, Holles Q.A, Mexico",
    price: "$1500",
    image: require("@/assets/images/HomePic2.jpg"),
    favorite: false,
  },
  {
    id: 4,
    name: "Grand Canyon",
    location: "AV Damero 770, Holles Q.A, Mexico",
    price: "$1200",
    image: require("@/assets/images/HomePic2.jpg"),
    favorite: true,
  },
];

// Popular Places data specifically for "Popular" tab
const popularTabPlaces: PlaceItem[] = [
  {
    id: 1,
    name: "Maldives Resort",
    location: "South Malé Atoll, Maldives",
    price: "$2500",
    image: require("@/assets/images/HomePic1.jpg"),
    favorite: true,
  },
  {
    id: 2,
    name: "Bali Beaches",
    location: "Kuta, Bali, Indonesia",
    price: "$1800",
    image: require("@/assets/images/HomePic1.jpg"),
    favorite: true,
  },
  {
    id: 3,
    name: "Santorini Views",
    location: "Oia, Santorini, Greece",
    price: "$2200",
    image: require("@/assets/images/HomePic1.jpg"),
    favorite: true,
  },
  {
    id: 4,
    name: "Paris Getaway",
    location: "Champs-Élysées, Paris, France",
    price: "$1900",
    image: require("@/assets/images/HomePic1.jpg"),
    favorite: false,
  },
];

// Country data for "Country" tab
const countryData: CountryItem[] = [
  {
    id: 1,
    name: "Italy",
    flag: require("@/assets/images/italy.png"),
    description:
      "Known for its innovative food scene (pizza, Renaissance art, and architecture), Italy remains a consistent bucket list destination. Views of Venice in the cobblestone in Rome, Italy offers a beautiful blend of art, history, and gastronomy.",
  },
  {
    id: 2,
    name: "Japan",
    flag: require("@/assets/images/jp.png"),
    description:
      "A beautiful blend of ancient tradition and cutting-edge modernity, Japan offers travelers the chance to experience beautiful temples and diverse techniques like those found in Kyoto. The spring cherry blossoms are a particularly popular time to visit.",
  },
  {
    id: 3,
    name: "France",
    flag: require("@/assets/images/france.png"),
    description:
      "From the iconic Eiffel Tower to the vineyards of Bordeaux, France captivates visitors with its romantic ambiance, culinary excellence, and rich cultural heritage that spans centuries of European history.",
  },
  {
    id: 4,
    name: "Australia",
    flag: require("@/assets/images/as.png"),
    description:
      "With its stunning coastlines, unique wildlife, and vibrant cities, Australia offers an adventure-filled experience from the Great Barrier Reef to the rugged Outback landscapes and cosmopolitan urban centers.",
  },
];

// Discover Places Section Component
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
  const tabs = ["For you", "Popular", "Country"];

  // Determine which content to show based on active tab
  const getDataAndRender = () => {
    if (activeTab === "For you") {
      return {
        data: popularPlaces,
        renderItem: (item: PlaceItem, index: number) =>
          renderPlaceCard(item, index),
      };
    } else if (activeTab === "Popular") {
      return {
        data: popularTabPlaces,
        renderItem: (item: PlaceItem, index: number) =>
          renderPlaceCard(item, index),
      };
    } else {
      return {
        data: countryData,
        renderItem: (item: CountryItem, index: number) =>
          renderCountryCard(item, index),
      };
    }
  };

  // Get the current content configuration
  const { data, renderItem } = getDataAndRender();

  // Render image-based places card (For "For you" and "Popular" tabs)
  const renderPlaceCard = (item: PlaceItem, index: number) => (
    <TouchableOpacity
      key={`place-${item.id}`}
      className='w-48 h-72 mr-5 rounded-xl overflow-hidden relative'>
      {/* Image */}
      <Image source={item.image} className='w-full h-full' resizeMode='cover' />

      {/* Heart Icon */}
      <TouchableOpacity className='absolute top-2 right-2 w-8 h-8 rounded-full bg-black bg-opacity-30 justify-center items-center'>
        <Ionicons
          name={item.favorite ? "heart" : "heart-outline"}
          size={20}
          color={item.favorite ? "#F13F5F" : "#fff"}
        />
      </TouchableOpacity>

      {/* Price Tag */}
      <View className='absolute top-2 left-2 px-2 py-1 bg-rose-500 rounded-xl'>
        <Text className='text-white font-bold text-xs'>{item.price}</Text>
      </View>

      {/* Dark gradient overlay for text visibility */}
      <View className='absolute bottom-0 left-0 right-0 h-16 bg-black opacity-50' />

      {/* Content */}
      <View className='absolute bottom-0 left-0 right-0 p-2'>
        <Text className='text-base font-bold text-white'>{item.name}</Text>
        <View className='flex-row items-center'>
          <Ionicons name='location-outline' size={12} color='#fff' />
          <Text className='text-xs text-white ml-1' numberOfLines={2}>
            {item.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render country card (For "Country" tab)
  const renderCountryCard = (item: CountryItem, index: number) => (
    <TouchableOpacity
      key={`country-${item.id}`}
      className='w-64 mb-2 mr-5 bg-white rounded-xl overflow-hidden shadow p-4'>
      <View className='flex-row items-center mb-2'>
        <Image
          source={item.flag}
          className='w-8 h-6 rounded-sm'
          resizeMode='cover'
        />
        <Text className='text-lg font-bold text-gray-800 ml-2'>
          {item.name}
        </Text>
      </View>
      <Text className='text-sm text-gray-600' numberOfLines={9}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className='mt-5 px-4'>
      <View className='flex-row justify-between items-center mb-4'>
        <Text className='text-xl font-bold text-gray-800'>Discover Place</Text>
        <TouchableOpacity>
          <Text className='text-md border-rose-500 border rounded-2xl px-2 py-1 text-rose-500 font-semibold'>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row mb-4'>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`mr-5 py-1 ${
              activeTab === tab ? "bg-rose-500 px-4 rounded-full" : ""
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
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const cardWidth = activeTab === "Country" ? 270 : 200; // Different card width for Country tab
          const index = Math.round(offsetX / cardWidth);
          if (index !== currentIndex && index >= 0 && index < data.length) {
            setCurrentIndex(index);
          }
        }}
        scrollEventThrottle={16}>
        {data.map((item, index) => renderItem(item as any, index))}
      </ScrollView>

      <View className='flex-row justify-center mt-4'>
        {data.map((_, index) => (
          <View
            key={`dot-${index}`}
            className={`h-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-rose-500 w-5" : "bg-gray-200 w-2"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default DiscoverPlacesSection;
