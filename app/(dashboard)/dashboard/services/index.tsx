import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";


const mockServices: Service[] = [
  {
    id: "1",
    title: "Economy Flight to Dubai",
    category: "flight",
    basicPrice: 300,
    standardPrice: 450,
    premiumPrice: 650,
  },
  {
    id: "2",
    title: "5-Star Hotel in Paris",
    category: "hotel",
    basicPrice: 200,
    standardPrice: 350,
    premiumPrice: 500,
  },
  {
    id: "3",
    title: "Guided Tour of Rome",
    category: "tour",
    basicPrice: 75,
    standardPrice: 120,
    premiumPrice: 180,
  },
];

const AllServices = () => {
  return (
    <View className='flex-1 bg-white p-4'>
      <View className='flex-row justify-between items-center mb-6'>
        <Text className='text-2xl font-bold'>All Services</Text>
        <Link href='./dashboard/services/add-service' asChild>
          <TouchableOpacity className='bg-[#FF1A5A] px-4 py-2 rounded-lg'>
            <Text className='text-white font-medium'>+ Create New Service</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView
        className='flex'
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View className='min-w-[1000px]'>
          {/* Table Header */}
          <View className='flex-row bg-gray-50 border border-gray-200 rounded-t-md gap-1'>
            <View className='w-[30%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>TITLE</Text>
            </View>
            <View className='w-[12%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                CATEGORY
              </Text>
            </View>
            <View className='w-[12%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                BASIC PRICE
              </Text>
            </View>
            <View className='w-[15%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                STANDARD PRICE
              </Text>
            </View>
            <View className='w-[15%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                PREMIUM PRICE
              </Text>
            </View>
            <View className='w-[10%] px-4 py-3'>
              <Text className='font-medium text-gray-600 text-base'>
                ACTIONS
              </Text>
            </View>
          </View>

          {/* Table Body */}
          <ScrollView>
            {mockServices.map((service) => (
              <View
                key={service.id}
                className='flex-row border border-t-0 border-gray-100 gap-1'>
                <View className='w-[30%] px-4 py-3'>
                  <Text className='font-medium text-base'>{service.title}</Text>
                </View>
                <View className='w-[12%] px-4 py-3'>
                  <Text className='text-gray-600 text-base'>
                    {service.category}
                  </Text>
                </View>
                <View className='w-[12%] px-4 py-3'>
                  <Text className='text-gray-600 text-base'>
                    ${service.basicPrice}
                  </Text>
                </View>
                <View className='w-[15%] px-4 py-3'>
                  <Text className='text-gray-600 text-base'>
                    ${service.standardPrice}
                  </Text>
                </View>
                <View className='w-[15%] px-4 py-3'>
                  <Text className='text-gray-600 text-base'>
                    ${service.premiumPrice}
                  </Text>
                </View>
                <View className='w-[10%] px-4 py-3 flex-row gap-4'>
                  <TouchableOpacity>
                    <Text className='text-blue-500 text-base'>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text className='text-red-500 text-base'>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default AllServices;
