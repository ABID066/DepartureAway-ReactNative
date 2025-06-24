import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator, // Import ActivityIndicator for loading state
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthServicePackages } from "@/hooks/useAuthServicePackages";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a type for the username data fetched from the API
type UserNameResponseData = {
  userName: string;
}[];

// Type for the data sent to createUser mutation
interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  image: string;
  gender: string;
  userName: string; // Ensure this matches your backend field name
}

const UserName = () => {
  const router = useRouter();
  const { createUser, getAllUserName } = useAuthServicePackages();
  const [isAccountCreating, setIsAccountCreating] = useState(false);
  const {
    formData,
    setFormData,
    errors,
    setErrors, // setErrors is already a dispatch function
    validateStep,
    step,
    resetMultiStepForm,
  } = useMultiStepForm();

  // Fetch all usernames
  const { data: allUserNamesQuery, isLoading: isLoadingUserNames } = useQuery<
    any,
    Error,
    { data: UserNameResponseData }
  >({
    queryKey: ["allUserNames", "users", "user"],
    queryFn: async () => await getAllUserName(),
  });

  // Extract just the username strings for easier checking
  const allExistingUserNames =
    allUserNamesQuery?.data?.map((u) => u?.userName?.toLowerCase()) || [];

  const { mutateAsync } = useMutation({
    mutationFn: async (userData: CreateUserPayload) => {
      const { data } = await createUser(userData);
      return data;
    },
    onError: (err) => {
      let errorMessage = "Something went wrong";

      if (err instanceof AxiosError) {
        // Check for specific error message from backend for duplicate key (e.g., email or username)
        if (
          err.response?.data?.message?.includes("E11000 duplicate key error") || // MongoDB duplicate key error
          err.response?.data?.message?.includes("User Already Exists") // Custom message from your backend
        ) {
          errorMessage = "Account already exists with this email or username.";
        } else {
          errorMessage = err.response?.data?.message || err.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      Toast.show({
        type: "error",
        text1: "Failed to create account!",
        text2: errorMessage,
      });

      setIsAccountCreating(false);
    },
    mutationKey: ["user", "users"],
    onSuccess: (data) => {
      AsyncStorage.setItem("signUpUserId", data?.id);
      AsyncStorage.setItem("regUserEmail", data?.email);
      Toast.show({
        type: "success",
        text1: "Account Created Successfully!",
        text2: "Redirecting to OTP verification...",
      });
      resetMultiStepForm();
      router.push("/otpVerification");
      setIsAccountCreating(false);
    },
  });

  const handleCreateAccount = async () => {
    setIsAccountCreating(true);

    // Validate current step (username) and pass existing usernames for the check
    // Ensure validateStep can handle an array of existing usernames
    const isStep2Valid = validateStep(2, {
      existingUsernames: allExistingUserNames,
    });

    // Validate previous step (all other registration fields)
    const isStep1Valid = validateStep(1);

    if (isStep1Valid && isStep2Valid) {
      // Both steps must be valid
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

      const userData: CreateUserPayload = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        phone: `${dial_code} ${phone}`,
        role,
        image,
        gender,
        userName: username, // Send the username as 'userName' to backend
      };

      await mutateAsync(userData); // Await the mutation
    } else {
      // If validation fails, errors are already set by validateStep
      setIsAccountCreating(false);
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please correct the errors in the form.",
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Display loading indicator while fetching usernames
  if (isLoadingUserNames) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color='#F13F5F' />
        <Text className='mt-2 text-gray-600'>Loading usernames...</Text>
      </View>
    );
  }

  return (
    <>
      {step === 2 ? (
        <SafeAreaView className='flex-1 bg-white'>
          <View className='p-4 flex-row items-center'>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>
            <Text className='text-2xl font-bold ml-4'>Choose Username</Text>
          </View>

          <View className='flex-1 px-6 flex-col justify-between'>
            <ScrollView showsVerticalScrollIndicator={false}>
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

              <View className='mb-4'>
                <TextInput
                  className='bg-gray-50 p-6 rounded-2xl'
                  placeholder='Choose a unique username'
                  value={formData.username}
                  onChangeText={(text) => {
                    setFormData({ username: text });
                    // Clear the username error *only if* the text is no longer empty,
                    // allowing validation on submit to re-check
                    if (errors.username && text.length > 0) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: undefined,
                      }));
                    }
                  }}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
                {errors.username && (
                  <Text className='text-red-500 mt-1'>{errors.username}</Text>
                )}
              </View>

              <Text className='text-gray-500 mb-8 text-center'>
                Choose a username that represents you. You can always change it
                later.
              </Text>
            </ScrollView>

            <TouchableOpacity
              className={`${
                isAccountCreating ? "bg-gray-300" : "bg-[#F13F5F]"
              } py-4 rounded-full mb-8 flex-row justify-center items-center`} // Added flex styles for indicator
              onPress={handleCreateAccount}
              disabled={isAccountCreating}>
              {isAccountCreating ? (
                <ActivityIndicator size='small' color='#fff' className='mr-2' />
              ) : null}
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
