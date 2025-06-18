import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import useUploadImage from "@/hooks/useUploadImage";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useServicePackages } from "@/hooks/useServicePackages";

const countrySchema = z.object({
  title: z.string().min(1, "Country name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().min(1, "Image is required"),
});

type CountryForm = z.infer<typeof countrySchema>;

const CreateNewCountry = () => {
  const router = useRouter();
  const { addNewCountryData } = useServicePackages();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = imageUploading || isSubmitting;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CountryForm>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (countryData: CountryData) => {
      const { data } = await addNewCountryData(countryData);
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
        text1: "Failed to create country!",
        text2: errorMessage,
      });
      console.error("Country creation failed", errorMessage);
      setIsSubmitting(false);
    },
    mutationKey: ["create-country", "services"],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Country data created successfully",
      });
      reset();
      router.push("/dashboard/country-data");
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
        setValue("imageUrl", imageUrl);
      } catch (err) {
        console.log("Image upload failed error: ", imageUploadError);
        console.error("Image upload failed", err);
      }
    }
  };

  const onSubmit = async (data: CountryForm) => {
    setIsSubmitting(true);
    const countryData: CountryData = {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
    };
    await mutateAsync(countryData);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6 text-center">Add New Country Data</Text>

      {/* Country Name */}
      <Text className="text-gray-700 mb-1">Country Name *</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-2"
            placeholder="Enter country name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && <Text className="text-red-500 mb-2">{errors.title.message}</Text>}

      {/* Description */}
      <Text className="text-gray-700 mb-1">Description *</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 h-24 mb-2"
            placeholder="Enter description"
            multiline
            textAlignVertical="top"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.description && <Text className="text-red-500 mb-2">{errors.description.message}</Text>}

      {/* Upload Image */}
      <View>
        <Text className="text-gray-600 mb-2">Upload Image *</Text>
        <TouchableOpacity
          onPress={handleImagePick}
          disabled={isLoading}
          className="border-2 border-dashed border-gray-200 rounded-lg p-6 items-center justify-center"
        >
          <Text className={imageUploading ? "text-gray-600" : "text-[#FF1A5A]"}>
            {imageUploading ? "Image Uploading" : "Upload image"}
          </Text>
          {imageUploading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-gray-400 text-xs mt-1">
              PNG, JPG up to 10MB
            </Text>
          )}
        </TouchableOpacity>
        {errors.imageUrl && <Text className="text-red-500 mb-4">{errors.imageUrl.message}</Text>}
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
            {isLoading ? "Processing..." : "Add Country Data"}
          </Text>
          {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateNewCountry;