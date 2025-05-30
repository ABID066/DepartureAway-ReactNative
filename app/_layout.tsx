import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { AppProviders } from "@/providers/AppProviders";

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
  });
};

const AppLayout = () => {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <AppProviders>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <Toast />
    </AppProviders>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Poppins-Regular",
  },
});

export default AppLayout;
