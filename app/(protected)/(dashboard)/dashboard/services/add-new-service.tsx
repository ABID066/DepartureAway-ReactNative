import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import useUploadImage from "@/hooks/useUploadImage";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useServicePackages } from "@/hooks/useServicePackages";

// Validation Schema
const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(
    ["flight", "hotel", "tour", "guider", "lost-bag", "others"],
    {
      errorMap: () => ({ message: "Please select a category" }),
    }
  ),
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
  premiumPrice: z
    .string()
    .min(1, "Premium price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid price",
    }),
  duration: z
    .string()
    .min(1, "Duration is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid duration in days",
    }),
  mediaUrls: z.string().optional(),
  //   mediaUrls: z
  //   .string()
  //   .min(1, "Media URL is required")
  //   .url("Media URL must be a valid URL"),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
  //   images: z.array(z.string()).optional(),
});

type ServiceForm = z.infer<typeof serviceSchema>;

const AddNewService = () => {
  const router = useRouter();
  const {createServicePackage} = useServicePackages();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = imageUploading || isSubmitting;
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
      category: "" as
        | "flight"
        | "hotel"
        | "tour"
        | "guider"
        | "lost-bag"
        | "others",
      location: "",
      basicPrice: "",
      standardPrice: "",
      premiumPrice: "",
      duration: "",
      mediaUrls: "",
      images: [],
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (serviceData: ServiceData) => {
      const { data } = await createServicePackage(serviceData);
      return data;
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to create service",
      });
      console.error("Service creation failed", err);
      setIsSubmitting(false);
    },
    mutationKey: ["create-service", "services"],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Service created successfully",
      });
      reset();
      router.push("/dashboard/services");
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
        // Handle image upload error
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
      provider_id: "683069aa6427eb088fdd9e78",
      title: title,
      description: description,
      category: category,
      price_basic: basicPrice,
      price_standard: standardPrice,
      price_premium: premiumPrice,
      location: location,
      duration_days: duration,
      media_urls: images[0],
    };
    await mutateAsync(serviceData);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 bg-white p-4'>
      <Text className='text-2xl font-bold mb-6'>Create New Service</Text>

      {/* Title */}
      <Text className='text-gray-700 mb-1'>Title *</Text>
      <Controller
        control={control}
        name='title'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-1'
            placeholder='Enter service title'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && (
        <Text className='text-red-500 mb-2'>{errors.title.message}</Text>
      )}

      {/* Description */}
      <Text className='text-gray-700 mb-1'>Description *</Text>
      <Controller
        control={control}
        name='description'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 h-24 mb-1'
            placeholder='Enter description'
            multiline
            textAlignVertical='top'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.description && (
        <Text className='text-red-500 mb-2'>{errors.description.message}</Text>
      )}

      {/* Category */}
      <Text className='text-gray-700 mb-1'>Category *</Text>
      <Controller
        control={control}
        name='category'
        render={({ field: { value, onChange } }) => (
          <View className='border border-gray-300 rounded-md mb-1'>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label='Select a category' value='' />
              <Picker.Item label='Flight' value='flight' />
              <Picker.Item label='Hotel' value='hotel' />
              <Picker.Item label='Tour' value='tour' />
              <Picker.Item label='Guider' value='guider' />
              <Picker.Item label='Lost Bag' value='lost-bag' />
              <Picker.Item label='Others' value='others' />
            </Picker>
          </View>
        )}
      />
      {errors.category && (
        <Text className='text-red-500 mb-2'>{errors.category.message}</Text>
      )}

      {/* Location */}
      <Text className='text-gray-700 mb-1'>Location *</Text>
      <Controller
        control={control}
        name='location'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-1'
            placeholder='Enter location'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.location && (
        <Text className='text-red-500 mb-2'>{errors.location.message}</Text>
      )}

      {/* Prices */}
      <View className='flex-row gap-4 mb-4'>
        <View className='flex-1'>
          <Text className='text-gray-700 mb-1'>Basic Price *</Text>
          <Controller
            control={control}
            name='basicPrice'
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className='border border-gray-300 rounded-md p-3'
                placeholder='Basic'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.basicPrice && (
            <Text className='text-red-500'>{errors.basicPrice.message}</Text>
          )}
        </View>
        <View className='flex-1'>
          <Text className='text-gray-700 mb-1'>Standard Price *</Text>
          <Controller
            control={control}
            name='standardPrice'
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className='border border-gray-300 rounded-md p-3'
                placeholder='Standard'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.standardPrice && (
            <Text className='text-red-500'>{errors.standardPrice.message}</Text>
          )}
        </View>
      </View>

      <View className='flex-row gap-4 mb-4'>
        <View className='flex-1'>
          <Text className='text-gray-700 mb-1'>Premium Price *</Text>
          <Controller
            control={control}
            name='premiumPrice'
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className='border border-gray-300 rounded-md p-3'
                placeholder='Premium'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.premiumPrice && (
            <Text className='text-red-500'>{errors.premiumPrice.message}</Text>
          )}
        </View>
        <View className='flex-1'>
          <Text className='text-gray-700 mb-1'>Duration (days) *</Text>
          <Controller
            control={control}
            name='duration'
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                className='border border-gray-300 rounded-md p-3'
                placeholder='Duration'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.duration && (
            <Text className='text-red-500'>{errors.duration.message}</Text>
          )}
        </View>
      </View>

      {/* Media URLs */}
      {/* <Text className='text-gray-700 mb-1'>Media URLs (optional)</Text>
      <Controller
        control={control}
        name='mediaUrls'
        render={({ field }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-4'
            placeholder='Enter comma for separating URLs'
            {...field}
          />
        )}
      /> */}

      {/* Upload Images */}
      <View>
        <Text className='text-gray-600 mb-2'>Upload Images</Text>
        <TouchableOpacity
          onPress={handleImagePick}
          disabled={isLoading}
          className='border-2 border-dashed border-gray-200 rounded-lg p-6 items-center justify-center'>
          <Text className={imageUploading ? "text-gray-600" : "text-[#FF1A5A]"}>
            {imageUploading ? "Image Uploading" : "Upload files"}
          </Text>
          {/* <Text className='text-gray-500 text-sm mt-1'>or drag and drop</Text> */}
          {imageUploading ? (
            <ActivityIndicator size='small' color='#ffffff' />
          ) : (
            <Text className='text-gray-400 text-xs mt-1'>
              PNG, JPG, GIF up to 10MB
            </Text>
          )}
        </TouchableOpacity>
        {errors.images && (
          <Text className='text-red-500 mb-4'>{errors.images.message}</Text>
        )}
      </View>

      {/* Image Picker */}
      {/* <TouchableOpacity
        onPress={handleImagePick}
        className='bg-blue-600 py-3 px-4 rounded-md mb-6'>
        <Text className='text-white text-center font-medium'>
          Upload Images
        </Text>
      </TouchableOpacity> */}

      {/* Submit Button */}
      {/* <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className='bg-green-600 py-3 px-4 rounded-md'>
        <Text className='text-white text-center font-medium'>
          Submit Service
        </Text>
      </TouchableOpacity> */}
      {/* Buttons */}
      <View className='flex-row justify-end gap-4 mt-6 pb-24'>
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
              ? "Form Submitting"
              : "Create Service"}
          </Text>
          {isLoading && <ActivityIndicator size='small' color='#ffffff' />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddNewService;
