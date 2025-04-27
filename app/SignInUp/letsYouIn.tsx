import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Back button */}
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View className="flex-1 px-6">
        {/* Illustration */}
        <View className="items-center justify-center mt-10 mb-8">
          <Image
            source={require('@/assets/images/amico.png')}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-5xl font-bold text-center mb-10">
          Let's you in
        </Text>

        {/* Social login buttons */}
        <View className="mb-6 space-y-4">
          <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 p-4 rounded-full">
            <Image 
              source={require('@/assets/icons/Frame.png')} 
              className="w-5 h-5 mr-3" 
            />
            <Text className="text-black-800 text-lg  font-bold">Continue with As a tourist</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 p-4 my-6 rounded-full">
            <Image 
              source={require('@/assets/icons/Frame.png')} 
              className="w-5 h-5 mr-3" 
            />
            <Text className="text-black-800 text-lg font-bold">Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 p-4 rounded-full">
            <Image 
              source={require('@/assets/icons/Frame1.png')} 
              className="w-5 h-5 mr-3" 
            />
            <Text className="text-black-800 text-lg font-bold">Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center justify-center  mb-6">
          <View className="flex-1 h-px bg-gray-300"></View>
          <Text className="mx-4 font-bold text-gray-600 my-4">or</Text>
          <View className="flex-1 h-px bg-gray-300"></View>
        </View>

        {/* Sign in with password button */}
        <TouchableOpacity 
          className="bg-rose-500 py-4 rounded-full mb-6"
          onPress={() => router.push('/SignInUp/signIn')}
        >
          <Text className="text-white text-center font-semibold text-lg">Sign in with password</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/SignInUp/signUp')}>
            <Text className="text-blue-600 font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;