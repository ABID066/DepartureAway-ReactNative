import { StyleSheet, Image, View } from "react-native";

import "@/global.css";

import React, { useEffect } from "react";

import { useRouter } from "expo-router";
const index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/welcome"); 
    }, 2000);
  }, [router]);

  return (
    <View className='flex-1 justify-center items-center bg-yellow-400'>
      <Image
        source={require("@/assets/images/logo.png")} 
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
