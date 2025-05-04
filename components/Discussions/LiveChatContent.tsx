import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const LiveChatContent = () => {
  const conversation = [
    {
      messageId: "01",
      messageText:
        "Hello, I'm looking to book a flight from Dubai to Dhaka on Thursday, 29th March. Could you provide information on flight availability, times, duration, pricing, luggage allowance, and any travel requirements? Thanks for your help! Best, Samiul Islam",
      messageFrom: "user",
      messageTo: "customerCare",
      messageTime: "16:00",
      seen: true,
    },
    {
      messageId: "02",
      messageText:
        "Do you come up with an airline name that you feel comfortable going to?",
      messageFrom: "customerCare",
      messageTo: "user",
      messageTime: "16:01",
      seen: true,
    },
    {
      messageId: "03",
      messageText: "No, but could you offer me a cheaper rate, please?",
      messageFrom: "user",
      messageTo: "customerCare",
      messageTime: "16:01",
      seen: true,
    },
    {
      messageId: "04",
      messageText: "Let me See , Sir ",
      messageFrom: "customerCare",
      messageTo: "user",
      messageTime: "16:02",
      seen: true,
    },
  ];
  return (
    <View className='p-6'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='h-[41vh] overflow-y-auto'>
        {conversation?.length &&
          conversation.map((message, i) => (
            <View
              className={`py-4 px-6 max-w-[80%] flex-row gap-2 mt-5 ${
                message?.messageFrom === "user"
                  ? "bg-[#FF1A5A] ml-auto rounded-[20px_20px_8px_20px]"
                  : "bg-[#F5F5F5] rounded-[8px_20px_20px_20px]"
              }`}
              key={i + 1}>
              <View className='flex-1 flex-row'>
                <Text
                  className={`text-sm font-normal ${
                    message?.messageFrom === "user" ? "text-white" : ""
                  }`}>
                  {message?.messageText}
                </Text>
              </View>
              <View className='flex-row items-end gap-1'>
                <Text
                  className={`text-xs font-medium ${
                    message?.messageFrom === "user"
                      ? "text-white"
                      : "text-[#9E9E9E]"
                  }`}>
                  {message?.messageTime}
                </Text>
                {message?.messageFrom === "user" && (
                  <Image className='size-4' source={icons?.readIcon} />
                )}
              </View>
            </View>
          ))}
      </ScrollView>
      <View className='flex-row py-2 items-center bg-white gap-3'>
        <View className='flex-row flex-1 items-center bg-[#FAFAFA] px-5 gap-3 justify-between'>
          <Image source={icons?.smileIcon} />
          <TextInput className="flex-1" placeholder='Type a message' />
          <Image source={icons?.attachIcon} />
        </View>
        <TouchableOpacity className="size-14 items-center justify-center bg-[#FF1A5A] rounded-full">
          <Image source={icons?.send} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveChatContent;
