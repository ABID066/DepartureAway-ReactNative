import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Switch,
  Modal,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import useUploadImage from "@/hooks/useUploadImage";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useServicePackages } from "@/hooks/useServicePackages";
import { AxiosError } from "axios";

const specialties = [
  "City Tours",
  "Historical Tours",
  "Adventure Tours",
  "Cultural Tours",
  "Nature & Wildlife",
  "Food Tours",
  "Photography Tours",
  "Hiking & Trekking",
  "Museum Tours",
  "Religious Sites",
  "Architecture Tours",
  "Shopping Tours",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese",
  "Korean",
  "Arabic",
  "Hindi",
  "Bengali",
  "Turkish",
  "Dutch",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Polish",
  "Greek",
];

const guiderServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required"),
  languages: z.array(z.string().min(1)).min(1, "At least one language is required"),
  location: z.string().min(1, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  specialty: z.string().min(1, "Specialty is required"),
  hourlyRate: z.string().min(1, "Hourly rate is required").refine(val => !isNaN(Number(val)), {
    message: "Enter a valid number",
  }),
  dailyRate: z.string().min(1, "Daily rate is required").refine(val => !isNaN(Number(val)), {
    message: "Enter a valid number",
  }),
  isVerified: z.boolean(),
  available: z.boolean(),
  contactInfo: z.string().min(1, "Contact information is required"),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
});

type GuiderServiceForm = z.infer<typeof guiderServiceSchema>;

