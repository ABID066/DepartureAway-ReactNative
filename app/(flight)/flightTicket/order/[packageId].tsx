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
import Header2 from "@/components/Shared/Header2";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { images } from "@/constants/images";
import { Link } from "expo-router";

const OrderPage = () => {
  const { packageId } = useLocalSearchParams();
  console.log(typeof packageId, packageId);
  const tourPackages = [
    {
      id: 1,
      img: images?.rectangle,
      title: "Seamless Flight Booking Experience Package",
      agency: "Skyward Bliss",
      personImg: images?.ellipse,
    },
    {
      id: 2,
      img: images?.rectangle1,
      title: "Seamless Flight Booking Experience Package",
      agency: "Royelx tech",
      personImg: images?.ellipse1,
    },
    {
      id: 3,
      img: images?.rectangle2,
      title: "Seamless Flight Booking Experience Package",
      agency: "Al Hella Agency",
      personImg: images?.ellipse2,
    },
    {
      id: 4,
      img: images?.rectangle3,
      title: "Seamless Flight Booking Experience Package",
      agency: "Skyward Bliss",
      personImg: images?.ellipse,
    },
  ];

  const tourPackage = tourPackages.find(
    (item) => item.id.toString() === packageId
  ) || {
    id: 0, // Default values
    img: images?.rectangle, // Fallback image
    title: "Default Package",
    agency: "Default Agency",
    personImg: images?.ellipse, // Fallback image
  };

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
      <Header2 item={tourPackage} />
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
            <Link href={{ pathname: "/flightTicket/order/payment/selectPaymentMethod" }} asChild>
              <TouchableOpacity className='bg-[#FF1A5A] rounded-full py-3'>
                <Text className='text-white text-center font-semibold text-base'>
                  Continue
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderPage;
