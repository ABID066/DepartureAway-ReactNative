import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const OrderPage1 = () => {
  const toLocations = [
    {
      airport: "Dhaka",
      country: "Bangladesh",
    },
    {
      airport: "Dubai",
      country: "UAE",
    },
  ];
  const fromLocations = [
    {
      airport: "Dubai",
      country: "UAE",
    },
    {
      airport: "Dhaka",
      country: "Bangladesh",
    },
  ];
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
            source={images?.Rectangle}
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
              <Image source={images?.Ellipse} className='w-5 h-5' />
              <Text className='text-xs font-medium text-[#828282]'>
                Skyward Bliss
              </Text>
            </View>
            <Text className='text-[#FF1A5A] font-medium text-xs'>Economy</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ minHeight: "90%", paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        className='p-5 flex-1 flex-col gap-5 mt-24'>
        <View className='flex-col gap-4 text-xs text-gray-700'>
          <View>
            <Text className='mb-1 font-normal text-base text-[#4F4F4F]'>
              Departure Date
            </Text>
            <View className='relative'>
              <TextInput
                value='Thursday, 29 Mar'
                className='w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 cursor-pointer'
              />
              <TouchableOpacity className='absolute right-4 top-3'>
                <FontAwesome5 name='calendar-alt' size={16} color='#9ca3af' />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className='mb-1 font-normal text-base text-[#4F4F4F]'>
              From
            </Text>
            <Picker
              selectedValue={"Dubai, UAE"}
              onValueChange={() => {}}
              className='w-full rounded-[20px] border border-gray-200 px-3 py-2 text-base text-[#212121] bg-[#FAFAFA]'>
              {fromLocations?.map((location, i) => (
                <Picker.Item
                  key={i + 1}
                  label={`${location?.airport}, ${location?.country}`}
                  value={`${location?.airport}, ${location?.country}`}
                />
              ))}
            </Picker>
          </View>
          <View>
            <Text className='mb-1 font-normal text-base text-[#4F4F4F]'>
              To
            </Text>
            <Picker
              selectedValue={"Dhaka, Bangladesh"}
              onValueChange={() => {}}
              className='w-full rounded-[20px] border border-gray-200 px-3 py-2 text-base text-[#212121] bg-[#FAFAFA]'>
              {toLocations?.map((location, i) => (
                <Picker.Item
                  key={i + 1}
                  label={`${location?.airport}, ${location?.country}`}
                  value={`${location?.airport}, ${location?.country}`}
                />
              ))}
            </Picker>
          </View>
          <View>
            <Text className='mb-1 font-normal text-base text-[#4F4F4F]'>
              Write a Brief
            </Text>
            <TextInput
              multiline
              // value=''
              placeholder={`Hello, I'm looking to book a flight from Dubai to Dhaka on Thursday, 29th March. Could you provide information on flight availability, times, duration, pricing, luggage allowance, and any travel requirements? Thanks for your help! Best, Samiul Islam`}
              // onChangeText={() => {}}
              className='w-full rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-600 resize-none min-h-28'
            />
            <TouchableOpacity
              className='flex-row items-center border gap-2 border-[#FF1A5A] rounded-full px-4 py-1 max-w-[138px] ml-auto mt-4'
              activeOpacity={0.7}>
              <Image source={icons?.aiChat} />
              <Text className='text-[#FF1A5A] font-medium text-sm'>
                Generate text
              </Text>
            </TouchableOpacity>
          </View>
          <View className='pt-24'>
            <TouchableOpacity className='bg-[#FF1A5A] rounded-full py-3'>
              <Text className='text-white text-center font-semibold text-base'>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderPage1;
