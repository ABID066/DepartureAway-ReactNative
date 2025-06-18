import React, { useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import useUploadImage from "@/hooks/useUploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useServicePackages } from "@/hooks/useServicePackages";

const countrySchema = z.object({
  title: z.string().min(1, "Country name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().min(1, "Image is required"),
});

type CountryForm = z.infer<typeof countrySchema>;

const UpdateCountry = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getSingleCountryData, updateCountryData } = useServicePackages();
  const { user } = useAuth();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();

  // Fetch existing country
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ["countryService", "services", id],
    queryFn: async () => await getSingleCountryData(id as string),
    enabled: !!id,
  });
  const countryService: CountryData = data?.data;

  // Form setup
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CountryForm>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (countryService) {
      reset({
        title: countryService?.title || "",
        description: countryService?.description || "",
        imageUrl: countryService?.imageUrl || "",
      });
    }
  }, [countryService, reset]);

  // Update mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (countryData: CountryData) => {
      const { data } = await updateCountryData(id as string, countryData);
      return data;
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to update country",
      });
    },
    mutationKey: ["update-country", "services", id],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Country updated successfully",
      });
      router.push("/dashboard/country-data");
    },
  });

  // Image picker
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
      }
    }
  };

  // Submit handler
  const onSubmit = async (data: CountryForm) => {
    const countryData: CountryData = {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
    };
    await mutateAsync(countryData);
  };

  if (isFetching) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FF1A5A" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6 text-center">Update Country</Text>

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
          disabled={imageUploading || isSubmitting}
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
          disabled={imageUploading || isSubmitting}
          className={`px-6 py-3 rounded-lg flex-row items-center justify-center ${
            imageUploading || isSubmitting ? "bg-gray-400" : "bg-[#FF1A5A]"
          }`}
        >
          <Text className={`font-medium ${
            imageUploading || isSubmitting ? "text-gray-600" : "text-white"
          } mr-2`}>
            {imageUploading ? "Image Uploading" : isSubmitting ? "Updating..." : "Update Country"}
          </Text>
          {(imageUploading || isSubmitting) && <ActivityIndicator size="small" color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateCountry;