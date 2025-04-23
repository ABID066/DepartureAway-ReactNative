import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Router for navigation

const WalkthroughScreen3 = () => {
  const router = useRouter();

  return (
    <View className='flex-1 justify-center items-center bg-yellow-400'>
      {/* Walkthrough Image 1 */}
      
      
      {/* Text Description */}
      <Text className='text-4xl font-bold text-gray-800 mt-4 text-center'>
      Your Ultimate Travel Companion Awaits. Let's Explore Together!
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        className='bg-rose-600 p-3 px-25 rounded-lg mt-6'
        onPress={() => router.push('/')} // Navigate to next walkthrough
      >
        <Text className='text-white text-lg'>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalkthroughScreen3;
