import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const mockChats: ChatItem[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "2:30 PM",
    avatar: "https://i.pravatar.cc/150?img=1",
    unread: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "The flight is confirmed",
    time: "1:45 PM",
    avatar: "https://i.pravatar.cc/150?img=2",
    unread: 0,
    isOnline: false,
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    lastMessage: "Great! See you tomorrow",
    time: "11:20 AM",
    avatar: "https://i.pravatar.cc/150?img=3",
    unread: 1,
    isOnline: true,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=4",
    unread: 0,
    isOnline: false,
    lastActive: "1 day ago",
  },
  {
    id: "5",
    name: "David Brown",
    lastMessage: "Let me check the schedule",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=5",
    unread: 3,
    isOnline: true,
  },
];

const InboxScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleBackPress = () => {
    router.push("/dashboard");
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      className='flex-row items-center p-4 border-b border-gray-100'
      onPress={() =>
        router.push({
          pathname: "/chat/inbox-screen/[id]",
          params: { id: item?.id },
        })
      }>
      <View className='relative'>
        <Image
          source={{ uri: item.avatar }}
          className='w-12 h-12 rounded-full'
        />
        {item.isOnline && (
          <View className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />
        )}
      </View>
      <View className='flex-1 ml-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='font-semibold text-base'>{item.name}</Text>
          <Text className='text-gray-500 text-sm'>{item.time}</Text>
        </View>
        <View className='flex-row justify-between items-center mt-1'>
          <View className='flex-row items-center'>
            <Text className='text-gray-500 text-sm' numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {!item.isOnline && item.lastActive && (
              <Text className='text-gray-400 text-xs ml-2'>
                · {item.lastActive}
              </Text>
            )}
          </View>
          {item.unread > 0 && (
            <View className='bg-[#FF1A5A] rounded-full w-5 h-5 items-center justify-center'>
              <Text className='text-white text-xs'>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 bg-white'>
      <View className='p-4 border-b border-gray-100'>
        <View className='flex-row items-center mb-4'>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name='arrow-back' size={24} color='#000' />
          </TouchableOpacity>
          <Text className='text-xl font-semibold ml-4'>Messages</Text>
        </View>
        <View className='flex-row items-center bg-gray-50 rounded-full px-4 py-2'>
          <MaterialIcons name='search' size={24} color='#666' />
          <TextInput
            className='flex-1 ml-2 text-base'
            placeholder='Search messages'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={mockChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default InboxScreen;
