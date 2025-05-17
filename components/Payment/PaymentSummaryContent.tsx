import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import React from "react";

interface contentPaymentProps {
  continuePayment: () => void;
}

const PaymentSummaryContent = ({ continuePayment }: contentPaymentProps) => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        className='w-full mx-auto mt-28 p-6 max-h-[70vh]'>
        {/* Departure Info */}
        <View className='rounded-[20px] bg-white shadow-[0px_4px_60px_0px_rgba(4,6,15,0.05)] p-6 gap-4 '>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>
              Departure Date
            </Text>
            <Text className='text-[#616161] text-sm font-normal'>
              Thursday, 29 Mar, 2024
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>Form</Text>
            <Text className='text-[#616161] text-sm font-normal'>
              Dubai,UAE
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>To</Text>
            <Text className='text-[#616161] text-sm font-normal'>
              Dhaka,Bangladesh
            </Text>
          </View>
        </View>

        {/* Amount Info */}
        <View className='bg-white rounded-xl p-6 gap-4 shadow-[0px_4px_60px_0px_rgba(4,6,15,0.05)] mt-6'>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>Amount</Text>
            <Text className='text-[#616161] text-sm font-normal'>$20</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>Tax</Text>
            <Text className='text-[#616161] text-sm font-normal'>$5.00</Text>
          </View>
          <View className='border-b border-gray-200 my-2' />
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>Total</Text>
            <Text className='text-[#616161] text-sm font-normal'>$25.00</Text>
          </View>
        </View>

        {/* Card Info */}
        <View className='bg-white rounded-xl  shadow-[0px_4px_60px_0px_rgba(4,6,15,0.05)] p-6 flex-row items-center justify-between mt-6'>
          <View className='flex-row items-center justify-between'>
            <Image
              source={icons?.frame4}
              alt='Mastercard logo in red and orange circles'
              className='w-10 h-8'
              resizeMode='contain'
            />
            <Text className='text-[#616161] text-sm font-medium tracking-widest ml-4'>
              •••• •••• •••• •••• 4679
            </Text>
          </View>
          <TouchableOpacity>
            <Text className='text-[#FF1A5A] font-semibold text-sm'>Change</Text>
          </TouchableOpacity>
        </View>
        <View className='py-28'>
          <TouchableOpacity
            onPress={() => continuePayment()}
            className='bg-[#FF1A5A] rounded-full py-5'>
            <Text className='text-white text-center font-semibold text-base'>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PaymentSummaryContent;
