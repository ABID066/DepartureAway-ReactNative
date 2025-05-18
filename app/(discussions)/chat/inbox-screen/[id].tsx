import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
}


const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey, how are you?",
    time: "2:30 PM",
    isSent: false,
  },
  {
    id: "2",
    text: "I'm good, thanks! How about you?",
    time: "2:31 PM",
    isSent: true,
  },
  {
    id: "3",
    text: "Just finished my meeting",
    time: "2:32 PM",
    isSent: false,
  },
  {
    id: "4",
    text: "That's great! How did it go?",
    time: "2:33 PM",
    isSent: true,
  },
  {
    id: "5",
    text: "It went really well. We got approval for the new project!",
    time: "2:34 PM",
    isSent: false,
  },
];

const mockUsers:ChatUser[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    isOnline: false,
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOnline: true,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    isOnline: false,
    lastActive: "1 day ago",
  },
  {
    id: "5",
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=5",
    isOnline: true,
  },
];

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const user = mockUsers.find((user) => user.id === id) as ChatUser;

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`flex-row ${
        item.isSent ? "justify-end" : "justify-start"
      } mb-4`}>
      <View
        className={`rounded-2xl px-4 py-2 max-w-[80%] ${
          item.isSent ? "bg-[#FF1A5A]" : "bg-gray-100"
        }`}>
        <Text
          className={`text-base ${item.isSent ? "text-white" : "text-black"}`}>
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            item.isSent ? "text-white/70" : "text-gray-500"
          }`}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  const sendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      className='flex-1 bg-white'
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* Header */}
      <View className='p-4 border-b border-gray-100'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center flex-1'>
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons name='arrow-back' size={24} color='#000' />
            </TouchableOpacity>
            <View className='flex-row items-center ml-4'>
              <View className='relative'>
                <Image
                  source={{ uri: user?.avatar }}
                  className='w-10 h-10 rounded-full'
                />
                {user?.isOnline && (
                  <View className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
                )}
              </View>
              <View className='ml-3'>
                <Text className='text-lg font-semibold'>{user.name}</Text>
                <Text className='text-sm text-gray-500'>
                  {user.isOnline ? "Online" : `Last active ${user.lastActive}`}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShowOptions(true)}>
            <MaterialIcons name='more-vert' size={24} color='#000' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerClassName='p-4'
        inverted
      />

      {/* Message Input */}
      <View className='p-4 border-t border-gray-100 flex-row items-center'>
        <TouchableOpacity className='mr-2'>
          <MaterialIcons name='attach-file' size={24} color='#666' />
        </TouchableOpacity>
        <TextInput
          className='flex-1 bg-gray-50 rounded-full px-4 py-2 mr-2'
          placeholder='Type a message'
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          onPress={sendMessage}
          className='bg-[#FF1A5A] w-10 h-10 rounded-full items-center justify-center'>
          <MaterialIcons name='send' size={20} color='white' />
        </TouchableOpacity>
      </View>

      {/* Options Modal */}
      <Modal
        visible={showOptions}
        transparent
        animationType='fade'
        onRequestClose={() => setShowOptions(false)}>
        <TouchableOpacity
          className='flex-1 bg-black/20'
          activeOpacity={1}
          onPress={() => setShowOptions(false)}>
          <View className='absolute right-4 top-16 bg-white rounded-xl shadow-lg w-48'>
            <TouchableOpacity
              className='flex-row items-center p-4 border-b border-gray-100'
              onPress={() => {
                setShowOptions(false);
                // Add view profile logic
              }}>
              <MaterialIcons name='person' size={20} color='#666' />
              <Text className='ml-3'>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-row items-center p-4 border-b border-gray-100'
              onPress={() => {
                setShowOptions(false);
                // Add mute notifications logic
              }}>
              <MaterialIcons name='notifications-off' size={20} color='#666' />
              <Text className='ml-3'>Mute Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-row items-center p-4 border-b border-gray-100'
              onPress={() => {
                setShowOptions(false);
                // Add block user logic
              }}>
              <MaterialIcons name='block' size={20} color='#666' />
              <Text className='ml-3'>Block User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-row items-center p-4'
              onPress={() => {
                setShowOptions(false);
                // Add report user logic
              }}>
              <MaterialIcons name='report' size={20} color='#FF1A5A' />
              <Text className='ml-3 text-[#FF1A5A]'>Report User</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
