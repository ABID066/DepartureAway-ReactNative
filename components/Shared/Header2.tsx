import { View, Text, Image, TouchableOpacity, type ImageSourcePropType } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";

interface ItemProps {
  id?: number;
  img?: ImageSourcePropType | undefined;
  title?: string;
  agency?: string;
  personImg?: ImageSourcePropType | undefined;
}

interface Header2Props {
  item?: ItemProps
}

const Header2 = ({item}: Header2Props) => {
  const router = useRouter()
  return (
    <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[180px]'>
      <TouchableOpacity className='absolute left-[5%] top-11' onPress={() => router.back()}>
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
  );
};

export default Header2;
