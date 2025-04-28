import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import PaymentMethodItem from "@/components/Payment/PaymentMethodItem";

const paymentMethods: PaymentMethod[] = [
  { id: "1", name: "PayPal", logo: icons?.frame1 },
  { id: "2", name: "Google Pay", logo: icons?.frame2 },
  { id: "3", name: "Apple Pay", logo: icons?.frame3 },
];

const OrderPage2 = () => {
  const [selectedMethod, setSelectedMethod] = useState("PayPal");
  return (
    <View className='w-full min-h-screen h-auto bg-white overflow-x-hidden shadow-lg  flex-col'>
      <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[180px]'>
        <TouchableOpacity className='absolute left-[5%] top-11'>
          <Image source={icons?.arrowLeft} className='w-6 h-6' />
        </TouchableOpacity>
        <Image
          source={images?.logo}
          className='w-[40%] max-w-[162px] h-[46px] mt-3'
          accessibilityLabel='Departure Away logo, stylized pink and orange circle with text Departure Away'
          resizeMode='contain'
        />
        <TouchableOpacity className='flex-row gap-3 bg-white rounded-xl p-2 border border-[#F2F2F2] absolute -bottom-[55%] px-3 py-4 w-[94%] max-w-[94%] overflow-hidden z-10'>
          <Image
            source={images?.rectangle}
            className='w-24 h-[110px] rounded-lg'
            accessibilityLabel={`Seamless Flight Booking Experience Package image`}
            resizeMode='cover'
          />
          <View className='flex-col flex-1'>
            <Text className='text-[#2B2B2B] font-medium text-sm md:text-base'>
              From $20
            </Text>
            <Text className='font-medium leading-tight my-1.5 text-[#828282] text-xs md:text-sm'>
              Seamless Flight Booking Experience Package
            </Text>
            <View className='flex-row items-center gap-2 my-1'>
              <Image source={images?.ellipse} className='w-5 h-5' />
              <Text className='text-xs font-medium text-[#828282]'>
                Skyward Bliss
              </Text>
            </View>
            <Text className='text-[#FF1A5A] font-medium text-xs'>Economy</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          minHeight: "90%",
          paddingBottom: 24,
          paddingTop: 100,
        }}
        showsVerticalScrollIndicator={false}
        className='p-5'>
        <Text className='text-base font-normal text-[#212121]  pb-3 text-justify mx-auto'>
          Select the payment method you want to use.
        </Text>
        <View className='gap-8'>
          {paymentMethods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          ))}
          <TouchableOpacity
            className='bg-[#FF1A5A1A] py-[18px] px-4 rounded-[100px]'
            onPress={() => {
              /* navigation logic */
            }}>
            <Text className='text-center text-[#FF1A5A]'>Add New Card</Text>
          </TouchableOpacity>
        </View>
        <View className='py-24'>
          <TouchableOpacity className='bg-[#FF1A5A] rounded-full py-3'>
            <Text className='text-white text-center font-semibold text-base'>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderPage2;
