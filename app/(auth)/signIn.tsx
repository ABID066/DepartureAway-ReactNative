import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/authServices";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";

const SignIn = () => {
  const router = useRouter();
  const { setUser, saveLoginInfo } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (authData: { email: string; password: string }) => {
      const { data } = await loginUser(authData);
      return data;
    },
    onError: (err: unknown) => {
      let errorMessage = "Something went wrong";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Failed to Login!",
        text2: errorMessage,
      });
      // console.error("Login failed", errorMessage);
      setIsLoading(false);
    },
    mutationKey: ["user", "users"],
    onSuccess: async (data) => {
      const res = await data;
      const accessToken = res?.accessToken;
      const userData = res.user;
      const userSaveData = {
        id: userData?.id,
        userName: userData?.userName,
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
        role: userData?.role,
        image: userData?.image,
      };
      setUser(userSaveData);
      saveLoginInfo(accessToken);
      router.push("/home");
      Toast.show({
        type: "success",
        text1: "SignIn Successful!!",
      });
      setEmail("");
      setPassword("");
      setError(null);
      setIsLoading(false);
    },
  });

  const handleLogin = async () => {
    setIsLoading(true);
    if (email && password) {
      await mutateAsync({ email, password });
    } else {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView>
        {/* Back button */}
        <View className='p-4'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <View className='flex-1 px-8'>
          {/* Logo */}
          <View className='items-center justify-center mb-12'>
            <Image
              source={require("@/assets/images/logo.png")}
              className='w-41 h-16'
              resizeMode='contain'
            />
          </View>

          {/* Title */}
          <Text className='text-4xl font-bold text-center mb-6'>Sign in</Text>

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
          {/* Error message */}
          {error && (
            <Text className='text-red-500 text-sm mb-4 text-center font-semibold'>{error}</Text>
          )}


          {/* Remember me checkbox */}
          <View className='flex-row justify-center items-center mb-6 mt-4'>
            <TouchableOpacity
              className={`w-5 h-5 rounded border flex items-center justify-center ${
                rememberMe ? "bg-[#F13F5F} border-[#F13F5F}" : "border-rose-700"
              }`}
              onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe && (
                <Ionicons name='checkmark' size={12} color='white' />
              )}
            </TouchableOpacity>
            <Text className='ml-2 text-md font-bold text-black-700'>
              Remember me
            </Text>
          </View>

          {/* Sign in button */}
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            className={`${
              isLoading ? "bg-gray-300" : "bg-[#F13F5F]"
            } py-4 rounded-full mb-12`}
            onPress={() => handleLogin()}>
            {isLoading ? (
              <ActivityIndicator
                size='small'
                color='#F13F5F'
                className='mx-auto'
              />
            ) : (
              <Text className='text-white text-center font-semibold text-lg'>
                Log In
              </Text>
            )}
          </TouchableOpacity>

          {/* Continue with options */}
          <View className='items-center mb-6'>
            <View className='flex-row items-center justify-center  '>
              <View className='flex-1 h-px bg-gray-300'></View>
              <Text className='mx-4 text-md font-bold text-gray-500 my-4'>
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
                  source={require("@/assets/icons/Frame2.png")}
                  className='w-6 h-6'
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Create account link */}
          <View className='flex-row justify-center mt-4 mb-10'>
            <Text className='text-md text-gray-500 font-medium'>
              Don't have an account yet?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/signUp")}>
              <Text className='text-md text-blue-800 font-bold'>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
