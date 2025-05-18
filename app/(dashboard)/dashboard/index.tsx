import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const StatCard = ({
  title,
  value,
  subValue,
  date,
}: StatCardProps): JSX.Element => (
  <View className='bg-white w-[45%] m-2 p-4 rounded-xl'>
    <Text className='text-base mb-2'>{title}</Text>
    <View className='flex-row items-center mb-2'>
      <Text className='text-2xl font-bold mr-2'>{value}</Text>
      <Text className='text-base opacity-70'>{subValue}</Text>
    </View>
    <Text className='text-xs opacity-50'>{date}</Text>
  </View>
);

export default function Dashboard(): JSX.Element {
  const stats: StatCardProps[] = [
    {
      title: "Delivery",
      value: "350",
      subValue: "20",
      date: "Update Oct 20, 2023",
    },
    {
      title: "Purchase",
      value: "75",
      subValue: "295",
      date: "Update Oct 20, 2023",
    },
    {
      title: "Product",
      value: "150",
      subValue: "125",
      date: "Update Oct 20, 2023",
    },
    {
      title: "Service",
      value: "2",
      subValue: "5",
      date: "Update Oct 20, 2023",
    },
  ];

  return (
    <ScrollView className='flex-1'>
      <View className='flex-row justify-between items-center p-4'>
        <Text className='text-2xl font-bold'>Dashboard</Text>
        <TouchableOpacity className='bg-white px-4 py-2 rounded-lg'>
          <Text className='text-black'>View Shop</Text>
        </TouchableOpacity>
      </View>

      <View className='bg-black mx-4 p-4 rounded-xl'>
        <Text className='text-white text-lg font-bold mb-2'>
          The easiest way to increase sales up to 25 times.
        </Text>
        <Text className='text-white opacity-70 mb-4'>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
        <TouchableOpacity className='bg-white self-start px-4 py-2 rounded-lg'>
          <Text className='text-black font-bold'>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row flex-wrap p-2'>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>
    </ScrollView>
  );
}
