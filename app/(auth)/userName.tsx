import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen2 = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with back button and title */}
      <View className="p-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">As a tourist</Text>
      </View>

      <View className="flex-1 px-6 flex-col justify-between">
        <View>
          {/* Profile picture placeholder */}
          <View className="items-center justify-center my-8">
            <View className="w-36 h-36 rounded-full bg-gray-200 items-center justify-center">
              <Ionicons name="person" size={80} color="#9ca3af" />
              <View className="absolute right-0 bottom-0 bg-rose-500 rounded-full p-2">
                <Ionicons name="pencil" size={20} color="white" />
              </View>
            </View>
          </View>

          {/* Form fields */}
          <View className="mb-4">
            <TextInput
              className="bg-gray-50 p-6 rounded-2xl"
              placeholder="User Name"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        {/* Next button at bottom of screen */}
        <TouchableOpacity 
          className="bg-rose-500 py-4 rounded-full mb-20 mt-auto"
          onPress={() => router.push('/otpVerification')}
        >
          <Text className="text-white text-center font-semibold text-lg">Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen2;