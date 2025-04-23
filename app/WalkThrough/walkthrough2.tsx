import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Router for navigation

const WalkthroughScreen2 = () => {
  const router = useRouter();

  return (
    <View className='flex-1 justify-center items-center bg-yellow-400'>
      {/* Walkthrough Image 1 */}
      
      
      {/* Text Description */}
      <Text className='text-4xl font-bold text-gray-800 mt-4 text-center'>
      Dream, Discover, and Dive Into the World's Wonders With Us.
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        className='bg-rose-600 p-3 px-25 rounded-lg mt-6'
        onPress={() => router.push('/WalkThrough/walkthrough3')} // Navigate to next walkthrough
      >
        <Text className='text-white text-lg'>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalkthroughScreen2;