const CreateNewGuiderService = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { createGuiderServicePackage } = useServicePackages();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [tempSelectedLanguages, setTempSelectedLanguages] = useState<string[]>([]);
  const isLoading = imageUploading || isSubmitting;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<GuiderServiceForm>({
    resolver: zodResolver(guiderServiceSchema),
    defaultValues: {
      name: "",
      bio: "",
      languages: [],
      location: "",
      experience: "",
      specialty: "",
      hourlyRate: "",
      dailyRate: "",
      isVerified: false,
      available: true,
      contactInfo: "",
      images: [],
    },
  });

  const selectedLanguages = watch("languages");
  const selectedSpecialty = watch("specialty");

  const toggleLanguage = (language: string) => {
    if (tempSelectedLanguages.includes(language)) {
      setTempSelectedLanguages(tempSelectedLanguages.filter(lang => lang !== language));
    } else {
      setTempSelectedLanguages([...tempSelectedLanguages, language]);
    }
  };

  const saveLanguages = () => {
    setValue("languages", tempSelectedLanguages);
    setShowLanguageModal(false);
  };

  const selectSpecialty = (specialty: string) => {
    setValue("specialty", specialty);
    setShowSpecialtyModal(false);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (serviceData: GuiderServiceData) => {
      const { data } = await createGuiderServicePackage(serviceData);
      return data;
    },
    onError: (err) => {
      let errorMessage = "Something went wrong";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      Toast.show({
        type: "error",
        text1: "Failed to create service!",
        text2: errorMessage,
      });
      console.error("Service creation failed", errorMessage);
      setIsSubmitting(false);
    },
    mutationKey: ["create-guider-service", "services"],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Guider service created successfully",
      });
      reset();
      router.push("/dashboard/services/guider-services");
      setIsSubmitting(false);
    },
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      try {
        const imageUrl = await uploadImage(imageUri);
        setValue("images", [imageUrl]);
      } catch (err) {
        console.log("Image upload failed error: ", imageUploadError);
        console.error("Image upload failed", err);
      }
    }
  };

  const onSubmit = async (data: GuiderServiceForm) => {
    setIsSubmitting(true);
    const serviceData: GuiderServiceData = {
      ...data,
      hourlyRate: Number(data.hourlyRate),
      dailyRate: Number(data.dailyRate),
      creatorType: user?.role || "",
      createdBy: user?.id || "",
      imageUrl: data.images,
      rating: 0,
      totalReviews: 0,
    };
    await mutateAsync(serviceData);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6 text-center">Create New Guider Service</Text>

      {/* Name */}
      <Text className="text-gray-700 mb-1">Name *</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter guider name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text className="text-red-500 mb-2">{errors.name.message}</Text>}

      {/* Bio */}
      <Text className="text-gray-700 mb-1">Bio *</Text>
      <Controller
        control={control}
        name="bio"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 h-24 mb-2"
            placeholder="Enter guider bio"
            multiline
            textAlignVertical="top"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.bio && <Text className="text-red-500 mb-2">{errors.bio.message}</Text>}

      {/* Specialty */}
      <Text className="text-gray-700 mb-1">Specialty *</Text>
      <TouchableOpacity
        className="border border-gray-300 rounded-md p-3 mb-2"
        onPress={() => setShowSpecialtyModal(true)}
      >
        <Text className={selectedSpecialty ? "text-black" : "text-gray-400"}>
          {selectedSpecialty || "Select specialty"}
        </Text>
      </TouchableOpacity>
      {errors.specialty && <Text className="text-red-500 mb-2">{errors.specialty.message}</Text>}

      {/* Specialty Selection Modal */}
      <Modal
        visible={showSpecialtyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSpecialtyModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-4 w-80 max-h-[80%]">
            <Text className="text-lg font-bold mb-4">Select Specialty</Text>
            <FlatList
              data={specialties}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-200"
                  onPress={() => selectSpecialty(item)}
                >
                  <Text className={selectedSpecialty === item ? "text-[#FF1A5A] font-medium" : ""}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="mt-4 p-3 bg-gray-200 rounded-lg"
              onPress={() => setShowSpecialtyModal(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Languages */}
      <Text className="text-gray-700 mb-1">Languages Spoken *</Text>
      <TouchableOpacity
        className="border border-gray-300 rounded-md p-3 mb-2"
        onPress={() => {
          setTempSelectedLanguages(selectedLanguages || []);
          setShowLanguageModal(true);
        }}
      >
        {selectedLanguages?.length > 0 ? (
          <View className="flex-row flex-wrap">
            {selectedLanguages.map((lang, index) => (
              <View key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex-row items-center">
                <Text>{lang}</Text>
                <Text className="ml-1">×</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-gray-400">Select languages</Text>
        )}
      </TouchableOpacity>
      {errors.languages && <Text className="text-red-500 mb-2">{errors.languages.message}</Text>}

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-4 w-80 max-h-[80%]">
            <Text className="text-lg font-bold mb-4">Select Languages</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-200 flex-row items-center"
                  onPress={() => toggleLanguage(item)}
                >
                  <View className={`w-5 h-5 border rounded mr-3 ${tempSelectedLanguages.includes(item) ? "bg-[#FF1A5A] border-[#FF1A5A]" : "border-gray-400"}`}>
                    {tempSelectedLanguages.includes(item) && (
                      <Text className="text-white text-center">✓</Text>
                    )}
                  </View>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <View className="flex-row mt-4">
              <TouchableOpacity
                className="flex-1 p-3 bg-gray-200 rounded-lg mr-2"
                onPress={() => setShowLanguageModal(false)}
              >
                <Text className="text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 p-3 bg-[#FF1A5A] rounded-lg"
                onPress={saveLanguages}
              >
                <Text className="text-white text-center">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Location */}
      <Text className="text-gray-700 mb-1">Location *</Text>
      <Controller
        control={control}
        name="location"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter location"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.location && <Text className="text-red-500 mb-2">{errors.location.message}</Text>}

      {/* Experience */}
      <Text className="text-gray-700 mb-1">Experience *</Text>
      <Controller
        control={control}
        name="experience"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter experience (e.g., 5 years)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.experience && <Text className="text-red-500 mb-2">{errors.experience.message}</Text>}

      {/* Hourly Rate */}
      <Text className="text-gray-700 mb-1">Hourly Rate (USD) *</Text>
      <Controller
        control={control}
        name="hourlyRate"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter hourly rate"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.hourlyRate && <Text className="text-red-500 mb-2">{errors.hourlyRate.message}</Text>}

      {/* Daily Rate */}
      <Text className="text-gray-700 mb-1">Daily Rate (USD) *</Text>
      <Controller
        control={control}
        name="dailyRate"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter daily rate"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.dailyRate && <Text className="text-red-500 mb-2">{errors.dailyRate.message}</Text>}

      {/* Contact Info */}
      <Text className="text-gray-700 mb-1">Contact Information *</Text>
      <Controller
        control={control}
        name="contactInfo"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter contact information"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.contactInfo && <Text className="text-red-500 mb-2">{errors.contactInfo.message}</Text>}

      {/* Verification Status */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-700">Verified Guide</Text>
        <Controller
          control={control}
          name="isVerified"
          render={({ field: { value, onChange } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{ false: "#767577", true: "#FF1A5A" }}
              thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
            />
          )}
        />
      </View>

      {/* Availability */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-700">Available for Work</Text>
        <Controller
          control={control}
          name="available"
          render={({ field: { value, onChange } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{ false: "#767577", true: "#FF1A5A" }}
              thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
            />
          )}
        />
      </View>

      {/* Upload Images */}
      <View>
        <Text className="text-gray-600 mb-2">Upload Images</Text>
        <TouchableOpacity
          onPress={handleImagePick}
          disabled={isLoading}
          className="border-2 border-dashed border-gray-200 rounded-lg p-6 items-center justify-center"
        >
          <Text className={imageUploading ? "text-gray-600" : "text-[#FF1A5A]"}>
            {imageUploading ? "Image Uploading" : "Upload files"}
          </Text>
          {imageUploading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-gray-400 text-xs mt-1">
              PNG, JPG, GIF up to 10MB
            </Text>
          )}
        </TouchableOpacity>
        {errors.images && <Text className="text-red-500 mb-4">{errors.images.message}</Text>}
      </View>

      {/* Submit Button */}
      <View className="flex-row justify-end gap-4 mt-6 pb-24">
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg flex-row items-center justify-center ${
            isLoading ? "bg-gray-400" : "bg-[#FF1A5A]"
          }`}
        >
          <Text className={`font-medium ${isLoading ? "text-gray-600" : "text-white"} mr-2`}>
            {imageUploading ? "Image Uploading" : isSubmitting ? "Submitting..." : "Create Service"}
          </Text>
          {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateNewGuiderService;