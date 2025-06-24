import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useServicePackages } from "@/hooks/useServicePackages";
import { useQuery } from "@tanstack/react-query";

const GuiderDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getSingleGuiderService } = useServicePackages();
  const [rateType, setRateType] = useState("Hourly");

  const isHourly = rateType === "Hourly";
  const isDaily = rateType === "Daily";

  const { data, status } = useQuery({
    queryKey: ["guiderDetails", id],
    queryFn: async () => await getSingleGuiderService(id as string),
    enabled: !!id,
  });
  const guider: GuiderServiceData = data?.data;

  if (status === "pending") {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#F13F5F' />
      </View>
    );
  }

  // Static reviews to show when no reviews exist
  const staticReviews = [
    {
      text: "This guider provided excellent service with deep knowledge of local culture and history. Highly recommended for first-time visitors.",
      author: "Alex T.",
    },
    {
      text: "Professional and friendly guide who customized our tour based on our interests. Made our trip memorable!",
      author: "Sarah K.",
    },
  ];

  return (
    <View className='w-full h-full bg-white'>
      {/* Header with back button and logo */}
      <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[158px]'>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/guider");
            }
          }}
          className='absolute left-[4%] top-11'>
          <Image source={icons?.arrowLeft} className='w-6 h-6' />
        </TouchableOpacity>
        <Image
          source={images?.logo}
          className='w-[162px] h-[46px] mt-3'
          accessibilityLabel='Departure Away logo'
        />
        {/* Guider main image */}
        <Image
          source={
            guider?.imageUrl?.[0] ? { uri: guider.imageUrl[0] } : images?.logo
          }
          className='rounded-xl absolute -bottom-[110%] w-[90%] h-[210px] mx-auto z-10'
          resizeMode='stretch'
          accessibilityLabel='Guider profile image'
        />
      </View>

      {/* Main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='px-6 flex-1 mt-[130px]'
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View className='flex-row justify-between items-center mb-4 mt-12'>
          <Text className='text-base text-[#4F4F4F]'>
            Customer Satisfaction
          </Text>
          <View className='flex-row items-center border border-green-600 rounded-full px-3 py-1'>
            <View className='w-2.5 h-2.5 bg-green-600 rounded-full mr-2' />
            <Text className='text-green-600 font-semibold'>
              {guider?.available ? "Available" : "Not Available"}
            </Text>
          </View>
        </View>

        {/* Reviews - Show static reviews if no reviews exist */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className='mb-4'>
          {(guider?.totalReviews
            ? [...Array(Math.min(2, guider.totalReviews))]
            : staticReviews
          ).map((_, i) => (
            <View
              key={i}
              className='bg-white rounded-xl shadow-md px-5 py-4 w-80 mr-3'>
              <Text className='text-xs text-[#000000] text-center font-light'>
                {guider?.totalReviews
                  ? "Review content would be here"
                  : staticReviews[i].text}
              </Text>
              <Text className='font-medium text-base text-center my-3'>
                {guider?.totalReviews ? "User" : staticReviews[i].author}
              </Text>
              <View className='flex-row gap-0.5 justify-center'>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome
                    key={i}
                    name='star'
                    size={10}
                    color={i < (guider?.rating || 5) ? "#FF1A5A" : "#D1D5DB"}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        {status === "success" && (
          <>
            {/* Rate type selection */}
            <View className='flex-row gap-3 items-center pt-6 my-3 border-t border-[#F2F2F2]'>
              <TouchableOpacity
                onPress={() => setRateType("Hourly")}
                className={`${
                  isHourly ? "bg-[#FF1A5A]" : "bg-gray-100"
                } rounded-full px-4 py-2`}>
                <Text
                  className={`text-base ${
                    isHourly ? "text-white" : "text-gray-800"
                  } font-semibold`}>
                  Hourly (${guider?.hourlyRate || "0"})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRateType("Daily")}
                className={`${
                  isDaily ? "bg-[#FF1A5A]" : "bg-gray-100"
                } rounded-full px-4 py-2`}>
                <Text
                  className={`text-base ${
                    isDaily ? "text-white" : "text-gray-800"
                  } font-semibold`}>
                  Daily (${guider?.dailyRate || "0"})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Guider details */}
            <View className='border-b border-[#F2F2F2] pb-4'>
              <Text className='font-semibold text-[#212121] text-2xl mb-2'>
                {guider?.name}
              </Text>
              <Text className='text-sm text-[#4F4F4F] mb-3'>
                {guider?.bio ||
                  "Professional local guide with extensive knowledge"}
              </Text>

              <View className='flex-row flex-wrap gap-2 my-3'>
                <View className='bg-gray-100 rounded-full px-3 py-1'>
                  <Text className='text-xs text-gray-800'>
                    Location: {guider?.location || "Location not specified"}
                  </Text>
                </View>
                <View className='bg-gray-100 rounded-full px-3 py-1'>
                  <Text className='text-xs text-gray-800'>
                   Experience: {guider?.experience || "Experience not specified"} years
                  </Text>
                </View>
                <View className='bg-gray-100 rounded-full px-3 py-1'>
                  <Text className='text-xs text-gray-800'>
                    Specialty: {guider?.specialty || "Specialty not specified"}
                  </Text>
                </View>
              </View>

              <View className='mt-3'>
                <Text className='font-medium text-[#4F4F4F] mb-1'>
                  Speaking Languages:
                </Text>
                <View className='flex-row flex-wrap gap-2'>
                  {guider?.languages?.length ? (
                    guider.languages.map((lang, i) => (
                      <View
                        key={i}
                        className='bg-[#FF1A5A] rounded-full px-3 py-1'>
                        <Text className='text-xs text-white'>{lang}</Text>
                      </View>
                    ))
                  ) : (
                    <Text className='text-xs text-gray-500'>
                      No languages specified
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Verification badge */}
            <View className='py-4 gap-2'>
              <View className='flex-row items-center gap-2'>
                <Image
                  source={
                    guider?.createdBy?.image
                      ? { uri: guider.createdBy.image }
                      : images?.ellipse
                  }
                  className='w-8 h-8 rounded-full'
                  accessibilityLabel='Provider logo'
                />
                <View>
                  <Text className='font-medium text-lg text-[#4F4F4F]'>
                    {guider?.createdBy?.name || "Departure Away"}
                  </Text>
                  {guider?.isVerified && (
                    <View className='flex-row items-center'>
                      <FontAwesome
                        name='check-circle'
                        size={14}
                        color='#10B981'
                      />
                      <Text className='text-green-600 text-xs ml-1'>
                        Verified Guider
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View className='flex-row items-center gap-2 pb-12'>
                <FontAwesome name='star' size={18} color='#fbbf24' />
                <Text className='text-[#000000] font-medium text-xs'>
                  {guider?.rating || 5}/5
                  <Text className='text-[#828282] ml-2'>
                    ({guider?.totalReviews || 0} reviews)
                  </Text>
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View className='absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100'>
        <View className='gap-3'>
          <Link
            href={{
              pathname: "/",
              params: {
                id: id as string,
                rateType: rateType,
                rate: isHourly ? guider?.hourlyRate : guider?.dailyRate,
                guiderName: guider?.name,
              },
            }}
            asChild>
            <TouchableOpacity className='border border-[#FF1A5A] rounded-full flex-1 px-4 py-3'>
              <Text className='text-center text-base text-[#FF1A5A] font-semibold'>
                Book Now
              </Text>
            </TouchableOpacity>
          </Link>
          <Link
            href={{
              pathname: "/chat/inbox-screen/[id]",
              params: {
                id: guider?.createdBy?.id,
                name: guider?.createdBy?.name,
                image: guider?.createdBy?.image,
              },
            }}
            asChild>
            <TouchableOpacity className='bg-[#FF1A5A] rounded-full flex-1 px-4 py-3 shadow-md'>
              <Text className='text-center text-white text-base font-semibold'>
                Chat with Service Creator
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default GuiderDetails;
