import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  
  // Country code selection
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    dial_code: '+1',
    flag: '🇺🇸',
    name: 'United States'
  });
  
  // Gender options
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  
  // Example country codes - in a real app, you would have a complete list
  const countryCodes = [
    { code: 'US', dial_code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: 'GB', dial_code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'FR', dial_code: '+33', flag: '🇫🇷', name: 'France' },
    { code: 'DE', dial_code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: 'JP', dial_code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: 'IN', dial_code: '+91', flag: '🇮🇳', name: 'India' },
    { code: 'CN', dial_code: '+86', flag: '🇨🇳', name: 'China' },
    { code: 'CA', dial_code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: 'AU', dial_code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'BR', dial_code: '+55', flag: '🇧🇷', name: 'Brazil' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with back button and title */}
      <View className="p-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">As a tourist</Text>
      </View>

      <View className="flex-1 px-6 flex-col justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile picture placeholder */}
          <View className="items-center justify-center my-8">
            <View className="w-36 h-36 rounded-full bg-gray-200 items-center justify-center">
              <Ionicons name="person" size={80} color="#9ca3af" />
              <View className="absolute right-0 bottom-0 bg-rose-500 rounded-full p-2">
                <Ionicons name="pencil" size={20} color="white" />
              </View>
            </View>
          </View>

          {/* Form fields - using only placeholders, no labels */}
          <View className="mb-4">
            <TextInput
              className="bg-gray-50 p-6 rounded-2xl"
              placeholder="Full Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View className="mb-4">
            <TextInput
              className="bg-gray-50 p-6 rounded-2xl"
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View className="mb-4">
            <View className="flex-row bg-gray-50 rounded-2xl overflow-hidden p-3">
              <TouchableOpacity 
                className="flex-row items-center px-2 border-r border-gray-200"
                onPress={() => setShowCountryModal(true)}
              >
                <Text className="mr-1">{selectedCountry.flag}</Text>
                <Text className="text-sm">{selectedCountry.dial_code}</Text>
                <Ionicons name="chevron-down" size={16} color="gray" className="ml-1" />
              </TouchableOpacity>
              <TextInput
                className="flex-1 p-3"
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View className="mb-4">
            <View className="bg-gray-50 rounded-2xl flex-row items-center p-3">
              <TextInput
                className="flex-1"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Ionicons name="mail-outline" size={20} color="gray" />
            </View>
          </View>

          <View className="mb-4">
            <View className="bg-gray-50 rounded-2xl flex-row items-center p-3">
              <TextInput
                className="flex-1"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-8">
            <TouchableOpacity 
              className="bg-gray-50 rounded-2xl flex-row items-center justify-between p-6"
              onPress={() => setShowGenderModal(true)}
            >
              <Text className={gender ? "text-black" : "text-gray-400"}>
                {gender || "Gender"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        {/* Next button at bottom of screen - positioned like the previous "Create Account" button */}
        <TouchableOpacity 
          className="bg-rose-500 py-4 rounded-full mb-20 mt-auto"
          onPress={() => router.push('/userName')}
        >
          <Text className="text-white text-center font-semibold text-lg">Next</Text>
        </TouchableOpacity>
        </ScrollView>

      </View>

      {/* Country Code Selection Modal */}
      <Modal
        visible={showCountryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl h-2/3">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-bold">Select Country Code</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  className="p-4 border-b border-gray-100 flex-row items-center"
                  onPress={() => {
                    setSelectedCountry(item);
                    setShowCountryModal(false);
                  }}
                >
                  <Text className="text-xl mr-3">{item.flag}</Text>
                  <Text className="flex-1">{item.name}</Text>
                  <Text className="font-medium">{item.dial_code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View className="flex-1 bg-black bg-opacity-30 justify-center items-center">
          <View className="bg-white rounded-xl w-4/5 overflow-hidden">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-center">Select Gender</Text>
            </View>
            
            {genderOptions.map((option) => (
              <TouchableOpacity 
                key={option}
                className="p-4 border-b border-gray-100"
                onPress={() => {
                  setGender(option);
                  setShowGenderModal(false);
                }}
              >
                <Text className="text-center text-base">{option}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              className="p-4 bg-gray-100"
              onPress={() => setShowGenderModal(false)}
            >
              <Text className="text-center text-base font-medium text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;