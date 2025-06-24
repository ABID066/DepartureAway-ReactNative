import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthServicePackages } from "@/hooks/useAuthServicePackages";
import useUploadImage from "@/hooks/useUploadImage";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

// Country data (could be moved to a separate file)
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

// Define types for better type safety
type CountryCodeType = {
  code: string;
  dial_code: string;
  flag: string;
  name: string;
};

// Type for the full user data object fetched from DB
interface UserProfileData {
  id: string; // Add id to the type for dbUserData
  name: string;
  image: string;
  userName: string;
  email: string;
  isVerified: boolean;
  role: string;
  phone: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  // Add other fields as they exist in your DB user object
}

// Type for the data sent to updateUserProfile mutation
interface UserUpdatePayload {
  name: string;
  image: string;
  userName: string;
  email: string;
  role: string;
  phone: string; // This will be the combined string like "+880 123456789"
  gender: string;
  // Add other fields that can be updated
}

// Type for the local state `userData`
interface LocalUserState {
  name: string;
  image: string;
  userName: string;
  email: string;
  isVerified: boolean;
  role: string;
  phone: string; // This will be just the number part (e.g., "123456789")
  gender: string;
  countryCode: CountryCodeType;
  createdAt: string;
  updatedAt: string;
}

// Type for validation errors state
type ErrorsType = Record<string, string | undefined>; // Allow undefined for cleared errors

