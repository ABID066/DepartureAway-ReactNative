import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Back button */}
      <View className='p-4'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View className='flex-1 px-8'>
        {/* Logo */}
        <View className='items-center justify-center mb-12 mt-4'>
          <Image
            source={require("@/assets/images/logo.png")}
            className='w-41 h-16'
            resizeMode='contain'
          />
        </View>

        {/* Title */}
        <Text className='text-5xl font-bold text-center mb-12'>Sign in</Text>

        {/* Email input */}
        <View className='flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mt-4 mb-6'>
          <Ionicons name='mail-outline' size={20} color='gray' />
          <TextInput
            className='flex-1 ml-2 text-gray-800'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>

        {/* Password input */}
        <View className='flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-4'>
          <Ionicons name='lock-closed-outline' size={20} color='gray' />
          <TextInput
            className='flex-1 ml-2 text-gray-800'
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize='none'
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color='gray'
            />
          </TouchableOpacity>
        </View>

        {/* Remember me checkbox */}
        <View className='flex-row justify-center items-center mb-6 mt-4'>
          <TouchableOpacity
            className={`w-5 h-5 rounded border flex items-center justify-center ${
              rememberMe ? "bg-rose-500 border-rose-500" : "border-rose-700"
            }`}
            onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe && (
              <Ionicons name='checkmark' size={12} color='white' />
            )}
          </TouchableOpacity>
          <Text className='ml-2 text-lg font-bold text-black-700'>
            Remember me
          </Text>
        </View>

        {/* Sign in button */}
        <TouchableOpacity
          className='bg-rose-500 py-4 rounded-full mb-12'
          onPress={() => router.push("/home")}>
          <Text className='text-white text-center font-semibold text-lg'>
            Log In
          </Text>
        </TouchableOpacity>

        {/* Continue with options */}
        <View className='items-center mb-6'>
          <View className='flex-row items-center justify-center  '>
            <View className='flex-1 h-px bg-gray-300'></View>
            <Text className='mx-4 text-xl font-bold text-gray-500 my-4'>
              or continue with
            </Text>
            <View className='flex-1 h-px bg-gray-300'></View>
          </View>

          <View className='flex-row justify-center mt-10'>
            <TouchableOpacity className='w-20 h-16 rounded-lg bg-blue-50 items-center justify-center'>
              <Image
                source={require("@/assets/icons/Frame.png")}
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-12'></View>

            <TouchableOpacity className='w-20 h-16 rounded-lg bg-blue-50 items-center justify-center'>
              <Image
                source={require("@/assets/icons/Frame1.png")}
                className='w-6 h-6'
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Create account link */}
        <View className='flex-row justify-center mt-4'>
          <Text className='text-lg text-gray-500 font-medium'>
            Don't have an account yet?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text className='text-xl text-blue-800 font-bold'>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
