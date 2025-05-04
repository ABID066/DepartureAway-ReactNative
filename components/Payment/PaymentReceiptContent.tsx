import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import Header2 from "../Shared/(Headers)/Header2";
import Header3 from "../Shared/(Headers)/Header3";
import { Link } from "expo-router";

const PaymentReceiptContent = () => {
  return (
    <View>
      <Header3 />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          minHeight: "95%",
        }}
        showsVerticalScrollIndicator={false}
        className='w-full mx-auto mt-28 p-6'>
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

        {/* Customer Info */}
        <View className='rounded-[20px] bg-white shadow-[0px_4px_60px_0px_rgba(4,6,15,0.05)] p-6 gap-4 mt-6'>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>Name</Text>
            <Text className='text-[#616161] text-sm font-normal'>
              Samiul Islam
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>
              Phone Number
            </Text>
            <Text className='text-[#616161] text-sm font-normal'>
              +1 111 467 378 399
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>
              Transaction ID
            </Text>
            <View className='flex-row'>
              <Text className='text-[#616161] text-sm font-normal mr-2'>
                5457383979
              </Text>
              <Image source={icons?.frame5} />
            </View>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-[#616161] text-sm font-medium'>Status</Text>
            <Image source={icons?.paid} />
          </View>
        </View>

        {/* Buttons */}

        <View className='w-full gap-4 mt-16'>
          <TouchableOpacity className='w-full py-[18px] rounded-[100px] bg-white border border-[#FF1A5A]'>
            <Text className='text-center text-[#FF1A5A] font-bold text-base'>
              Downloads
            </Text>
          </TouchableOpacity>
          <Link href={"/home"} asChild>
            <TouchableOpacity className='w-full py-[18px] rounded-[100px] bg-[#FF1A5A] focus:outline-none focus:ring-0'>
              <Text className='text-center text-white font-bold text-base'>
                Continue
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentReceiptContent;
