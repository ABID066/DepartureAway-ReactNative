import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import useUploadImage from "@/hooks/useUploadImage";
import useMultiStepForm from "@/hooks/useMultiStepForm";

const SignUp = () => {
  const router = useRouter();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();
  const { formData, setFormData, errors, validateStep, setStep, setErrors } =
    useMultiStepForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);

  // Gender options
  const genderOptions = ["Male", "Female", "Prefer not to say"];
  const roleOptions = ["User", "Freelancer", "Agency", "Admin"];

  // Example country codes
  const countryCodes = [
    { code: "AE", dial_code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
    { code: "AR", dial_code: "+54", flag: "🇦🇷", name: "Argentina" },
    { code: "AT", dial_code: "+43", flag: "🇦🇹", name: "Austria" },
    { code: "AU", dial_code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "BD", dial_code: "+880", flag: "🇧🇩", name: "Bangladesh" },
    { code: "BE", dial_code: "+32", flag: "🇧🇪", name: "Belgium" },
    { code: "BG", dial_code: "+359", flag: "🇧🇬", name: "Bulgaria" },
    { code: "BR", dial_code: "+55", flag: "🇧🇷", name: "Brazil" },
    { code: "CA", dial_code: "+1", flag: "🇨🇦", name: "Canada" },
    { code: "CH", dial_code: "+41", flag: "🇨🇭", name: "Switzerland" },
    { code: "CL", dial_code: "+56", flag: "🇨🇱", name: "Chile" },
    { code: "CN", dial_code: "+86", flag: "🇨🇳", name: "China" },
    { code: "CO", dial_code: "+57", flag: "🇨🇴", name: "Colombia" },
    { code: "CZ", dial_code: "+420", flag: "🇨🇿", name: "Czech Republic" },
    { code: "DE", dial_code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "DK", dial_code: "+45", flag: "🇩🇰", name: "Denmark" },
    { code: "EG", dial_code: "+20", flag: "🇪🇬", name: "Egypt" },
    { code: "ES", dial_code: "+34", flag: "🇪🇸", name: "Spain" },
    { code: "FI", dial_code: "+358", flag: "🇫🇮", name: "Finland" },
    { code: "FR", dial_code: "+33", flag: "🇫🇷", name: "France" },
    { code: "GB", dial_code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "GR", dial_code: "+30", flag: "🇬🇷", name: "Greece" },
    { code: "HK", dial_code: "+852", flag: "🇭🇰", name: "Hong Kong" },
    { code: "HU", dial_code: "+36", flag: "🇭🇺", name: "Hungary" },
    { code: "ID", dial_code: "+62", flag: "🇮🇩", name: "Indonesia" },
    { code: "IE", dial_code: "+353", flag: "🇮🇪", name: "Ireland" },
    { code: "IL", dial_code: "+972", flag: "🇮🇱", name: "Israel" },
    { code: "IN", dial_code: "+91", flag: "🇮🇳", name: "India" },
    { code: "IT", dial_code: "+39", flag: "🇮🇹", name: "Italy" },
    { code: "JP", dial_code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "KR", dial_code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "MX", dial_code: "+52", flag: "🇲🇽", name: "Mexico" },
    { code: "MY", dial_code: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "NG", dial_code: "+234", flag: "🇳🇬", name: "Nigeria" },
    { code: "NL", dial_code: "+31", flag: "🇳🇱", name: "Netherlands" },
    { code: "NO", dial_code: "+47", flag: "🇳🇴", name: "Norway" },
    { code: "NZ", dial_code: "+64", flag: "🇳🇿", name: "New Zealand" },
    { code: "PH", dial_code: "+63", flag: "🇵🇭", name: "Philippines" },
    { code: "PK", dial_code: "+92", flag: "🇵🇰", name: "Pakistan" },
    { code: "PL", dial_code: "+48", flag: "🇵🇱", name: "Poland" },
    { code: "PT", dial_code: "+351", flag: "🇵🇹", name: "Portugal" },
    { code: "RO", dial_code: "+40", flag: "🇷🇴", name: "Romania" },
    { code: "RU", dial_code: "+7", flag: "🇷🇺", name: "Russia" },
    { code: "SA", dial_code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
    { code: "SE", dial_code: "+46", flag: "🇸🇪", name: "Sweden" },
    { code: "SG", dial_code: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "TH", dial_code: "+66", flag: "🇹🇭", name: "Thailand" },
    { code: "TR", dial_code: "+90", flag: "🇹🇷", name: "Turkey" },
    { code: "TW", dial_code: "+886", flag: "🇹🇼", name: "Taiwan" },
    { code: "UA", dial_code: "+380", flag: "🇺🇦", name: "Ukraine" },
    { code: "US", dial_code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "VN", dial_code: "+84", flag: "🇻🇳", name: "Vietnam" },
    { code: "ZA", dial_code: "+27", flag: "🇿🇦", name: "South Africa" },
  ];

  const handleImagePick = async () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: undefined,
    }));
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;

      try {
        const imageUrl = await uploadImage(imageUri);
        setFormData({ image: imageUrl });
      } catch (err) {
        // Handle image upload error
        console.log("Image upload failed error: ", imageUploadError);
        console.error("Image upload failed", err);
      }
    }
  };

  const handleNext = () => {
    if (validateStep(1)) {
      setStep(2);
      router.push("/userName");
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-4 flex-row items-center'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold ml-4'>As a tourist</Text>
      </View>

      <View className='flex-1 px-6 flex-col justify-between'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='items-center justify-center my-8'>
            <View className='w-36 h-36 rounded-full bg-gray-200 items-center justify-center'>
              {imageUploading ? (
                <View className='flex-row gap-2'>
                  <ActivityIndicator size='small' color='#E11D48' />
                  <Text>Image Uploading...</Text>
                </View>
              ) : (
                <>
                  {formData?.image ? (
                    <Image
                      source={{ uri: formData?.image }}
                      className='w-full h-full rounded-full'
                      resizeMode='cover'
                    />
                  ) : (
                    <Ionicons name='person' size={80} color='#9ca3af' />
                  )}
                </>
              )}
              <TouchableOpacity
                onPress={() => handleImagePick()}
                disabled={imageUploading} // Disable the button while uploading
                className={`absolute right-0 bottom-0 ${
                  imageUploading ? "bg-gray-300" : "bg-[#E11D48]"
                }  rounded-full p-2`}>
                <Ionicons name='pencil' size={20} color='white' />
              </TouchableOpacity>
            </View>
            {errors.image && (
              <Text className='text-red-500 mt-1'>{errors.image}</Text>
            )}
          </View>

          <View className='mb-4'>
            <TextInput
              className='bg-gray-50 p-6 rounded-2xl'
              placeholder='First Name'
              value={formData.firstName}
              onChangeText={(text) => setFormData({ firstName: text })}
            />
            {errors.firstName && (
              <Text className='text-red-500 mt-1'>{errors.firstName}</Text>
            )}
          </View>

          <View className='mb-4'>
            <TextInput
              className='bg-gray-50 p-6 rounded-2xl'
              placeholder='Last name'
              value={formData.lastName}
              onChangeText={(text) => setFormData({ lastName: text })}
            />
            {errors.lastName && (
              <Text className='text-red-500 mt-1'>{errors.lastName}</Text>
            )}
          </View>

          <View className='mb-4'>
            <View className='flex-row'>
              <TouchableOpacity
                className='bg-gray-50 p-6 rounded-2xl mr-2 flex-row items-center'
                style={{ width: 120 }}
                onPress={() => setShowCountryModal(true)}>
                <Text>
                  {formData.countryCode.flag} {formData.countryCode.dial_code}
                </Text>
              </TouchableOpacity>
              <TextInput
                className='bg-gray-50 p-6 rounded-2xl flex-1'
                placeholder='Phone Number'
                value={formData.phone}
                onChangeText={(text) => setFormData({ phone: text })}
                keyboardType='phone-pad'
              />
            </View>
            {errors.phone && (
              <Text className='text-red-500 mt-1'>{errors.phone}</Text>
            )}
          </View>

          <View className='mb-4'>
            <TextInput
              className='bg-gray-50 p-6 rounded-2xl'
              placeholder='Email'
              value={formData.email}
              onChangeText={(text) => setFormData({ email: text })}
              keyboardType='email-address'
            />
            {errors.email && (
              <Text className='text-red-500 mt-1'>{errors.email}</Text>
            )}
          </View>

          <View className='mb-4'>
            <TouchableOpacity
              className='bg-gray-50 p-6 rounded-2xl'
              onPress={() => setShowRoleModal(true)}>
              <Text>{formData.role || "Select Role"}</Text>
            </TouchableOpacity>
            {errors.role && (
              <Text className='text-red-500 mt-1'>{errors.role}</Text>
            )}
          </View>

          <View className='mb-4'>
            <View className='relative'>
              <TextInput
                className='bg-gray-50 p-6 rounded-2xl'
                placeholder='Password'
                value={formData.password}
                onChangeText={(text) => setFormData({ password: text })}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className='absolute right-4 top-1/2 -translate-y-1/2'
                onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color='gray'
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className='text-red-500 mt-1'>{errors.password}</Text>
            )}
          </View>

          <View className='mb-4'>
            <TouchableOpacity
              className='bg-gray-50 p-6 rounded-2xl'
              onPress={() => setShowGenderModal(true)}>
              <Text>{formData.gender || "Select Gender"}</Text>
            </TouchableOpacity>
            {errors.gender && (
              <Text className='text-red-500 mt-1'>{errors.gender}</Text>
            )}
          </View>

          <TouchableOpacity
            className='bg-[#F13F5F] py-4 rounded-full mb-20'
            onPress={handleNext}>
            <Text className='text-white text-center font-semibold text-lg'>
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Role Selection Modal */}
      <Modal visible={showRoleModal} transparent animationType='slide'>
        <View className='flex-1 justify-end bg-black/50'>
          <View className='bg-white rounded-t-3xl p-6'>
            <View className='flex-row justify-between items-center mb-6'>
              <Text className='text-xl font-bold'>Select Role</Text>
              <TouchableOpacity onPress={() => setShowRoleModal(false)}>
                <Ionicons name='close' size={24} />
              </TouchableOpacity>
            </View>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role}
                className='py-4'
                onPress={() => {
                  setFormData({ role: role.toLowerCase() });
                  setShowRoleModal(false);
                }}>
                <Text className='text-lg'>{role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      {/* Gender Selection Modal */}
      <Modal visible={showGenderModal} transparent animationType='slide'>
        <View className='flex-1 justify-end bg-black/50'>
          <View className='bg-white rounded-t-3xl p-6'>
            <View className='flex-row justify-between items-center mb-6'>
              <Text className='text-xl font-bold'>Select Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <Ionicons name='close' size={24} />
              </TouchableOpacity>
            </View>
            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender}
                className='py-4'
                onPress={() => {
                  setFormData({ gender: gender.toLowerCase() });
                  setShowGenderModal(false);
                }}>
                <Text className='text-lg'>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Country Selection Modal */}
      <Modal visible={showCountryModal} transparent animationType='slide'>
        <View className='flex-1 justify-end bg-black/50'>
          <View className='bg-white rounded-t-3xl p-6 h-3/4'>
            <View className='flex-row justify-between items-center mb-6'>
              <Text className='text-xl font-bold'>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Ionicons name='close' size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className='py-4 flex-row items-center'
                  onPress={() => {
                    setFormData({ countryCode: item });
                    setShowCountryModal(false);
                  }}>
                  <Text className='text-2xl mr-4'>{item.flag}</Text>
                  <Text className='text-lg'>
                    {item.name} ({item.dial_code})
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;
