import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const OTPVerificationScreen = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('+1 111 ******99');
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
    if (text !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Hide validation message when user starts typing
    setShowValidation(false);
  };

  // Handle key press for backspace
  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number): void => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    if (!resendActive) return;
    
    // Reset OTP fields
    setOtp(['', '', '', '']);
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

  // Handle verification
  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      // Navigation would go here - normally to the next screen
      router.push('/legal/terms'); // Change this to the appropriate route
      setShowValidation(false);
    } else {
      // Show validation message if OTP is incomplete
      setShowValidation(true);
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
        <View className='flex-1 justify-center items-center'>
          {/* Message */}
          <Text className="text-center mt-12 mb-8 text-xl text-black-800">
            Code has been send to {phoneNumber}
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
              />
            ))}
          </View>

          {/* Resend button */}
          <TouchableOpacity 
            onPress={handleResend}
            disabled={!resendActive}
          >
            <Text 
              className={`text-center ${resendActive ? 'text-rose-500' : 'text-gray-400'} text-base font-medium`}
            >
              {resendActive ? 'Resend' : `Resend (${countdown}s)`}
            </Text>
          </TouchableOpacity>
          
          {/* Validation message */}
          {showValidation && (
            <Text className="text-rose-500 text-center mt-4 font-medium">
              4-Digit OTP Required
            </Text>
          )}
        </View>

        {/* Verify button */}
        <TouchableOpacity 
          className="bg-rose-500 py-4 rounded-full mb-20 mt-auto"
          onPress={handleVerify}
        >
          <Text className="text-white text-center font-semibold text-lg">Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;