import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAuthServicePackages } from "@/hooks/useAuthServicePackages";

const OTPVerificationScreen = () => {
  const router = useRouter();
  const {verifyOTP} = useAuthServicePackages()
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [resendActive, setResendActive] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [showValidation, setShowValidation] = useState(false);

  // Handle OTP input change
  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (text !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Hide validation message when user starts typing
    setShowValidation(false);
  };

  // Handle key press for backspace
  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ): void => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    if (!resendActive) return;

    // Reset OTP fields
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();

    // Start countdown timer
    setResendActive(false);
    setCountdown(30);

    // Hide validation message
    setShowValidation(false);
  };

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !resendActive) {
      setResendActive(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const { mutateAsync } = useMutation({
    mutationFn: async (otpData: string) => {
      const { data } = await verifyOTP(otpData);
      return data;
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to email verification!",
      });
      console.error("Verification failed", err.message);
    },
    mutationKey: ["user", "users"],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Verification Successful!!",
      });
      router.push("/signIn");
      setShowValidation(false);
    },
  });

  // Handle verification
  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      mutateAsync(otpValue);
    } else {
      // Show validation message if OTP is incomplete
      setShowValidation(true);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Header with back button and title */}
      <View className='p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold ml-4'>OTP Code Verification</Text>
      </View>

      <View className='flex-1 px-6 flex-col justify-between'>
        <View className='flex-1 justify-center items-center'>
          {/* Message */}
          <Text className='text-center mt-12 mb-8 text-xl text-black-800'>
            Code has been send to your email address
          </Text>

          {/* OTP Input Fields */}
          <View className='flex-row justify-center space-x-4 mb-6'>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className='w-16 h-16 mx-3 bg-gray-100 rounded-lg text-center text-xl font-bold'
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType='number-pad'
                maxLength={1}
              />
            ))}
          </View>

          {/* Resend button */}
          <TouchableOpacity onPress={handleResend} disabled={!resendActive}>
            <Text
              className={`text-center ${
                resendActive ? "text-[#F13F5F]" : "text-gray-400"
              } text-base font-medium`}>
              {resendActive ? "Resend" : `Resend (${countdown}s)`}
            </Text>
          </TouchableOpacity>

          {/* Validation message */}
          {showValidation && (
            <Text className='text-[#F13F5F] text-center mt-4 font-medium'>
              4-Digit OTP Required
            </Text>
          )}
        </View>

        {/* Verify button */}
        <TouchableOpacity
          className='bg-[#F13F5F] py-4 rounded-full mb-20 mt-auto'
          onPress={handleVerify}>
          <Text className='text-white text-center font-semibold text-lg'>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
