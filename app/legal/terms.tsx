import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TermsOfServiceScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar barStyle='dark-content' />

      {/* Header with back button and title */}
      <View className='p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold ml-4'>Terms of Service</Text>
      </View>
      <ScrollView className='flex-1 px-3 mt-2'>
        {/* Last updated text */}
        <Text className='text-center text-black-800 text-lg'>
          Last Updated July 2023
        </Text>

        {/* Divider line */}
        <View className='h-px bg-gray-200 mx-4 my-4' />

        {/* Terms and conditions section */}
        <Text className='font-bold text-xl mb-2'>
          Terms and Conditions of Use for Departure Away
        </Text>

        <Text className='text-lg'>
          Welcome to Departure Away! Before you embark on your next adventure
          with us, it's important to go over and understand the terms and
          conditions that govern the use of our app and services. By accessing,
          browsing, or using Departure Away, you acknowledge that you have read,
          understood, and agree to be bound by these terms. If you do not agree
          to these terms, please do not use our services.
        </Text>

        <Text className='font-bold text-xl mt-5'>1. Acceptance of Terms</Text>

        <Text className='text-lg  mt-2 '>
          - By using Departure Away, you agree to be bound by these terms and
          conditions in full. These terms form a legally binding agreement
          between you and Departure Away, so please read them carefully.
        </Text>

        <Text className='font-bold text-xl mt-5'>2. Privacy Policy</Text>

        <Text className='text-lg  mt-2 '>
          - Your privacy is important to us. Our Privacy Policy, which is part
          of these terms, describes how we handle the personal information you
          provide to us when using our services.
        </Text>

        <Text className='font-bold text-xl mt-5'>3. Use of the Service</Text>

        <Text className='text-lg  mt-2'>
          - Departure Away provides a travel guide app that helps you plan and
          enjoy your travels. You may use our services for your personal,
          non-commercial use only. Any misuse of the service or content provided
          within is strictly prohibited.
        </Text>

        <Text className='font-bold text-xl mt-5'>
          4. Intellectual Property Rights
        </Text>

        <Text className='text-lg  mt-2 '>
          - All content on Departure Away, including text, graphics, logos,
          icons, and images, is our property or the property of our content
          suppliers and is protected by international copyright and intellectual
          property laws. You may not use any content in a way that infringes
          these rights without our prior written consent.
        </Text>

        <Text className='font-bold text-xl mt-5'>5. Changes to Terms</Text>

        <Text className='text-lg  mt-2'>
          - We reserve the right to modify these terms at any time. We will post
          the revised terms on the app, and they will become effective
          immediately upon posting. Your continued use of the app signifies your
          acceptance of the revised terms.
        </Text>

        <Text className='font-bold text-xl mt-5'>
          6. Limitation of Liability
        </Text>

        <Text className='text-lg  mt-2 '>
          - To the maximum extent permitted by law, Departure Away shall not be
          liable for any direct, indirect, incidental, special, consequential,
          or exemplary damages resulting from your use of our services.
        </Text>

        <Text className='font-bold text-xl mt-5'>7. Governing Law</Text>

        <Text className='text-lg  mb-8 mt-2'>
          - These terms shall be governed by and construed in accordance with
          the laws of the jurisdiction in which Departure Away is headquartered,
          without giving effect to any principles of conflicts of law.
        </Text>

        <Text className='text-lg '>
          By using Departure Away, you acknowledge that you have read these
          terms and agree to be bound by them. If you have any questions or
          concerns about these terms, please contact us before using our
          services. Thank you for choosing Departure Away as your travel guide
          companion. Let's make your travel experience memorable and
          hassle-free!
        </Text>

        {/* Agree button */}
        <View className='px-6 mt-10  pb-8'>
          <TouchableOpacity
            className='bg-[#F13F5F] py-4 rounded-full'
            onPress={() => router.push("/legal/location")}>
            <Text className='text-white text-center font-semibold text-lg'>
              Agree
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfServiceScreen;
