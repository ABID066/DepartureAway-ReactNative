import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, type LinkProps } from "expo-router";

// Category data
const categories: {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  path?: LinkProps["href"];
}[] = [
  { id: 1, name: "Flight", icon: "airplane", path: "/flightTicket" },
  { id: 2, name: "Hotel", icon: "business", path: "/hotel" },
  { id: 3, name: "Tour", icon: "map" },
  { id: 4, name: "Car", icon: "car" },
  { id: 5, name: "Visa", icon: "card" },
  { id: 6, name: "Guider", icon: "people" },
  { id: 7, name: "Lost bag", icon: "briefcase" },
];

// Category Section Component
const CategorySection = () => {
  // Filter to show only the first 4 categories in the top row and next 3 in the bottom row
  const topCategories = categories.slice(0, 4);
  const bottomCategories = categories.slice(4, 7);

  return (
    <View className='px-4 -mt-6'>
      <View className='flex-row justify-around'>
        {topCategories.map((category) => (
          <Link href={category?.path || "/"} key={category.id} asChild>
            <TouchableOpacity className='bg-white rounded-xl shadow w-16 h-16 items-center justify-center mb-4'>
              <View className='items-center'>
                <Ionicons name={category.icon} size={24} color='#1A3F85' />
                <Text className='text-xs text-blue-900 mt-1'>
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <View className='flex-row justify-center'>
        {bottomCategories.map((category) => (
          <Link href={category?.path || "/"} key={category.id} asChild>
            <TouchableOpacity className='bg-white rounded-xl shadow w-16 h-16 items-center justify-center mx-4'>
              <View className='items-center'>
                <Ionicons name={category.icon} size={24} color='#1A3F85' />
                <Text className='text-xs text-blue-900 mt-1'>
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default CategorySection;
