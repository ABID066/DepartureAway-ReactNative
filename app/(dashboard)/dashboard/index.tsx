import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const StatCard = ({
  title,
  value,
  subValue,
  date,
  bgColor,
}: StatCardProps): JSX.Element => (
  <View
    className={`${bgColor} m-2 p-4 rounded-xl items-center justify-between`}>
    <View className='flex-row items-center mb-2'>
      <Text className='text-2xl font-bold mr-2'>{value}</Text>
      <Text className='text-base opacity-70'>{subValue}</Text>
    </View>
    <Text className='text-xs opacity-50'>{date}</Text>
    <Text className='text-base mb-2'>{title}</Text>
  </View>
);

export default function Dashboard(): JSX.Element {
  const router = useRouter();
  const stats: StatCardProps[] = [
    {
      title: "Total Services",
      value: "3",
      subValue: "",
      date: "",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Services",
      value: "2",
      subValue: "",
      date: "",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Orders",
      value: "5",
      subValue: "",
      date: "",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Revenue",
      value: "$1,240",
      subValue: "",
      date: "",
      bgColor: "bg-purple-50",
    },
    {
      title: "New Customers",
      value: "15",
      subValue: "",
      date: "",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <ScrollView className='flex-1'>
      <View className='flex-row justify-between items-center p-4'>
        <Text className='text-2xl font-bold'>Dashboard</Text>
        <View className='flex-row items-center'>
          <TouchableOpacity className='mr-4'>
            <Ionicons name='notifications-outline' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/chat/inbox-screen")}
            className='mr-4'>
            <Ionicons name='chatbox-outline' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity className='bg-white px-4 py-2 rounded-lg mr-4'>
            <Text className='text-black'> + View Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name='account-circle' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <View className='bg-black mx-4 p-4 rounded-xl my-6'>
        <Text className='text-white text-lg font-bold mb-2'>
          Welcome to the Dashboard
        </Text>
        <Text className='text-white opacity-70 mb-4'>
          Monitor your business statistics and manage your services from here.
        </Text>
      </View>

      {/* Old One */}
      {/* <View className='bg-black mx-4 p-4 rounded-xl'>
        <Text className='text-white text-lg font-bold mb-2'>
          The easiest way to increase sales up to 25 times.
        </Text>
        <Text className='text-white opacity-70 mb-4'>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
        <TouchableOpacity className='bg-white self-start px-4 py-2 rounded-lg'>
          <Text className='text-black font-bold'>Get Started</Text>
        </TouchableOpacity>
      </View> */}

      <View className='flex-row flex-wrap '>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>

      {/* Placeholder for Charts */}
      <View className='m-4 p-4 bg-white rounded-xl'>
        <Text className='text-center text-lg font-bold'>Charts Section</Text>
        {/* Add chart components here */}
      </View>

      <View className='flex-row justify-between p-2 flex-wrap'>
        <TouchableOpacity
          onPress={() => router.push("/dashboard/services/add-new-service")}
          className='bg-white flex-1 m-2 p-4 rounded-xl'>
          <Text className='text-center'>Add Service</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-white flex-1 m-2 p-4 rounded-xl'>
          <Text className='text-center'>View Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-white flex-1 m-2 p-4 rounded-xl'>
          <Text className='text-center'>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-white flex-1 m-2 p-4 rounded-xl'>
          <Text className='text-center'>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
