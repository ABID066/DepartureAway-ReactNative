import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Header2 from "../Shared/Header2";
import { FontAwesome5 } from "@expo/vector-icons";
import { icons } from "@/constants/icons";

const AddNewPaymentCardComponent = () => {
  return (
    <View className='w-full min-h-screen h-auto bg-white overflow-x-hidden shadow-lg'>
      {<Header2 />}
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: "white",
          alignItems: "center",
          paddingBottom: 40,
          minHeight: "95%",
        }}
        
        showsVerticalScrollIndicator={false}>
        <View className='w-full h-[239px] rounded-[44px] overflow-hidden bg-[#FF1A5A] shadow-[0_20px_40px_0px_rgba(255,26,90,0.24)] relative mt-24'>
          <View className='relative flex-1 p-6 justify-between text-white'>
            <View className='flex-row justify-end '>
              <Image
                source={icons?.exclude}
                className='w-[60px] h-[20px]'
                accessibilityLabel='Amazon logo in white on card top right'
                resizeMode='contain'
              />
            </View>
            <View className='flex justify-center space-x-3'>
              <Text className='text-white text-3xl font-semibold tracking-widest'>
                •••• •••• •••• ••••
              </Text>
            </View>
            <View className='flex flex-row justify-between font-light tracking-wide px-1'>
              <View>
                <Text className='text-white'>Card Holder name</Text>
                <Text className='mt-1 text-white'>•••• ••••</Text>
              </View>
              <View className='text-right'>
                <Text className='text-white'>Expiry date</Text>
                <Text className='mt-1 text-white'>•••/••</Text>
              </View>
              <View className='flex flex-row items-center space-x-1'>
                <Image source={icons?.group} />
              </View>
            </View>
          </View>
        </View>

        <View className='w-full mt-6 gap-6'>
          <View>
            <Text className='block mb-1 text-base text-[#212121] font-semibold'>
              Card Name
            </Text>
            <TextInput
              className='w-full rounded-lg bg-gray-100 text-gray-900 text-sm font-normal px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF1A5A]'
              placeholder='Samiul Islam'
              placeholderTextColor='#999'
            />
          </View>

          <View>
            <Text className='block mb-1 text-base text-[#212121] font-semibold'>
              Card Number
            </Text>
            <TextInput
              className='w-full rounded-lg bg-gray-100 text-gray-900 text-sm font-normal px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF1A5A]'
              placeholder='2672 4738 7837 7285'
              placeholderTextColor='#999'
              keyboardType='numeric'
            />
          </View>

          <View className='flex flex-row gap-5'>
            <View className='flex-1'>
              <Text className='block mb-1 text-base text-[#212121] font-semibold'>
                Expiry Date
              </Text>
              <View className='relative'>
                <TextInput
                  className='w-full rounded-lg bg-gray-100 text-gray-900 text-sm font-normal px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF1A5A]'
                  placeholder='MM/DD/YY'
                  placeholderTextColor='#999'
                  keyboardType='numeric'
                />
                <FontAwesome5
                  name='calendar-alt'
                  size={18}
                  color='#555'
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    marginTop: -9,
                  }}
                  accessibilityLabel='Calendar icon'
                />
              </View>
            </View>

            <View className='flex-1'>
              <Text className='block mb-1 text-base text-[#212121] font-semibold'>
                CVV
              </Text>
              <TextInput
                className='w-full rounded-lg bg-gray-100 text-gray-900 text-sm font-normal px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF1A5A]'
                placeholder='699'
                placeholderTextColor='#999'
                keyboardType='numeric'
                // secureTextEntry={true}
              />
            </View>
          </View>

          <TouchableOpacity
            className='w-full bg-[#FF1A5A] active:bg-[#FF1A5A] text-white font-semibold text-sm rounded-[100px] py-5 mt-6 shadow-[4px_8px_24px_0px_rgba(255,31,87,0.5)]'
            accessibilityRole='button'>
            <Text className='text-center text-white font-semibold text-base'>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewPaymentCardComponent;
