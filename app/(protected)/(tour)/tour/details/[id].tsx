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

const TourDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getSingleTravelPackage } = useServicePackages();
  const [tourPackageClass, setTourPackageClass] = useState("Basic Package");

  const isBasic = tourPackageClass === "Basic Package";
  const isStandard = tourPackageClass === "Standard Package";

  const { data, status } = useQuery({
    queryKey: ["tourDetails", "services", id],
    queryFn: async () => await getSingleTravelPackage(id as string),
    enabled: !!id,
  });
  const service: TravelServiceData = data?.data;

  if (status === "pending") {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#F13F5F" />
      </View>
    );
  }

  return (
    <View className="w-full h-full bg-white">
      <View className="bg-[#fbb040] p-4 flex-row justify-center relative w-full rounded-bl-[50px] min-h-[158px]">
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/tour");
            }
          }}
          className="absolute left-[4%] top-11"
        >
          <Image source={icons?.arrowLeft} className="w-6 h-6" />
        </TouchableOpacity>
        <Image
          source={images?.logo}
          className="w-[162px] h-[46px] mt-3"
          accessibilityLabel="Departure Away logo"
        />
      </View>

      {/* Main Image */}
      <View className="px-4 -mt-20 mb-4">
        <Image
          source={
            service?.imageUrl?.[0]
              ? { uri: service.imageUrl[0] }
              : images?.rectangle4
          }
          className="w-[94%] h-48 rounded-xl mx-auto"
          resizeMode="stretch"
          accessibilityLabel="Tour destination image"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="flex-row justify-between items-center mb-4 mt-6">
          <Text className="text-base text-[#4F4F4F]">
            Customer Satisfaction
          </Text>
          <View className="flex-row items-center border border-green-600 rounded-full px-3 py-1">
            <View className="w-2.5 h-2.5 bg-green-600 rounded-full mr-2" />
            <Text className="text-green-600 font-semibold">Online</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {[...Array(2)].map((_, i) => (
            <View
              key={i}
              className="bg-white rounded-xl shadow-md px-5 py-4 w-80 mr-3"
            >
              <Text className="text-xs text-[#000000] text-center font-light">
                Skyward Bliss delivered a seamless booking experience with
                standout customer service and valuable perks like priority
                check-in.
              </Text>
              <Text className="font-medium text-base text-center my-3">
                Jordan M.
              </Text>
              <View className="flex-row gap-0.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={10} color="#FF1A5A" />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        {status === "success" && (
          <>
            <View className="flex-row gap-1 items-center my-4 border-t border-[#F2F2F2] pt-4">
              <TouchableOpacity
                onPress={() => setTourPackageClass("Basic Package")}
                className={`${
                  isBasic ? "bg-[#FF1A5A]" : "bg-gray-100"
                } rounded-full px-4 py-2`}
              >
                <Text
                  className={`text-base ${
                    isBasic ? "text-white" : "text-gray-800"
                  } font-semibold`}
                >
                  Basic Package (${service?.price1})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTourPackageClass("Standard Package")}
                className={`${
                  isStandard ? "bg-[#FF1A5A]" : "bg-gray-100"
                } rounded-full px-4 py-2`}
              >
                <Text
                  className={`text-base ${
                    isStandard ? "text-white" : "text-gray-800"
                  } font-semibold`}
                >
                  Standard Package (${service?.price2})
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mb-6">
              <Text className="font-semibold text-[#212121] text-2xl mb-2">
                {service?.title}
              </Text>
              <Text className="text-sm text-[#4F4F4F]">
                {service?.description}
                <Text className="text-[#FF1A5A]"> See More</Text>
              </Text>
            </View>

            <View className="py-4 gap-2 mb-6">
              <View className="flex-row items-center gap-2 mb-2">
                <Image
                  source={
                    service?.createdBy?.image
                      ? { uri: service.createdBy.image }
                      : images?.ellipse
                  }
                  className="w-8 h-8 rounded-full"
                />
                <Text className="font-medium text-lg text-[#4F4F4F]">
                  {service?.createdBy?.name || "Skyward Bliss"}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome name="star" size={18} color="#fbbf24" />
                <Text className="text-[#000000] font-medium text-xs">
                  {service?.rating}/5
                  <Text className="text-[#828282] ml-2">
                    ({service?.totalReviews} reviews)
                  </Text>
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Fixed bottom buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-100">
        <View className="flex-row gap-3">
          <Link
            href={{
              pathname: "/hotel/order/[id]",
              params: {
                id: id as string,
                tourPackageClass: tourPackageClass,
                tourPackagePrice: isBasic ? service?.price1 : service?.price2,
              },
            }}
            asChild
          >
            <TouchableOpacity className="border border-[#FF1A5A] rounded-full flex-1 px-4 py-3">
              <Text className="text-center text-base text-[#FF1A5A] font-semibold">
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
            asChild
          >
            <TouchableOpacity className="bg-[#FF1A5A] rounded-full flex-1 px-4 py-3 shadow-md">
              <Text className="text-center text-white text-base font-semibold">
                Chat
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default TourDetails;