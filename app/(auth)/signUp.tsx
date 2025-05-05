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
  
  // Example country codes
  const countryCodes = [
    { code: 'AE', dial_code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: 'AR', dial_code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: 'AT', dial_code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: 'AU', dial_code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'BD', dial_code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: 'BE', dial_code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: 'BG', dial_code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: 'BR', dial_code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: 'CA', dial_code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: 'CH', dial_code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: 'CL', dial_code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: 'CN', dial_code: '+86', flag: '🇨🇳', name: 'China' },
    { code: 'CO', dial_code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: 'CZ', dial_code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: 'DE', dial_code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: 'DK', dial_code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: 'EG', dial_code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: 'ES', dial_code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: 'FI', dial_code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: 'FR', dial_code: '+33', flag: '🇫🇷', name: 'France' },
    { code: 'GB', dial_code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'GR', dial_code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: 'HK', dial_code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
    { code: 'HU', dial_code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: 'ID', dial_code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: 'IE', dial_code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: 'IL', dial_code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: 'IN', dial_code: '+91', flag: '🇮🇳', name: 'India' },
    { code: 'IT', dial_code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: 'JP', dial_code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: 'KR', dial_code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: 'MX', dial_code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: 'MY', dial_code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: 'NG', dial_code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: 'NL', dial_code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: 'NO', dial_code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: 'NZ', dial_code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: 'PH', dial_code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: 'PK', dial_code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: 'PL', dial_code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: 'PT', dial_code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: 'RO', dial_code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: 'RU', dial_code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: 'SA', dial_code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: 'SE', dial_code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: 'SG', dial_code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: 'TH', dial_code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: 'TR', dial_code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: 'TW', dial_code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: 'UA', dial_code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: 'US', dial_code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: 'VN', dial_code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: 'ZA', dial_code: '+27', flag: '🇿🇦', name: 'South Africa' }
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

          {/* Form fields */}
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
        {/* Next button */}
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