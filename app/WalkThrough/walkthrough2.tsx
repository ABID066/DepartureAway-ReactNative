import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const WalkthroughScreen2 = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 overflow-hidden">
      {/* Full screen background image */}
      <View className="absolute inset-0">
        <Image
          source={require('@/assets/images/WalkthroughScreen2.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Content container - takes full height to push yellow section to bottom */}
      <View className="flex-1 justify-end">
        {/* Bottom yellow section - positioned on top of the image */}
        <View className="bg-yellow-300 pt-6 pb-8 px-6 rounded-t-3xl">
          {/* Text Description */}
          <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Dream, Discover, and Dive Into the World's Wonders With Us.
          </Text>

          {/* Progress Dots */}
          <View className="flex-row justify-center items-center mb-6">
            <View className="h-2 w-2 rounded-full bg-rose-400 mx-1"></View>
            <View className="h-2 w-6 rounded-full bg-rose-500 mx-1"></View>
            <View className="h-2 w-2 rounded-full bg-rose-400 mx-1"></View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            className="bg-rose-500 py-4 rounded-full"
            onPress={() => router.push('/walkThrough/walkthrough3')}
          >
            <Text className="text-white text-center font-semibold text-lg">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalkthroughScreen2;
