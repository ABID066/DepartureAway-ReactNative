import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";

const Header1 = ({ img }: { img?: string }) => {
  const router = useRouter();
  return (
    <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[180px] md:min-h-[200px]'>
      <TouchableOpacity
        className='absolute left-[4%] top-11'
        onPress={() => router.back()}>
        <Image source={icons?.arrowLeft} className='w-6 h-6' />
      </TouchableOpacity>

      <Image
        source={images?.logo}
        className='w-[40%] max-w-[162px] h-[46px] mt-3'
        accessibilityLabel='Departure Away logo, stylized pink and orange circle with text Departure Away'
        resizeMode='contain'
      />

      <Image
        source={img && img ? { uri: img } : images?.rectangle4}
        className='rounded-xl absolute -bottom-[80%] w-[94%] max-w-[94%] h-[200px] md:h-[210px] mx-auto z-10'
        accessibilityLabel='Flight destination image'
        resizeMode='stretch'
      />
    </View>
  );
};

export default Header1;
