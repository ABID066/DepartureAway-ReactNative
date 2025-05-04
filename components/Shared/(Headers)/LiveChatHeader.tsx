import {
  View,
  Text,
  Image,
  TouchableOpacity,
  type ImageSourcePropType,
} from "react-native";
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

interface LiveChatHeaderProps {
  item?: ItemProps;
}

const LiveChatHeader = ({ item }: LiveChatHeaderProps) => {
  const router = useRouter();
  return (
    <View>
      <View className='bg-[#fbb040] p-6 items-center relative w-full rounded-bl-[50px] min-h-[170px]'>
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
        <View className='flex-row items-center justify-between w-full mt-auto'>
          <Text className='text-2xl font-semibold text-[#2B2B2B]'>
            Skyward Bliss
          </Text>
          <View className='flex-row gap-2'>
            <Image source={icons?.call} />
            <Image source={icons?.moreCircle} />
          </View>
        </View>
      </View>
      <View className='bg-gray-200 rounded-md px-4 py-1 my-3 max-w-fit mx-auto'>
        <Text className='text-center text-sm font-semibold text-[#757575]'>
          Today
        </Text>
      </View>
      <TouchableOpacity className='flex-row gap-3 bg-white rounded-xl p-2 border border-[#F2F2F2] px-3 py-4 w-[90%] max-w-[90%] overflow-hidden z-10 mx-auto mt-2'>
        <Image
          source={images?.rectangle}
          className='w-24 h-[110px] rounded-lg'
          accessibilityLabel={`Seamless Flight Booking Experience Package image`}
          resizeMode='cover'
        />
        <View className='flex-1'>
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

export default LiveChatHeader;
