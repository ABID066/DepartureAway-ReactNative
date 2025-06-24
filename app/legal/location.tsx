import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator, // Import Alert for better user feedback
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useAuthServicePackages } from "@/hooks/useAuthServicePackages";
import Toast from "react-native-toast-message";
import * as Location from "expo-location"; // Import Expo Location

interface UserUpdatePayload {
  location: string;
}

const LocationPermissionScreen = () => {
  const router = useRouter();
  const { updateUserProfile } = useAuthServicePackages();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false); // State to manage loading during profile update

  const { mutateAsync } = useMutation({
    mutationFn: async (userUpdateData: UserUpdatePayload) => {
      const signUpUserId = await AsyncStorage.getItem("signUpUserId"); // Await AsyncStorage.getItem
      if (!signUpUserId) {
        throw new Error("Current user ID is not available.");
      }
      const { data } = await updateUserProfile(signUpUserId, userUpdateData);
      return data;
    },
    onError: (err) => {
      console.error("Update failed:", err);
      let errorMessage = "Failed to update user profile.";
      Toast.show({
        type: "error",
        text1: "Update Failed!",
        text2: errorMessage,
      });
      setIsUpdatingProfile(false);
    },
    mutationKey: ["update-user", "users", "user"],
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Location Updated!",
        text2: "Your profile location has been updated successfully.",
      });
      router.push("/signIn");
      setIsUpdatingProfile(false);
      // After successful update, you might still want to clear the signUpUserId if it's part of a signup flow
      await AsyncStorage.removeItem("signUpUserId");
    },
  });

  const handleAllowLocation = async () => {
    setIsUpdatingProfile(true); // Start loading state

    // 1. Request foreground location permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied. Please enable it in your device settings to use this feature."
      );
      setIsUpdatingProfile(false);
      return;
    }

    // 2. Get current location
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const currentLocationString = `${latitude},${longitude}`; // Format location as a string

      // 3. Update user profile with the obtained location
      await mutateAsync({ location: currentLocationString });
    } catch (error) {
      console.error("Error getting location or updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Location Error",
        text2: "Could not get current location or update profile.",
      });
      setIsUpdatingProfile(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar barStyle='dark-content' />

      {/* Header with back button and title */}
      <View className='p-6 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text className='text-3xl font-bold ml-4'>Location</Text>
      </View>

      <View className='flex-1 justify-between px-6'>
        <View className='items-center'>
          {/* photo */}
          <Image
            source={require("@/assets/images/amico1.png")}
            className='w-64 h-64 mt-8'
            onError={(e) =>
              console.log("Image could not be loaded, using fallback")
            }
          />

          {/* Text content */}
          <View className='items-center mt-10'>
            <Text className='text-2xl font-bold text-center mb-3'>
              Allow your Location
            </Text>
            <Text className='text-lg text-center text-gray-800'>
              We will need your location to give you a better experience.
            </Text>
          </View>
        </View>

        {/* Button at bottom of screen */}
        <TouchableOpacity
          className={`${
            isUpdatingProfile ? "bg-gray-300" : "bg-[#F13F5F]"
          } py-4 rounded-full mb-10`}
          onPress={handleAllowLocation}
          disabled={isUpdatingProfile} // Disable button while updating
        >
          {isUpdatingProfile && (
            <ActivityIndicator size='small' color='#F13F5F' />
          )}
          <Text
            className={`${
              isUpdatingProfile ? "text-[#F13F5F]" : "text-white"
            } text-center font-semibold text-lg"`}>
            {isUpdatingProfile ? "Getting Location..." : "Use Current Location"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationPermissionScreen;
