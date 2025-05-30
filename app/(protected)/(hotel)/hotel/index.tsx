import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { Link, useRouter } from "expo-router";

const HotelPage1 = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const locations = [
    {
      capital: "Dhaka",
      country: "Bangladesh",
    },
  ];
  const filterOptions = [
    {
      title: "All",
    },
    {
      title: "Agency",
    },
    {
      title: "Individual",
    },
    {
      title: "Local Sellers",
    },
  ];
  const hotelPackages = [
    {
      img: images?.hotel,
      title: "Seamless Flight Booking Experience Package",
      agency: "Skyward Bliss",
      personImg: images?.ellipse,
    },
    {
      img: images?.hotel1,
      title: "Seamless Flight Booking Experience Package",
      agency: "Royelx tech",
      personImg: images?.ellipse1,
    },
    {
      img: images?.hotel2,
      title: "Seamless Flight Booking Experience Package",
      agency: "Al Hella Agency",
      personImg: images?.ellipse2,
    },
    {
      img: images?.hotel3,
      title: "Seamless Flight Booking Experience Package",
      agency: "Skyward Bliss",
      personImg: images?.ellipse,
    },
  ];
  return (
    <View className='w-full h-full bg-white overflow-hidden shadow-lg flex flex-col'>
      <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[180px] md:min-h-[200px]'>
        <TouchableOpacity
          className='absolute left-[5%] top-11'
          onPress={() => router.back()}>
          <Image source={icons?.arrowLeft} className='w-6 h-6' />
        </TouchableOpacity>

        <Image
          source={images?.logo}
          className='w-[40%] max-w-[162px] h-[46px] mt-3'
          accessibilityLabel='Departure Away logo, stylized pink and orange circle with text Departure Away'
          resizeMode='contain'
        />

        <View className='bg-white rounded-[20px] shadow-md p-4 absolute -bottom-[45%] px-4 md:px-6 py-4 w-[90%] max-w-[90%] md:max-w-[80%]'>
          <Text className='text-center font-medium text-[#212121] mb-3 text-base md:text-lg'>
            Book your Hotel
          </Text>

          <View className='flex-row items-center gap-2 relative'>
            <TextInput
              placeholder='Where are you going ?'
              placeholderTextColor='#828282'
              className='rounded-md border border-[#F2F2F2] px-3 py-2 text-sm md:text-base text-gray-600 w-full h-12 md:h-14'
            />

            <TouchableOpacity className='bg-[#FF1A5A] rounded-[10px] w-12 h-12 md:size-[52px] flex items-center justify-center absolute right-0'>
              <Image source={icons?.search} className='w-5 h-5 md:size-6' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className='px-6 py-4 flex-1 flex-col gap-5 mt-16'>
        <View>
          <Text className='text-base text-[#4F4F4F] my-2'>Country</Text>
          <Picker
            selectedValue={"Dhaka, Bangladesh"}
            onValueChange={() => {}}
            className='w-full rounded-[20px] border border-gray-200 px-3 py-2 text-base text-[#212121] bg-[#FAFAFA]'>
            {locations?.map((location, i) => (
              <Picker.Item
                key={i + 1}
                label={`${location?.capital}, ${location?.country}`}
                value={`${location?.capital}, ${location?.country}`}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text className='text-base text-[#4F4F4F]'>Filter By</Text>

          <View className='flex-row gap-3 items-center py-3'>
            {filterOptions.map((option, i) => (
              <TouchableOpacity
                key={i + 1}
                onPress={() => setActiveTab(option?.title)}
                className={`${
                  activeTab == option.title && "bg-[#FF1A5A] rounded-[30px]"
                } px-3.5 py-1`}>
                <Text
                  className={`${
                    activeTab == option.title
                      ? "text-white font-semibold"
                      : "text-[#4F4F4F]"
                  } text-base`}>
                  {option?.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text className='text-base font-medium text-[#212121] my-2'>
          Total 23 founds
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className='max-h-auto pr-1 flex-col gap-3'>
          {hotelPackages?.map((item, i) => (
            <Link
            key={i} href={{pathname:"/hotel/[hotelPackageId]", params: {hotelPackageId: 1}} } asChild>
            <TouchableOpacity
              className='flex-row gap-3 bg-white rounded-xl p-2 w-full border border-[#F2F2F2] mb-3'>
              <Image
                source={item?.img}
                className='w-24 h-[110px] rounded-lg'
                accessibilityLabel={`${item.title} image`}
              />
              <View className='flex-col'>
                <Text className='text-[#FF1A5A] font-medium'>From $20</Text>
                <Text className='font-medium leading-tight my-1.5 w-[85%] text-[#000000]'>
                  {item.title}
                </Text>
                <View className='flex-row items-center gap-2 my-1'>
                  <Image source={item.personImg} className='size-5' />
                  <Text className='text-xs font-medium text-[#4F4F4F]'>
                    {item.agency}
                  </Text>
                </View>
                <View className='flex-row items-center gap-1 text-yellow-400 mt-0.5'>
                  <FontAwesome name='star' size={18} color='#fbbf24' />
                  <Text className='text-[#000000] ml-1 font-medium text-xs'>
                    4.9/5 <Text className='text-[#828282] ml-1'> (306)</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HotelPage1;
