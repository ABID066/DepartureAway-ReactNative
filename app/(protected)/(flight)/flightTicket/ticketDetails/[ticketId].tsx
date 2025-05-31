import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "@/constants/images";
import Header1 from "@/components/Shared/(Headers)/Header1";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getSingleFlightPackages } from "@/services/packagesServices";

const AgencyDetailsPage = () => {
  const [ticketClass, setTicketClass] = useState("Economy");
  const { ticketId } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: ["ticketDetails", "services", ticketId],
    queryFn: async () => await getSingleFlightPackages(ticketId as string),
  });
  const service = data?.data;
  return (
    <View className='w-full h-full bg-white overflow-y-auto overflow-x-hidden shadow-lg flex flex-col'>
      {<Header1 />}
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
            onPress={() => setTicketClass("Economy")}
            className={`${
              ticketClass == "Economy" && "bg-[#FF1A5A] rounded-full"
            } px-3 py-1`}>
            <Text
              className={`text-base ${
                ticketClass == "Economy" && "text-white font-semibold"
              }`}>
              Economy (${service?.economicPrice || "30"})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTicketClass("Business")}
            className={`${
              ticketClass == "Business" && "bg-[#FF1A5A] rounded-full"
            } px-3 py-1`}>
            <Text
              className={`text-base ${
                ticketClass == "Business" && "text-white font-semibold"
              }`}>
              Business (${service?.businessPrice || "50"})
            </Text>
          </TouchableOpacity>
        </View>
        <View className='border-b border-[#F2F2F2]'>
          <Text className='font-semibold text-[#212121] text-2xl leading-tight'>
            {service?.title ||
              "Seamless Flight Booking Experience Package, Economy"}
          </Text>
          <Text className='text-sm text-[#4F4F4F] leading-snug my-5'>
            {service?.description ||
              " Discover stress-free booking with our Economy Seamless Flight Booking Experience Package. Perfect for budget travelers, it combines value and convenience, offering personalized service and exclusive economy deals. Ensure a smooth start to your journey with the best deals, effortlessly."}
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
              {service?.rating}/5{" "}
              <Text className='text-[#828282] ml-8'>
                {" "}
                ({service?.totalReviews})
              </Text>
            </Text>
          </View>
        </View>
        <View className='flex-row gap-3 mt-auto pb-12'>
          <Link
            href={{
              pathname: "/flightTicket/order/[packageId]",
              params: { packageId: 1 },
            }}
            asChild>
            <TouchableOpacity className='border border-[#FF1A5A] rounded-full flex-grow px-4 py-[18px]'>
              <Text className='text-center text-base text-[#FF1A5A]'>
                Order
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/liveChat"} asChild>
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

export default AgencyDetailsPage;
