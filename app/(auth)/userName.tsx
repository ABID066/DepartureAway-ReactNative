import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/authServices";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { AxiosError } from "axios";

const UserName = () => {
  const router = useRouter();
  const [isAccountCreating, setIsAccountCreating] = useState(false);
  const {
    formData,
    setFormData,
    errors,
    validateStep,
    step,
    resetMultiStepForm,
  } = useMultiStepForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (userData: UserData) => {
      const { data } = await createUser(userData);
      return data;
    },
    onError: (err: unknown) => {
      let errorMessage = "Something went wrong";

      if (err instanceof AxiosError) {
        if (
          err.response?.data?.message === "Duplicate key error" ||
          err.message === "Duplicate key error"
        ) {
          errorMessage = "User Already Exists!!";
        } else {
          errorMessage = err.response?.data?.message || err.message;
        }
      } else if (err instanceof Error) {
        if (err.message === "Duplicate key error") {
          errorMessage = "User Already Exists!!";
        } else {
          errorMessage = err.message;
        }
      }

      Toast.show({
        type: "error",
        text1: "Failed to create account!",
        text2: errorMessage,
      });

      // console.error("Account creation failed:", errorMessage);
      setIsAccountCreating(false);
    },
    mutationKey: ["user", "users"],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Account Create Successful!!",
      });
      resetMultiStepForm();
      router.push("/otpVerification");
      setIsAccountCreating(false);
    },
  });

  const handleCreateAccount = async () => {
    setIsAccountCreating(true);
    if (validateStep(1) && validateStep(2)) {
      const {
        role,
        image,
        firstName,
        lastName,
        phone,
        email,
        password,
        gender,
        countryCode: { dial_code },
        username,
      } = formData;
      const userData = {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
        phone: `${dial_code} ${phone}`,
        role: role,
        image: image,
        gender: gender,
        userName: username,
      };
      await mutateAsync(userData);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {step === 2 ? (
        <SafeAreaView className='flex-1 bg-white'>
          {/* Header with back button and title */}
          <View className='p-4 flex-row items-center'>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <Text className='text-2xl font-bold ml-4'>Choose Username</Text>
          </View>

          <View className='flex-1 px-6 flex-col justify-between'>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Profile picture placeholder */}
              <View className='items-center justify-center my-8'>
                <View className='w-36 h-36 rounded-full bg-gray-200 items-center justify-center'>
                  {formData?.image ? (
                    <Image
                      source={{ uri: formData?.image }}
                      className='w-full h-full rounded-full'
                      resizeMode='cover'
                    />
                  ) : (
                    <Ionicons name='person' size={80} color='#9ca3af' />
                  )}
                </View>
              </View>

              {/* Username input field */}
              <View className='mb-4'>
                <TextInput
                  className='bg-gray-50 p-6 rounded-2xl'
                  placeholder='Choose a unique username'
                  value={formData.username}
                  onChangeText={(text) => setFormData({ username: text })}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
                {errors.username && (
                  <Text className='text-red-500 mt-1'>{errors.username}</Text>
                )}
              </View>

              {/* Information text */}
              <Text className='text-gray-500 mb-8 text-center'>
                Choose a username that represents you. You can always change it
                later.
              </Text>
            </ScrollView>

            {/* Create Account button */}
            <TouchableOpacity
              className={` ${
                isAccountCreating ? "bg-gray-300" : "bg-[#F13F5F]"
              }  py-4 rounded-full mb-8`}
              onPress={handleCreateAccount}>
              <Text className='text-white text-center font-semibold text-lg'>
                {isAccountCreating ? "Creating Account" : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : null}
    </>
  );
};

export default UserName;
