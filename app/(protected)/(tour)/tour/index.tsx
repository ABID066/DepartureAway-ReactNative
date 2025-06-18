import React, { useState } from "react";
import TravelPackagesSection from "@/components/Home/TravelPackage";
import {
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

const TourServices = () => {
  const [activePackageTab, setActivePackageTab] = useState("Traveler Choose");

  const sections = [
    {
      title: "header",
      data: [null],
      renderItem: () => <TourHeader />,
    },
    {
      title: "packages",
      data: [null],
      renderItem: () => (
        <TravelPackagesSection
          title='All Tour Services'
          activePackageTab={activePackageTab}
          setActivePackageTab={setActivePackageTab}
        />
      ),
    },
  ];

  return (
    <SafeAreaView className='flex-1 bg-[#FAFAFA]'>
      <SectionList
        sections={sections}
        renderItem={({ section }) => section.renderItem()}
        renderSectionHeader={() => null}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

const TourHeader = () => {
  const router = useRouter();
  return (
    <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[180px] md:min-h-[200px] mb-20'>
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
          Search Your Tour Place
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
  );
};

export default TourServices;
