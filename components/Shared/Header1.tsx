import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const Header1 = () => {
  return (
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
        source={images?.rectangle4}
        className='rounded-xl absolute -bottom-[110%] w-full max-w-[94%] h[210px] mx-auto'
        accessibilityLabel='Eiffel Tower under cloudy sky with dramatic clouds, travel destination'
      />
    </View>
  );
};

export default Header1;
