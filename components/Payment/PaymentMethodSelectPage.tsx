import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";
import PaymentMethodItem from "@/components/Payment/PaymentMethodItem";
import Header2 from "../Shared/(Headers)/Header2";
import { Link } from "expo-router";

const paymentMethods: PaymentMethod[] = [
  { id: "1", name: "PayPal", logo: icons?.frame1 },
  { id: "2", name: "Google Pay", logo: icons?.frame2 },
  { id: "3", name: "Apple Pay", logo: icons?.frame3 },
];

const PaymentMethodSelectPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("PayPal");
  return (
    <View className='w-full min-h-screen h-auto bg-white overflow-x-hidden shadow-lg  flex-col'>
      {<Header2 />}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: 100,
        }}
        showsVerticalScrollIndicator={false}
        className='p-5 max-h-[80vh]'>
        <Text className='text-base font-normal text-[#212121]  pb-3 text-justify mx-auto'>
          Select the payment method you want to use.
        </Text>
        <View className='gap-8'>
          {paymentMethods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          ))}
          <Link href={"/payment/addNewPaymentCard"} asChild>
            <TouchableOpacity
              className='bg-[#FF1A5A1A] py-[18px] px-4 rounded-[100px]'
              onPress={() => {
                /* navigation logic */
              }}>
              <Text className='text-center text-[#FF1A5A]'>Add New Card</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View className='py-28'>
          <Link href={"/payment/addNewPaymentCard"} asChild>
            <TouchableOpacity className='bg-[#FF1A5A] rounded-full py-5'>
              <Text className='text-white text-center font-semibold text-base'>
                Continue
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentMethodSelectPage;
