import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { io } from "socket.io-client";
import Toast from "react-native-toast-message";

type User = {
  id: string;
  name: string;
  image?: string;
  userName?: string;
  role: string;
  phone: string;
  slug: string;
  isVerified: string;
};

type UnreadMap = { [userId: string]: number };

const InboxScreen = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [unreadMap, setUnreadMap] = useState<UnreadMap>({});
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (user) setCurrentUserId(user.id);
  }, [user]);

  // Fetch all users for conversation
  const fetchUsers = async () => {
    const res = await axiosSecure.get("/user/single-user-message");
    return res.data || [];
  };

  const { data, isLoading } = useQuery({
    queryKey: ["conversationUsers"],
    queryFn: fetchUsers,
  });

  // --- SOCKET.IO SETUP ---
  useEffect(() => {
    if (!currentUserId) return;
    const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL as string, {
      transports: ["websocket"],
      query: { userId: currentUserId },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected!", socket.id);
    });

    // Listen for online users
    socket.on("getOnlineUsers", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });

    // Listen for new message notification
    socket.on(
      "newMessage",
      (payload: {
        senderId: string;
        reciverId: string;
        messages: string;
        message?: string;
      }) => {
        if (payload.reciverId === currentUserId) {
          setUnreadMap((prev) => ({
            ...prev,
            [payload.senderId]: (prev[payload.senderId] || 0) + 1,
          }));

          // Find sender name from users list
          const sender = (data as User[] | undefined)?.find(
            (u) => u.id === payload.senderId
          );
          const senderName = sender?.name || "Someone";

          // Show toast notification (react-native-toast-message)
          Toast.show({
            type: "info",
            text1: senderName,
            text2: payload.messages || payload.message || "New Message!",
            position: "top",
            visibilityTime: 2500,
          });
        }
      }
    );

    socket.on("disconnect", () => {
      setOnlineUsers([]);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId, data]);
  // --- END SOCKET.IO ---

  // Filter by search
  const users: User[] = (data as User[]) || [];
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle conversation click: mark as read
  const handleConversationPress = (user: User) => {
    setUnreadMap((prev) => ({ ...prev, [user.id]: 0 }));
    router.push({
      pathname: "/chat/inbox-screen/[id]",
      params: { id: user.id, name: user.name, image: user.image },
    });
  };

  // Render each user as a conversation item
  const renderUserItem = ({ item }: { item: User }) => {
    const isOnline = onlineUsers.includes(item.id);
    if (item.id === currentUserId) return null;
    const unreadCount = unreadMap[item.id] || 0;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderColor: "#eee",
        }}
        onPress={() => handleConversationPress(item)}>
        <View style={{ position: "relative", marginRight: 12 }}>
          <Image
            source={{
              uri:
                item.image ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(item.name || "User"),
            }}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
          {/* Active/Inactive dot */}
          <View
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: isOnline ? "#22c55e" : "#d1d5db", // green or gray
            }}
          />
          {/* Unread badge */}
          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#FF1A5A",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5,
                zIndex: 2,
              }}>
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.name}
            </Text>
          </View>
          <Text style={{ color: "#666", fontSize: 13 }}>
            {item.userName ? `@${item.userName}` : item.phone}
          </Text>
          <Text style={{ color: "#888", fontSize: 12 }}>
            {item.role} {item.isVerified === "true" ? "✅" : ""}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}>
          <TouchableOpacity
            onPress={() =>
              router.canGoBack() ? router.back() : router.push("/home")
            }>
            <MaterialIcons name='arrow-back' size={24} color='#000' />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 16 }}>
            Messages
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <MaterialIcons name='search' size={24} color='#666' />
          <TextInput
            style={{ flex: 1, marginLeft: 8, fontSize: 16 }}
            placeholder='Search users'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Toast />
    </View>
  );
};

export default InboxScreen;
