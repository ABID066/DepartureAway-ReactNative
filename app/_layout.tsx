import React, { useEffect, useState } from "react";
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
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadApp() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadApp();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

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
