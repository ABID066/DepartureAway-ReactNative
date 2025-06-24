import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator, // Import ActivityIndicator for loading state
  Keyboard, // Import Keyboard for dismissing it
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAuthServicePackages } from "@/hooks/useAuthServicePackages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPVerificationScreen = () => {
  const router = useRouter();
  const { verifyOTP, resendVerificationCode } = useAuthServicePackages(); // Destructure resendVerificationCode
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [resendActive, setResendActive] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [isResending, setIsResending] = useState(false); // New state for resend loading
  const [verificationLoading, setVerificationLoading] = useState(false); // New state for verification loading

  // Handle OTP input change
  const handleOtpChange = (text: string, index: number) => {
    // Ensure only one character is processed
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if current field is filled and not the last one
    if (text !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (text !== "" && index === otp.length - 1) {
      // If last digit is entered, dismiss keyboard
      Keyboard.dismiss();
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
  const handleResend = async () => {
    if (!resendActive || isResending) return; // Prevent multiple clicks while resending

    setIsResending(true); // Set resending loading state
    setShowValidation(false); // Hide any previous validation message

    try {
      const regUserEmail = await AsyncStorage.getItem("regUserEmail");

      if (!regUserEmail) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User email not found. Please try registering again.",
        });
        setIsResending(false);
        return;
      }

      await resendVerificationCode(regUserEmail);
      Toast.show({
        type: "success",
        text1: "Code Resent!",
        text2: "A new verification code has been sent to your email.",
      });

      // Reset OTP fields
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus(); // Focus on the first input field

      // Start countdown timer
      setResendActive(false);
      setCountdown(30); // Start a 30-second countdown
    } catch (err: any) {
      console.error("Resend error:", err);
      Toast.show({
        type: "error",
        text1: "Resend Failed!",
        text2: err.message || "Failed to resend verification code.",
      });
    } finally {
      setIsResending(false); // End resending loading state
    }
  };

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !resendActive) {
      setResendActive(true); // Activate resend button when countdown is over
    }

    return () => clearTimeout(timer); // Clear timeout on unmount or if countdown resets
  }, [countdown, resendActive]);

  const { mutateAsync } = useMutation({
    mutationFn: async (otpData: string) => {
      setVerificationLoading(true); // Start verification loading
      const { data } = await verifyOTP(otpData);
      return data;
    },
    onError: (err: any) => {
      setVerificationLoading(false); // End verification loading on error
      console.error("Verification failed:", err); // Log the full error for debugging
      Toast.show({
        type: "error",
        text1: "Verification Failed!",
        text2: err.message || "Please check your OTP and try again.",
      });
    },
    mutationKey: ["user", "users"], // Consider making this more specific if needed
    onSuccess: () => {
      setVerificationLoading(false); // End verification loading on success
      Toast.show({
        type: "success",
        text1: "Verification Successful!",
        text2: "Your email has been verified.",
      });
      router.push("/legal/terms"); // Navigate to the next screen
      setShowValidation(false); // Hide validation message
      // Optionally clear AsyncStorage if verification signifies end of signup flow
      AsyncStorage.removeItem("regUserEmail");
    },
  });

  // Handle verification
  const handleVerify = () => {
    Keyboard.dismiss(); // Dismiss keyboard when verify is pressed
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      mutateAsync(otpValue);
    } else {
      setShowValidation(true); // Show validation message if OTP is incomplete
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with back button and title */}
      <View className="p-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">OTP Code Verification</Text>
      </View>

      <View className="flex-1 px-6 flex-col justify-between">
        <View className="flex-1 justify-center items-center">
          {/* Message */}
          <Text className="text-center mt-12 mb-8 text-xl text-black-800">
            Code has been sent to your email address
          </Text>

          {/* OTP Input Fields */}
          <View className="flex-row justify-center space-x-4 mb-6">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-16 h-16 mx-3 bg-gray-100 rounded-lg text-center text-xl font-bold"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                editable={!verificationLoading} // Disable input while verifying
              />
            ))}
          </View>

          {/* Resend button and countdown */}
          {/* <TouchableOpacity
            onPress={handleResend}
            disabled={!resendActive || isResending || verificationLoading} // Disable if resending, not active, or verifying
          >
            <Text
              className={`text-center ${
                resendActive && !isResending && !verificationLoading
                  ? "text-[#F13F5F]"
                  : "text-gray-400"
              } text-base font-medium`}
            >
              {isResending
                ? "Resending..."
                : resendActive
                ? "Resend"
                : `Resend (${countdown}s)`}
            </Text>
          </TouchableOpacity> */}

          {/* Validation message */}
          {showValidation && (
            <Text className="text-[#F13F5F] text-center mt-4 font-medium">
              A 4-digit OTP is required.
            </Text>
          )}
        </View>

        {/* Verify button */}
        <TouchableOpacity
          className="bg-[#F13F5F] py-4 rounded-full mb-20 mt-auto"
          onPress={handleVerify}
          disabled={verificationLoading || isResending} // Disable button while verifying or resending
        >
          {verificationLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;