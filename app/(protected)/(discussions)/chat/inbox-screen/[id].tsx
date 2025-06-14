import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useServicePackages } from "@/hooks/useServicePackages";
import { io } from "socket.io-client"; // <-- updated import
import { Image } from "react-native";
import { icons } from "@/constants/icons";
import LiveChatHeader from "@/components/Shared/(Headers)/LiveChatHeader";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  reciverId: string;
  messages: string;
  is_read: boolean;
  sent_at: string;
  createdAt: string;
  updatedAt: string;
}

const ChatDetailScreen = () => {
  const { user } = useAuth();
  const { getMessages, sendMessage } = useServicePackages();
  const {
    id: otherUserId,
    name: otherUserName,
    image: otherUserImage,
  } = useLocalSearchParams<{
    id: string;
    name?: string;
    image?: string;
  }>();
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    if (user) setCurrentUserId(user.id);
  }, [user]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["messages", otherUserId],
    queryFn: async () => await getMessages(otherUserId),
    enabled: !!otherUserId,
  });

  // --- SOCKET.IO SETUP ---
  useEffect(() => {
    if (!currentUserId || !otherUserId) return;
    // Always pass userId in query for backend mapping
    const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL as string, {
      transports: ["websocket"],
      query: { userId: currentUserId },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected!", socket.id);
    });

    socket.on(
      "newMessage",
      (payload: { senderId: string; reciverId: string }) => {
        // Only refetch if the message is for this conversation
        if (
          (payload.senderId === otherUserId &&
            payload.reciverId === currentUserId) ||
          (payload.senderId === currentUserId &&
            payload.reciverId === otherUserId)
        ) {
          refetch();
        }
      }
    );
    socketRef.current = socket;
    socket.on("getOnlineUsers", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Socket disconnected:", reason);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId, otherUserId, refetch]);
  // --- END SOCKET.IO ---

  const { mutate } = useMutation({
    mutationKey: ["sendMessage", otherUserId],
    mutationFn: async ({
      receiverId,
      message,
    }: {
      receiverId: string;
      message: string;
    }) => await sendMessage(receiverId, message),
    onSuccess: (_, variables) => {
      setMessage("");
      refetch();
      // Scroll to bottom after sending message
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
      // Always emit socket event after sending message
      socketRef.current?.emit("send_message", {
        senderId: currentUserId,
        reciverId: otherUserId,
        message: variables.message,
      });
    },
  });

  // Optional: join event if you want to track online users
  useEffect(() => {
    if (!currentUserId) return;
    socketRef.current?.emit("join", { userId: currentUserId });
  }, [currentUserId]);

  const handleSendMessages = () => {
    if (!message.trim() || !otherUserId) return;
    mutate({ receiverId: otherUserId, message });
  };

  // Map messages for UI (newest last, for FlatList inverted)
  const messagesRaw: Message[] = (data as Message[]) || [];
  const mappedMessages = [...messagesRaw]
    .sort(
      (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
    )
    .map((msg) => ({
      id: msg._id,
      message: msg.messages,
      time: new Date(msg.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: msg.senderId === currentUserId,
    }));

  const isOtherUserOnline = onlineUsers.includes(otherUserId);

  const item = {
    agency: otherUserName || "User",
    personImg: otherUserImage,
    personOnline: isOtherUserOnline,
  }

  const renderItem = ({
    item,
  }: {
    item: { id: string; message: string; time: string; isCurrentUser: boolean };
  }) => (
    <View
      className={`py-3 px-5 max-w-[80%]  mt-5 ${
        item.isCurrentUser
          ? "bg-[#FF1A5A] ml-auto rounded-[20px_20px_8px_20px]"
          : "bg-[#F5F5F5] mr-auto rounded-[8px_20px_20px_20px]"
      }`}
      // style={{
      //   maxWidth: "80%",
      //   borderRadius: 12,
      //   padding: 12,
      //   marginBottom: 8,
      //   alignSelf: item.isCurrentUser ? "flex-end" : "flex-start",
      //   backgroundColor: item.isCurrentUser ? "#FF1A5A" : "#F5F5F5",
      //   borderTopRightRadius: item.isCurrentUser ? 0 : 12,
      //   borderTopLeftRadius: item.isCurrentUser ? 12 : 0,
      // }}
      >
      {/* <Text className={`${item.isCurrentUser ? "text-white" : ""}`}>
        {item.message}
      </Text>
      <Text
        className={`${
          item?.isCurrentUser ? "text-white" : "text-[#9E9E9E]"
        } text-xs mt-4 text-end`}>
        {item.time}
      </Text> */}

      <View>
        <Text
          className={`text-sm font-normal ${
            item?.isCurrentUser ? "text-white" : ""
          }`}>
          {item?.message}
        </Text>
      </View>
      <View className='flex-row items-end justify-end gap-1'>
        <Text
          className={`text-xs font-medium ${
            item?.isCurrentUser ? "text-white" : "text-[#9E9E9E]"
          }`}>
          {item?.time}
        </Text>
        {item?.isCurrentUser && (
          <Image className='size-4' source={icons?.readIcon} />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderColor: "#eee",
        }}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name='arrow-back' size={24} color='#000' />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
          }}>
          <Image
            source={{
              uri:
                otherUserImage ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(otherUserName || "User"),
            }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
          />
          <View className='flex-row items-center justify-between gap-4 flex-1 pr-4'>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {otherUserName || "User"}
            </Text>
            <Text
              style={{
                color: isOtherUserOnline ? "#22c55e" : "#888",
                fontSize: 13,
              }}>
              {isOtherUserOnline ? "Active now" : "Offline"}
            </Text>
          </View>
        </View>
      </View> */}
      <LiveChatHeader item={item} />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={mappedMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          inverted // newest at bottom, scroll up for older
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderTopWidth: 1,
          borderColor: "#eee",
        }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          placeholder='Type a message...'
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={{
            marginLeft: 8,
            backgroundColor: "#FF1A5A",
            borderRadius: 24,
            padding: 8,
          }}
          onPress={handleSendMessages}
          disabled={!message.trim()}>
          <MaterialIcons name='send' size={24} color='#fff' />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;
