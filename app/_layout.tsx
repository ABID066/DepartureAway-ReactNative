import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Slot } from "expo-router";

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
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Poppins-Regular", 
  },
});

export default AppLayout;
