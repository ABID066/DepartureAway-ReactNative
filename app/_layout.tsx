import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Font from "expo-font";
import { Slot } from "expo-router";
import Toast from 'react-native-toast-message';

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
  });
};

const AppLayout = () => {
  useEffect(() => {
    loadFonts();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <Toast />
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Poppins-Regular",
  },
});

export default AppLayout;
