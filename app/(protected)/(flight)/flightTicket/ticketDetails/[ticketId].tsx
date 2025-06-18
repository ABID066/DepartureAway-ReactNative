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
import { images } from "@/constants/images";
import Header1 from "@/components/Shared/(Headers)/Header1";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useServicePackages } from "@/hooks/useServicePackages";

const TicketDetailsPage = () => {
  const { getSingleFlightPackage } = useServicePackages();
  const [ticketClass, setTicketClass] = useState("Economy");
  const { ticketId } = useLocalSearchParams();

  const { data, status } = useQuery({
    queryKey: ["ticketDetails", "services", ticketId],
    queryFn: async () => await getSingleFlightPackage(ticketId as string),
    enabled: !!ticketId,
  });
  const service: FlightServiceData = data?.data;

  if (status === "pending") {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#F13F5F' />
      </View>
    );
  }

  return (
    <View className='w-full h-full bg-white'>
      {/* Header with image */}
      <View className='mb-24 pb-12'>
        <Header1 img={service?.imageUrl?.[0] as string} />
      </View>

      {/* Main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='px-6 flex-1 mt-4'
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View className='flex-row justify-between items-center mb-4 mt-6'>
          <Text className='text-base text-[#4F4F4F]'>
            Customer Satisfaction
          </Text>
          <View className='flex-row items-center border border-green-600 rounded-full px-3 py-1'>
            <View className='w-2.5 h-2.5 bg-green-600 rounded-full mr-2' />
            <Text className='text-green-600 font-semibold'>Online</Text>
          </View>
        </View>

        {/* Testimonials */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className='mb-4'>
          {[...Array(2)].map((_, i) => (
            <View
              key={i}
              className='bg-white rounded-xl shadow-md px-5 py-4 w-80 mr-3'>
              <Text className='text-xs text-[#000000] text-center font-light'>
                Skyward Bliss delivered a seamless booking experience with
                standout customer service and valuable perks like priority
                check-in.
              </Text>
              <Text className='font-medium text-base text-center my-3'>
                Jordan M.
              </Text>
              <View className='flex-row gap-0.5 justify-center'>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name='star' size={10} color='#FF1A5A' />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Ticket class selection */}
        <View className='flex-row gap-3 items-center pt-6 my-3 border-t border-[#F2F2F2]'>
          <TouchableOpacity
            onPress={() => setTicketClass("Economy")}
            className={`${
              ticketClass === "Economy" ? "bg-[#FF1A5A]" : "bg-gray-100"
            } rounded-full px-4 py-2`}>
            <Text
              className={`text-base ${
                ticketClass === "Economy" ? "text-white" : "text-gray-800"
              } font-semibold`}>
              Economy (${service?.economicPrice || "0"})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTicketClass("Business")}
            className={`${
              ticketClass === "Business" ? "bg-[#FF1A5A]" : "bg-gray-100"
            } rounded-full px-4 py-2`}>
            <Text
              className={`text-base ${
                ticketClass === "Business" ? "text-white" : "text-gray-800"
              } font-semibold`}>
              Business (${service?.businessPrice || "0"})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ticket description */}
        <View className='border-b border-[#F2F2F2] pb-4'>
          <Text className='font-semibold text-[#212121] text-2xl mb-3'>
            {ticketClass === "Economy"
              ? service?.title
              : service?.title1 ||
                "Seamless Flight Booking Experience Package, Economy"}
          </Text>
          <Text className='text-sm text-[#4F4F4F]'>
            {ticketClass === "Economy"
              ? service?.description
              : service?.description1 ||
                "Discover stress-free booking with our Economy Seamless Flight Booking Experience Package. Perfect for budget travelers, it combines value and convenience, offering personalized service and exclusive economy deals. Ensure a smooth start to your journey with the best deals, effortlessly."}
            <Text className='text-[#FF1A5A]'> See More</Text>
          </Text>
        </View>

        {/* Provider info */}
        <View className='py-6 gap-2'>
          <View className='flex-row items-center gap-2'>
            <Image
              source={
                service?.createdBy?.image
                  ? { uri: service.createdBy.image }
                  : images?.rectangle
              }
              className='w-8 h-8 rounded-full'
              accessibilityLabel='Provider logo'
            />
            <Text className='font-medium text-lg text-[#4F4F4F]'>
              {service?.createdBy?.name || "Skyward Bliss"}
            </Text>
          </View>
          <View className='flex-row items-center gap-2'>
            <FontAwesome name='star' size={18} color='#fbbf24' />
            <Text className='text-[#000000] font-medium text-xs'>
              {service?.rating}/5
              <Text className='text-[#828282] ml-2'>
                ({service?.totalReviews} reviews)
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View className='absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100'>
        <View className='flex-row gap-3'>
          <Link
            href={{
              pathname: "/flightTicket/order/[packageId]",
              params: {
                packageId: ticketId as string,
                ticketClass: ticketClass,
                ticketPrice:
                  ticketClass === "Economy"
                    ? service?.economicPrice
                    : service?.businessPrice,
              },
            }}
            asChild>
            <TouchableOpacity className='border border-[#FF1A5A] rounded-full flex-1 px-4 py-3'>
              <Text className='text-center text-base text-[#FF1A5A] font-semibold'>
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
            <TouchableOpacity className='bg-[#FF1A5A] rounded-full flex-1 px-4 py-3 shadow-md'>
              <Text className='text-center text-white text-base font-semibold'>
                Chat
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default TicketDetailsPage;
