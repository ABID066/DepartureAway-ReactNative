import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useLocalSearchParams } from "expo-router";
import useUploadImage from "@/hooks/useUploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useServicePackages } from "@/hooks/useServicePackages";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["flight", "hotel", "tour", "car", "guider", "lost-bag"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  location: z.string().min(1, "Location is required"),
  basicPrice: z
    .string()
    .min(1, "Basic price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid price",
    }),
  standardPrice: z
    .string()
    .min(1, "Standard price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid price",
    }),
  premiumPrice: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
});

type ServiceForm = z.infer<typeof serviceSchema>;

const UpdateExclusiveOfferData = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const { getServiceById, updateService } = useServicePackages();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = imageUploading || isSubmitting;

  const { data, isLoading: isFetching } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => await getServiceById(id as string),
    enabled: !!id,
  });
  const service = data?.data;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "flight",
      location: "",
      basicPrice: "",
      standardPrice: "",
      premiumPrice: "",
      duration: "",
      images: [],
    },
  });

  useEffect(() => {
    if (service) {
      reset({
        title: service.title || "",
        description: service.description || "",
        category: service.category || "flight",
        location: service.location || "",
        basicPrice: service.price_basic ? String(service.price_basic) : "",
        standardPrice: service.price_standard ? String(service.price_standard) : "",
        premiumPrice: service.price_premium ? String(service.price_premium) : "",
        duration: service.duration_days ? String(service.duration_days) : "",
        images: service.media_urls ? [service.media_urls].flat() : [],
      });
    }
  }, [service, reset]);

  const { mutateAsync } = useMutation({
    mutationFn: async (serviceData: any) => {
      const { data } = await updateService(id as string, serviceData);
      return data;
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to update service",
      });
      console.error("Service update failed", err);
    },
    mutationKey: ["update-service", "services", id],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Service updated successfully",
      });
      router.push("/dashboard/services/exclusive-offer");
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

  const onSubmit = async (data: ServiceForm) => {
    setIsSubmitting(true);
    const {
      basicPrice,
      standardPrice,
      premiumPrice,
      title,
      description,
      category,
      location,
      duration,
      images,
    } = data;
    const serviceData = {
      title,
      description,
      location,
      duration_days: duration,
      price_basic: basicPrice,
      price_standard: standardPrice,
      price_premium: premiumPrice,
      category,
      media_urls: images[0],
    };
    await mutateAsync(serviceData);
  };

  if (isFetching) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FF1A5A" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Update Service</Text>

      {/* Title */}
      <Text className="text-gray-700 mb-1">Title *</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-1"
            placeholder="Enter service title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && (
        <Text className="text-red-500 mb-2">{errors.title.message}</Text>
      )}

      {/* Description */}
      <Text className="text-gray-700 mb-1">Description *</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="border border-gray-300 rounded-md p-3 h-24 mb-1"
            placeholder="Enter description"
            multiline
            textAlignVertical="top"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.description && (
        <Text className="text-red-500 mb-2">{errors.description.message}</Text>
      )}

      {/* Category */}
      <Text className="text-gray-700 mb-1">Category *</Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <View className="border border-gray-300 rounded-md mb-1">
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Flight" value="flight" />
              <Picker.Item label="Hotel" value="hotel" />
              <Picker.Item label="Tour" value="tour" />
              <Picker.Item label="Car" value="car" />
              <Picker.Item label="Guider" value="guider" />
              <Picker.Item label="Lost Bag" value="lost-bag" />
            </Picker>
          </View>
        )}
      />
      {errors.category && (
        <Text className="text-red-500 mb-2">{errors.category.message}</Text>
      )}

      {/* Prices */}
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text className="text-gray-700 mb-1">Basic Price *</Text>
          <Controller
            control={control}
            name="basicPrice"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className="border border-gray-300 rounded-md p-3"
                placeholder="Basic"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.basicPrice && (
            <Text className="text-red-500">{errors.basicPrice.message}</Text>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-gray-700 mb-1">Standard Price *</Text>
          <Controller
            control={control}
            name="standardPrice"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className="border border-gray-300 rounded-md p-3"
                placeholder="Standard"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.standardPrice && (
            <Text className="text-red-500">{errors.standardPrice.message}</Text>
          )}
        </View>
      </View>

      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text className="text-gray-700 mb-1">Premium Price</Text>
          <Controller
            control={control}
            name="premiumPrice"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className="border border-gray-300 rounded-md p-3"
                placeholder="Premium"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.premiumPrice && (
            <Text className="text-red-500">{errors.premiumPrice.message}</Text>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-gray-700 mb-1">Duration (days) *</Text>
          <Controller
            control={control}
            name="duration"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className="border border-gray-300 rounded-md p-3"
                placeholder="Duration"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.duration && (
            <Text className="text-red-500">{errors.duration.message}</Text>
          )}
        </View>
      </View>

      {/* Location */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Location *</Text>
        <Controller
          control={control}
          name="location"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-1"
              placeholder="Enter location"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.location && (
          <Text className="text-red-500 mb-2">{errors.location.message}</Text>
        )}
      </View>

      {/* Upload Images */}
      <View>
        <Text className="text-gray-600 mb-2">Upload Images</Text>
        <TouchableOpacity
          onPress={handleImagePick}
          disabled={isLoading}
          className="border-2 border-dashed border-gray-200 rounded-lg p-6 items-center justify-center">
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
        {errors.images && (
          <Text className="text-red-500 mb-4">{errors.images.message}</Text>
        )}
      </View>

      {/* Buttons */}
      <View className="flex-row justify-end gap-4 mt-6 pb-24">
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg flex-row items-center justify-center ${
            isLoading ? "bg-gray-400" : "bg-[#FF1A5A]"
          }`}>
          <Text
            className={`font-medium ${
              isLoading ? "text-gray-600" : "text-white"
            } mr-2`}>
            {imageUploading
              ? "Image Uploading"
              : isSubmitting
              ? "Updating..."
              : "Update Service"}
          </Text>
          {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateExclusiveOfferData;