import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const HotelPage2 = () => {
  const [hotelClass, setHotelClass] = useState("Basic Hotel");
  return (
    <View className='w-full h-full bg-white overflow-y-auto overflow-x-hidden shadow-lg flex flex-col'>
      <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[158px]'>
        <TouchableOpacity className='absolute left-[4%] top-11'>
          <Image source={icons?.arrowLeft} />
        </TouchableOpacity>
        <Image
          source={images?.logo}
          className='w-[162px] h-[46px] mt-3'
          accessibilityLabel='Departure Away logo, stylized pink and orange circle with text Departure Away'
        />
        <Image
          source={images?.hotel4}
          className='rounded-xl absolute -bottom-[110%] w-full max-w-[94%] h[210px] mx-auto'
          accessibilityLabel='Eiffel Tower under cloudy sky with dramatic clouds, travel destination'
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='px-6 flex-1 flex-col gap-4 mt-48'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-base text-[#4F4F4F]'>
            Customer Satisfaction
          </Text>
          <View className='flex-row items-center border border-green-600 rounded-full px-3 py-1'>
            <View className='w-2.5 h-2.5 bg-green-600 rounded-full mr-2' />
            <Text className='text-green-600 font-semibold'>Online</Text>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='flex-row gap-3 pb-2'>
            {[...Array(2)].map((_, i) => (
              <View
                key={i}
                className='bg-white rounded-xl shadow-xl px-5 py-4 max-w-[326px] min-h-[120px] mr-3'>
                <Text className='text-xs text-[#000000] text-center font-light'>
                  Skyward Bliss delivered a seamless booking experience with
                  standout customer service and valuable perks like priority
                  check-in.
                </Text>
                <Text className='font-medium mt-2 mb-1 text-base text-center my-3'>
                  Jordan M.
                </Text>
                <View className='flex-row gap-0.5 text-[#FF1A5A] text-base justify-center'>
                  {[...Array(5)].map((_, i) => (
                    <FontAwesome
                      key={i}
                      name='star'
                      size={10}
                      color='#FF1A5A'
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className='flex-row gap-3 text-xs font-semibold items-center pt-6 my-3 border-t border-[#F2F2F2]'>
          <TouchableOpacity
            onPress={() => setHotelClass("Basic Hotel")}
            className={`${
              hotelClass == "Basic Hotel" && "bg-[#FF1A5A] rounded-full"
            } px-3 py-1`}>
            <Text
              className={`text-base ${
                hotelClass == "Basic Hotel" && "text-white font-semibold"
              }`}>
              Basic Hotel ($20)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHotelClass("Standard Hotel")}
            className={`${
              hotelClass == "Standard Hotel" && "bg-[#FF1A5A] rounded-full"
            } px-3 py-1`}>
            <Text
              className={`text-base ${
                hotelClass == "Standard Hotel" && "text-white font-semibold"
              }`}>
              Standard Hotel ($50)
            </Text>
          </TouchableOpacity>
        </View>
        <View className='border-b border-[#F2F2F2]'>
          <Text className='font-semibold text-[#212121] text-2xl leading-tight'>
            I'll make the booking for your honeymoon hotel stay
          </Text>
          <Text className='text-sm text-[#4F4F4F] leading-snug my-5'>
            Experience the ultimate in romance and luxury without the hassle of
            handling reservations yourself. With my personalized honeymoon hotel
            booking service, I'll take care of securing your dream
            accommodation. Simply provide your desired destination, dates,
            <Text> See More</Text>
          </Text>
        </View>
        <View className='py-6 gap-2'>
          <View className='flex-row items-center gap-2'>
            <Image
              source={images?.ellipse}
              className='w-8 h-8 rounded-full'
              accessibilityLabel='Skyward Bliss agency logo, circular icon with initials SB'
            />
            <Text className='font-medium text-lg text-[#4F4F4F]'>
              Skyward Bliss
            </Text>
          </View>
          <View className='flex-row items-center gap-2'>
            <FontAwesome name='star' size={18} color='#fbbf24' />
            <Text className='text-[#000000] font-medium text-xs'>
              4.9/5 <Text className='text-[#828282] ml-8'> (306)</Text>
            </Text>
          </View>
        </View>
        <View className='flex-row gap-3 mt-auto pb-12'>
          <TouchableOpacity className='border border-[#FF1A5A] rounded-full flex-grow px-4 py-[18px]'>
            <Text className='text-center text-base text-[#FF1A5A]'>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-[#FF1A5A] rounded-full flex-grow px-4 py-[18px] shadow-lg'>
            <Text className='text-center text-white text-base font-semibold'>
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelPage2;