const UserProfile = () => {
  const { user } = useAuth(); // Assuming useAuth provides the current user's ID or similar unique identifier
  const { getUserDataByToken, getAllUserName, updateUserProfile } = useAuthServicePackages();
  const { uploadImage } = useUploadImage();
  const router = useRouter();

  const { data: dbUserDataResponse, isLoading } = useQuery<any, Error, { data: UserProfileData }>({ // Typed response
    queryKey: ["users", "user", user],
    queryFn: async () => await getUserDataByToken(),
    enabled: !!user,
  });

  const dbUserData = dbUserDataResponse?.data;

  const phone = dbUserData?.phone || "";
  const [countryCodePart = "", phoneNumberPart = ""] = phone.split(" ");

  const currentCountryCode = countryCodes.find(
    (c) => c.dial_code == countryCodePart
  );

  // State for user data and editing
  const [userData, setUserData] = useState<LocalUserState>({
    name: "",
    image: "",
    userName: "",
    email: "",
    isVerified: false,
    role: "user",
    phone: "",
    gender: "",
    countryCode: {
      code: "US",
      dial_code: "+1",
      flag: "🇺🇸",
      name: "United States",
    },
    createdAt: "",
    updatedAt: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState<ErrorsType>({
    name: undefined,
    userName: undefined,
    email: undefined,
    phone: undefined,
    gender: undefined,
    role: undefined,
  });

  // Modal states
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false); // New state for update button loading

  // Gender and role options
  const genderOptions = ["Male", "Female", "Prefer not to say"];
  const roleOptions = ["User", "Freelancer", "Agency", "Admin"];

  // Fetch all usernames for validation
  const { data: allUserNamesResponse } = useQuery<any, Error, { data: { userName: string }[] }>({
    queryKey: ["allUserNames"],
    queryFn: async () => await getAllUserName(),
  });

  const allExistingUserNames = allUserNamesResponse?.data?.map(u => u.userName) || [];

  // Initialize with fetched data
  useEffect(() => {
    if (dbUserData) {
      setUserData({
        ...dbUserData,
        countryCode: currentCountryCode || {
          code: "US",
          dial_code: "+1",
          flag: "🇺🇸",
          name: "United States",
        },
        phone: phoneNumberPart, // Use phoneNumberPart here
      });
    }
  }, [dbUserData]);

  // Toggle edit modal
  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
    if (!isEditModalVisible) {
      // Reset errors when opening modal
      setErrors({
        name: undefined,
        userName: undefined,
        email: undefined,
        phone: undefined,
        gender: undefined,
        role: undefined,
      });
    } else {
      // When closing modal, re-initialize userData from dbUserData to discard changes
      if (dbUserData) {
        setUserData({
          ...dbUserData,
          countryCode: currentCountryCode || {
            code: "US",
            dial_code: "+1",
            flag: "🇺🇸",
            name: "United States",
          },
          phone: phoneNumberPart,
        });
      }
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors: ErrorsType = {
      name: undefined,
      userName: undefined,
      email: undefined,
      phone: undefined,
      gender: undefined,
      role: undefined,
    };

    if (!userData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!userData.userName) {
      newErrors.userName = "Username is required";
      valid = false;
    } else if (userData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
      valid = false;
    }

    if (!userData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!userData.phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    } else if (!/^\d{8,15}$/.test(userData.phone)) { // Validate only number part
      newErrors.phone = "Phone is invalid (8-15 digits)";
      valid = false;
    }

    if (!userData.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    if (!userData.role) {
      newErrors.role = "Role is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Update mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (userUpdateData: UserUpdatePayload) => {
      // Ensure dbUserData.id exists before calling API
      if (!dbUserData?.id) {
        throw new Error("Current user ID is not available.");
      }
      const { data } = await updateUserProfile(
        dbUserData.id,
        userUpdateData
      );
      return data;
    },
    onError: (err) => {
      console.error("Update failed:", err); // Log the full error for debugging
      let errorMessage = "Failed to update user profile.";
      // You can add more specific error handling based on err instanceof AxiosError
      // similar to what you had in UserName.tsx if your backend sends specific messages.

      Toast.show({
        type: "error",
        text1: "Update Failed!",
        text2: errorMessage,
      });
      setIsUpdatingProfile(false);
    },
    mutationKey: ["update-user", "users", "user", user],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Profile Updated!",
        text2: "Your profile has been updated successfully.",
      });
      setIsUpdatingProfile(false);
      toggleEditModal(); // Close modal on success
      // Invalidate queries to refetch user data
      // queryClient.invalidateQueries(["users", "user", user]); // If you have queryClient access
    },
  });

  // Handle profile update
  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true); // Start loading

    // First, run local form validation
    const formIsValid = validateForm();
    if (!formIsValid) {
      setIsUpdatingProfile(false);
      return; // Stop if local validation fails
    }

    // --- Username Uniqueness Check (excluding current user) ---
    // Only check if the username has actually changed AND if it's taken by someone ELSE
    if (userData.userName !== dbUserData?.userName) { // Check only if username has changed
      const isUsernameTakenByOther = allExistingUserNames.some(
        (existingUsername) =>
          existingUsername === userData.userName && existingUsername !== dbUserData?.userName
      );

      if (isUsernameTakenByOther) {
        setErrors((prevErrors: ErrorsType) => ({
          ...prevErrors,
          userName: "This username is already taken by another user.",
        }));
        Toast.show({
          type: "error",
          text1: "Username Not Available!",
          text2: "This username is already taken by another user. Please choose another.",
        });
        setIsUpdatingProfile(false);
        return; // Stop if username is taken by another user
      }
    }
    // --- End Username Uniqueness Check ---

    // If validations pass, proceed with mutation
    try {
      const updatePayload: UserUpdatePayload = {
        name: userData.name,
        image: userData.image,
        userName: userData.userName, // Send the new username
        email: userData.email,
        role: userData.role,
        gender: userData.gender,
        phone: `${userData.countryCode.dial_code} ${userData.phone}`, // Combine for backend
      };
      await mutateAsync(updatePayload);
    } catch (error) {
      // Error handled by onError in useMutation, but good to catch here too
      console.error("Error during profile update mutation:", error);
      setIsUpdatingProfile(false);
    }
  };

  const handleCancel = () => {
    toggleEditModal(); // This already resets the form data to dbUserData
  };

  // Define allowed field names for type safety
  type UserField =
    | "name"
    | "userName"
    | "email"
    | "phone"
    | "gender"
    | "role"
    | "image"
    | "countryCode";

  // Handle field changes
  const handleChange = (field: UserField, value: string | CountryCodeType) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for the specific field when it changes
    // Cast to keyof ErrorsType to satisfy TypeScript
    if (errors[field as keyof ErrorsType] !== undefined) {
      setErrors((prev) => ({
        ...prev,
        [field as keyof ErrorsType]: undefined, // Set to undefined to clear
      }));
    }
  };

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImageUploading(true);

      try {
        const imageUrl = await uploadImage(imageUri);
        handleChange("image", imageUrl);
      } catch (err) {
        console.error("Image upload failed", err);
        Toast.show({
          type: "error",
          text1: "Image Upload Failed!",
          text2: "Could not upload image. Please try again.",
        });
      } finally {
        setImageUploading(false);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString: string | number | Date | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid date strings
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#FF1A5A' />
      </View>
    );
  }

  // Handle case where dbUserData might still be null/undefined after loading
  if (!dbUserData) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text>Error loading user data or user not found.</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-gray-100'>
      {/* Back Button and Title Header */}
      <View className='flex-row items-center p-4 bg-white shadow-sm'>
        <TouchableOpacity onPress={() => router.back()} className='p-2'>
          <Ionicons name='arrow-back' size={24} color='#333' />
        </TouchableOpacity>
        <Text className='text-xl font-bold ml-4'>Your Profile</Text>
      </View>

      <ScrollView className='flex-1'>
        {/* Profile Header */}
        <View className='items-center py-8 bg-white shadow-sm'>
          <View className='relative'>
            {imageUploading ? (
              <View className='w-32 h-32 rounded-full bg-gray-200 items-center justify-center'>
                <ActivityIndicator size='small' color='#FF1A5A' />
              </View>
            ) : (
              <Image
                source={{
                  uri: userData?.image || "https://via.placeholder.com/150",
                }}
                className='w-32 h-32 rounded-full border-4 border-white shadow-md'
              />
            )}
            {userData?.isVerified && (
              <View className='absolute bottom-0 right-0 bg-blue-500 rounded-full p-1'>
                <Text className='text-white text-xs'>✓</Text>
              </View>
            )}
          </View>
          <Text className='text-2xl font-bold mt-4 text-gray-800'>
            {userData?.name || "No Name"}
          </Text>
          <Text className='text-gray-500'>
            @{userData?.userName || "username"}
          </Text>
        </View>

        {/* User Info */}
        <View className='mx-4 my-6 bg-white rounded-lg shadow-sm p-6'>
          <View className='mb-4'>
            <Text className='text-gray-500 text-sm'>Email</Text>
            <Text className='text-gray-800 text-lg'>
              {userData?.email || "N/A"}
            </Text>
          </View>

          <View className='mb-4'>
            <Text className='text-gray-500 text-sm'>Phone</Text>
            <Text className='text-gray-800 text-lg'>
              {userData?.countryCode?.dial_code} {userData?.phone || "N/A"}
            </Text>
          </View>

          <View className='mb-4'>
            <Text className='text-gray-500 text-sm'>Role</Text>
            <Text className='text-gray-800 text-lg capitalize'>
              {userData?.role || "N/A"}
            </Text>
          </View>

          <View className='mb-4'>
            <Text className='text-gray-500 text-sm'>Gender</Text>
            <Text className='text-gray-800 text-lg capitalize'>
              {userData?.gender || "N/A"}
            </Text>
          </View>

          <View className='mb-4'>
            <Text className='text-gray-500 text-sm'>Member Since</Text>
            <Text className='text-gray-800 text-lg'>
              {formatDate(userData?.createdAt)}
            </Text>
          </View>

          <View className='mb-4'>
            <Text className='text-gray-500 text-sm'>Last Updated</Text>
            <Text className='text-gray-800 text-lg'>
              {formatDate(userData?.updatedAt)}
            </Text>
          </View>
        </View>

        {/* Edit Button */}
        <View className='px-4 mb-8'>
          <TouchableOpacity
            onPress={toggleEditModal}
            className='py-3 rounded-lg items-center'
            style={{ backgroundColor: "#FF1A5A" }}>
            <Text className='text-white font-bold'>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        onRequestClose={toggleEditModal}
        animationType='slide'>
        <View className='flex-1 bg-white'>
          {/* Modal Header with Back Button */}
          <View className='flex-row items-center p-4 border-b border-gray-200'>
            <TouchableOpacity onPress={toggleEditModal} className='p-2'>
              <Ionicons name='arrow-back' size={24} color='#333' />
            </TouchableOpacity>
            <Text className='text-xl font-bold ml-4'>Edit Profile</Text>
          </View>

          <ScrollView className='p-6'>
            {/* Profile Image */}
            <View className='items-center mb-6'>
              <TouchableOpacity onPress={pickImage} disabled={imageUploading}>
                {imageUploading ? (
                  <View className='w-24 h-24 rounded-full bg-gray-200 items-center justify-center'>
                    <ActivityIndicator size='small' color='#FF1A5A' />
                  </View>
                ) : (
                  <Image
                    source={{
                      uri: userData.image || "https://via.placeholder.com/150",
                    }}
                    className='w-24 h-24 rounded-full border-2 border-gray-200'
                  />
                )}
                <Text className='text-blue-500 mt-2 text-center'>
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Name */}
            <View className='mb-4'>
              <Text className='text-gray-500 text-sm'>Full Name</Text>
              <TextInput
                value={userData.name}
                onChangeText={(text) => handleChange("name", text)}
                className='border border-gray-200 rounded-lg p-3 mt-1'
                placeholder='Enter your full name'
              />
              {errors.name && (
                <Text className='text-red-500 text-sm mt-1'>{errors.name}</Text>
              )}
            </View>

            {/* Username */}
            <View className='mb-4'>
              <Text className='text-gray-500 text-sm'>Username</Text>
              <TextInput
                value={userData.userName}
                onChangeText={(text) => handleChange("userName", text)}
                className='border border-gray-200 rounded-lg p-3 mt-1'
                autoCapitalize='none' // Usernames are typically lowercase/no spaces
                autoCorrect={false}
                placeholder='Enter username'
              />
              {errors.userName && (
                <Text className='text-red-500 text-sm mt-1'>
                  {errors.userName}
                </Text>
              )}
            </View>

            {/* Email */}
            <View className='mb-4'>
              <Text className='text-gray-500 text-sm'>Email</Text>
              <TextInput
                value={userData.email}
                onChangeText={(text) => handleChange("email", text)}
                className='border border-gray-200 rounded-lg p-3 mt-1'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Enter email'
              />
              {errors.email && (
                <Text className='text-red-500 text-sm mt-1'>
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Phone Number */}
            <View className='mb-4'>
              <Text className='text-gray-500 text-sm'>Phone Number</Text>
              <View className='flex-row'>
                <TouchableOpacity
                  className='border border-gray-200 rounded-lg p-3 mt-1 mr-2 w-24 items-center'
                  onPress={() => setShowCountryModal(true)}>
                  <Text>
                    {userData.countryCode?.flag}{" "}
                    {userData.countryCode?.dial_code}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  value={userData.phone}
                  onChangeText={(text) => handleChange("phone", text)}
                  className='border border-gray-200 rounded-lg p-3 mt-1 flex-1'
                  keyboardType='phone-pad'
                  placeholder='Enter phone number'
                />
              </View>
              {errors.phone && (
                <Text className='text-red-500 text-sm mt-1'>
                  {errors.phone}
                </Text>
              )}
            </View>

            {/* Role */}
            <View className='mb-4'>
              <Text className='text-gray-500 text-sm'>Role</Text>
              <TouchableOpacity
                className='border border-gray-200 rounded-lg p-3 mt-1'
                onPress={() => setShowRoleModal(true)}>
                <Text className='capitalize'>
                  {userData.role || "Select Role"}
                </Text>
              </TouchableOpacity>
              {errors.role && (
                <Text className='text-red-500 text-sm mt-1'>{errors.role}</Text>
              )}
            </View>

            {/* Gender */}
            <View className='mb-6'>
              <Text className='text-gray-500 text-sm'>Gender</Text>
              <TouchableOpacity
                className='border border-gray-200 rounded-lg p-3 mt-1'
                onPress={() => setShowGenderModal(true)}>
                <Text className='capitalize'>
                  {userData.gender || "Select Gender"}
                </Text>
              </TouchableOpacity>
              {errors.gender && (
                <Text className='text-red-500 text-sm mt-1'>
                  {errors.gender}
                </Text>
              )}
            </View>

            {/* Action Buttons */}
            <View className='flex-row justify-between mb-8'>
              <TouchableOpacity
                onPress={() => handleCancel()}
                className='py-3 px-6 rounded-lg border border-gray-300 flex-1 mr-2 items-center'>
                <Text className='text-gray-700 font-bold'>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleUpdateProfile}
                disabled={imageUploading || isUpdatingProfile} // Disable while image is uploading or profile is updating
                className={`py-3 px-6 rounded-lg flex-1 ml-2 items-center ${
                  imageUploading || isUpdatingProfile ? "bg-gray-200" : " bg-[#FF1A5A]"
                }`}>
                {imageUploading || isUpdatingProfile ? (
                  <View className='flex-row gap-2 items-center justify-center'>
                    <ActivityIndicator size='small' color='#FFF' /> {/* Changed color to white for better visibility on gray background */}
                    <Text className='text-white font-bold'>
                      {imageUploading ? "Image Uploading" : "Updating Profile"}
                    </Text>
                  </View>
                ) : (
                  <Text className='text-white font-bold'>Update Profile</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
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
                  handleChange("gender", gender.toLowerCase());
                  setShowGenderModal(false);
                }}>
                <Text className='text-lg'>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

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
                  handleChange("role", role.toLowerCase());
                  setShowRoleModal(false);
                }}>
                <Text className='text-lg'>{role}</Text>
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
                    handleChange("countryCode", item);
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
    </View>
  );
};

export default UserProfile;