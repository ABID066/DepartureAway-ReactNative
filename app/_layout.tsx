import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Slot } from "expo-router"; // Slot is where the current screen content will be rendered

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"), // Path to your font
  });
};

const AppLayout = () => {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Poppins-Regular", // Apply Poppins font globally
  },
});

export default AppLayout;
