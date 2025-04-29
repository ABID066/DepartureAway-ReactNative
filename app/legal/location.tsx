import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LocationPermissionScreen = () => {
  const router = useRouter();

  const handleAllowLocation = () => {
    // Request location permission logic would go here
    // After permission is granted, navigate to the next screen
    router.push('/home'); // Change this to the appropriate route
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button and title */}
      <View className="p-6 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold ml-4">Location</Text>
      </View>
      
      <View className="flex-1 justify-between px-6">
        <View className="items-center">
          {/* Illustration */}
          <Image 
            source={require('@/assets/images/amico1.png')} 
            className="w-64 h-64 mt-8"
            // If you don't have this image, you can use a placeholder or create one
            // The fallback below ensures the component won't crash if image is missing
            onError={(e) => console.log('Image could not be loaded, using fallback')}
          />
          
          {/* Text content */}
          <View className="items-center mt-10">
            <Text className="text-2xl font-bold text-center mb-3">
              Allow your Location
            </Text>
            <Text className="text-lg text-center text-gray-800">
              We will need your location to give you better exprience.
            </Text>
          </View>
        </View>
        
        {/* Button at bottom of screen */}
        <TouchableOpacity 
          className="bg-rose-500 py-4 rounded-full mb-10"
          onPress={handleAllowLocation}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Use Current Location
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationPermissionScreen;