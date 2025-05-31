import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Search Bar Component
const SearchBar = () => {
  return (
    <View className='flex-row px-4 my-4'>
      <View className='flex-1 h-12 border border-gray-100 shadow-white bg-white rounded justify-center'>
        <TextInput
          className='text-base px-4'
          placeholder='Search Your Service'
          placeholderTextColor='#888'
        />
      </View>
      <TouchableOpacity className='w-12 h-12 bg-[#F13F5F] rounded-lg justify-center items-center'>
        <Ionicons name='search' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
