import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Guides data
const guides = [
  {
    id: 1,
    name: "Arshan Sayed",
    rating: 4.9,
    reviews: 306,
    price: "$20 per hours",
    image: require("@/assets/images/profile.jpg"),
  },
  {
    id: 2,
    name: "Arshan Sayed",
    rating: 4.9,
    reviews: 306,
    price: "$20 per hours",
    image: require("@/assets/images/profile.jpg"),
  },
  {
    id: 3,
    name: "Arshan Sayed",
    rating: 4.9,
    reviews: 306,
    price: "$20 per hours",
    image: require("@/assets/images/profile.jpg"),
  },
  {
    id: 4,
    name: "Arshan Sayed",
    rating: 4.9,
    reviews: 306,
    price: "$20 per hours",
    image: require("@/assets/images/profile.jpg"),
  },
];

interface GuiderProps {
  guiders: any[];
}

// Guides Section Component
const GuidesSection = ({ guiders }: GuiderProps) => {
  return (
    <View className='mt-5 px-4'>
      <View className='flex-row justify-between items-center mb-4'>
        <Text className='text-2xl font-bold text-gray-800'>
          Top Rated Guider
        </Text>
        <TouchableOpacity onPress={() => router.push("/guider")}>
          <Text className='text-md border-[#F13F5F] border rounded-full px-4 py-1 text-[#F13F5F] font-semibold'>
            Explore
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='pr-4'>
        {guiders?.map((guider) => (
          <TouchableOpacity
            key={guider._id}
            className='w-50 border border-gray-100 mr-2 bg-white rounded-lg overflow-hidden shadow-sm'>
            <View className='p-3'>
              <View className='flex-row items-center'>
                <Image
                  source={
                    guider?.imageUrl
                      ? { uri: guider.imageUrl[0] }
                      : require("@/assets/images/profile.jpg")
                  }
                  className='w-10 h-10 rounded-full'
                />
                <View className='ml-1 bg-rose-50 py-1 px-2 rounded-full'>
                  <Text className='text-[#F13F5F] font-bold text-sm'>
                    {guider?.hourlyRate}
                  </Text>
                </View>
              </View>
              <View className='ml-2 mt-2'>
                <Text className='text-sm font-bold text-gray-800'>
                  {guider?.name}
                </Text>
                <View className='flex-row items-center'>
                  <Ionicons name='star' size={14} color='#FFD700' />
                  <Text className='text-xs text-gray-500 ml-1'>
                    {guider?.rating}/5 ({guider?.totalReviews} Reviews)
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GuidesSection;
