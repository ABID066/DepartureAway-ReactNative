import React, { useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { Slot } from "expo-router";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const sidebarAnimation = React.useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  const toggleSidebar = (): void => {
    const toValue = isSidebarOpen ? 0 : 1;
    setIsSidebarOpen(!isSidebarOpen);
    Animated.spring(sidebarAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 20,
      friction: 7,
    }).start();
  };

  const sidebarWidth = sidebarAnimation.interpolate({
    inputRange: [0, 1],

    outputRange: [0, 256], // 256px = 16rem (w-64)
  });

  return (
    <View className='flex-1 flex-row bg-gray-100'>
      <Animated.View style={[{ width: sidebarWidth, overflow: "hidden" }]}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Animated.View>

      <View className='flex-1'>
        {!isSidebarOpen && (
          <View className='flex-row items-center p-4'>
            <TouchableOpacity
              onPress={toggleSidebar}
              className='w-10 h-10 justify-center items-center rounded-lg mr-4 z-20'>
              <Entypo name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {isSidebarOpen && (
          <Pressable
            onPress={toggleSidebar}
            className='absolute inset-0 z-10 bg-neutral-600 bg-opacity-50'
          />
        )}
        <Slot />
      </View>
    </View>
  );
};

export default DashboardLayout;
