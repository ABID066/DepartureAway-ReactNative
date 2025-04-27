import { StyleSheet, Text, Image, View } from "react-native";

import "@/global.css";

import React, { useEffect } from "react";

import { useRouter } from "expo-router";
import FlightTicket from "./(flight)/flightTicket";
import OrderPage1 from "./(flight)/flightTicket/order/page1";
import BusinessClassTicket from "./(flight)/flightTicket/agencyDetails/business";
import EconomyClassTicket from "./(flight)/flightTicket/agencyDetails/economy";
import SignIn from "./(auth)/signIn";
import SignUp from "./(auth)/signUp";
const index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/welcome"); // Navigate to the welcome screen after 2 seconds
    }, 2000);
  }, [router]);

  return (
    <View
    className='flex-1 justify-center items-center bg-yellow-400'
    >
      <Image
        source={require("@/assets/images/logo.png")} // Adjust the path to your actual logo
      />
      {/* <SignUp/> */}
      {/* <SignIn/> */}
      {/* <FlightTicket /> */}
      {/* <BusinessClassTicket /> */}
      {/* <EconomyClassTicket /> */}
      {/* <OrderPage1 /> */}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
