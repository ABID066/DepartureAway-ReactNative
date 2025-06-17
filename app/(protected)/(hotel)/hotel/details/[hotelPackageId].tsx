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

const HotelDetails = () => {
  const router = useRouter();
  const { hotelPackageId } = useLocalSearchParams();
  const { getSingleHotelPackage } = useServicePackages();
  const [hotelClass, setHotelClass] = useState("Basic Hotel");

  const isBasic = hotelClass === "Basic Hotel";
  const isStandard = hotelClass === "Standard Hotel";

  const { data, status } = useQuery({
    queryKey: ["hotelDetails", "services", hotelPackageId],
    queryFn: async () => await getSingleHotelPackage(hotelPackageId as string),
    enabled: !!hotelPackageId,
  });
  const service: HotelServiceData = data?.data;

  if (status === "pending") {
    return <ActivityIndicator size='large' color='#F13F5F' />;
  }

  return (
    <View className='w-full h-full bg-white overflow-y-auto overflow-x-hidden shadow-lg flex flex-col'>
      <View className='bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[158px]'>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/hotel"); // fallback to home
            }
          }}
          className='absolute left-[4%] top-11'>
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
        {status === "success" && (
          <>
            <View className='flex-row gap-3 text-xs font-semibold items-center pt-6 my-3 border-t border-[#F2F2F2]'>
              <TouchableOpacity
                onPress={() => setHotelClass("Basic Hotel")}
                className={`${
                  isBasic && "bg-[#FF1A5A] rounded-full"
                } px-3 py-1`}>
                <Text
                  className={`text-base ${
                    isBasic && "text-white font-semibold"
                  }`}>
                  Basic Hotel (${service?.basicPrice})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHotelClass("Standard Hotel")}
                className={`${
                  isStandard && "bg-[#FF1A5A] rounded-full"
                } px-3 py-1`}>
                <Text
                  className={`text-base ${
                    isStandard && "text-white font-semibold"
                  }`}>
                  Standard Hotel (${service?.standardPrice})
                </Text>
              </TouchableOpacity>
            </View>
            <View className='border-b border-[#F2F2F2]'>
              <Text className='font-semibold text-[#212121] text-2xl leading-tight'>
                {isBasic ? service?.title : service?.title1}
              </Text>
              <Text className='text-sm text-[#4F4F4F] leading-snug my-5'>
                {isBasic ? service?.description : service?.description1}
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
                  {service?.createdBy?.name || "Skyward Bliss"}
                </Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <FontAwesome name='star' size={18} color='#fbbf24' />
                <Text className='text-[#000000] font-medium text-xs'>
                  {service?.rating}/5{" "}
                  <Text className='text-[#828282] ml-8'>
                    {" "}
                    ({service?.totalReviews})
                  </Text>
                </Text>
              </View>
            </View>
          </>
        )}
        <View className='flex-row gap-3 mt-auto pb-12'>
          <Link
            href={{
              pathname: "/hotel/order/[id]",
              params: {
                id: hotelPackageId || "",
                hotelClass: hotelClass,
                hotelPackagePrice: isBasic
                  ? service?.basicPrice
                  : service?.standardPrice,
              },
            }}
            asChild>
            <TouchableOpacity className='border border-[#FF1A5A] rounded-full flex-grow px-4 py-[18px]'>
              <Text className='text-center text-base text-[#FF1A5A]'>
                Order
              </Text>
            </TouchableOpacity>
          </Link>
          <Link
            href={{
              pathname: "/chat/inbox-screen/[id]",
              params: {
                id: service?.createdBy?.id,
                name: service?.createdBy?.name,
                image: service?.createdBy?.image,
              },
            }}
            asChild>
            <TouchableOpacity className='bg-[#FF1A5A] rounded-full flex-grow px-4 py-[18px] shadow-lg'>
              <Text className='text-center text-white text-base font-semibold'>
                Chat
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelDetails;
