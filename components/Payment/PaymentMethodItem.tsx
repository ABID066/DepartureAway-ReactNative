import { icons } from "@/constants/icons";
import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";

interface Props {
  method: PaymentMethod;
  selectedMethod?: string;
  setSelectedMethod: (method: string) => void; // Fixed the type to be a function
}

const PaymentMethodItem = ({
  method,
  selectedMethod,
  setSelectedMethod,
}: Props) => (
  <TouchableOpacity
    onPress={() => setSelectedMethod(method?.name || "")}
    className='flex flex-row items-center justify-between p-6 w-full bg-white rounded-[20px] shadow-[0px_4px_60px_0px] shadow-[rgba(4,6,15,0.05)] gap-16'>
    <View className='flex-row items-center gap-4'>
      <Image source={method?.logo} className='size-8' />
      <Text className='text-[#212121]'>{method?.name}</Text>
    </View>
    <Image
      className='size-5'
      source={
        selectedMethod == method?.name ? icons.selected : icons?.unselected
      }
    />
  </TouchableOpacity>
);

export default PaymentMethodItem;
