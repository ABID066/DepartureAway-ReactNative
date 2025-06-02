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
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { useServicePackages } from "@/hooks/useServicePackages";

// Validation Schema
const flightServiceSchema = z.object({
  title: z.string().min(1, "Economy Class Title is required"),
  title1: z.string().min(1, "Business Class Title is required"),
  description: z.string().min(1, "Economy Class Description is required"),
  description1: z.string().min(1, "Business Class Description is required"),
  location: z.string().min(1, "Location is required"),
  economicPrice: z
    .string()
    .min(1, "Economy Class Ticket Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid price",
    }),
  businessPrice: z
    .string()
    .min(1, "Business Class Ticket Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Enter a valid price",
    }),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
});

type FlightServiceForm = z.infer<typeof flightServiceSchema>;

const CreateNewFlightService = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { createFlightServicePackage } = useServicePackages();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = imageUploading || isSubmitting;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FlightServiceForm>({
    resolver: zodResolver(flightServiceSchema),
    defaultValues: {
      title: "",
      title1: "",
      description: "",
      description1: "",
      location: "",
      economicPrice: "",
      businessPrice: "",
      images: [],
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (serviceData: FlightServiceData) => {
      const { data } = await createFlightServicePackage(serviceData);
      return data;
    },
    onError: (err) => {
      let errorMessage = "Something went wrong";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      // setError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Failed to Login!",
        text2: errorMessage,
      });
      console.error("Service creation failed", errorMessage);
      setIsSubmitting(false);
    },
    mutationKey: ["create-service", "services"],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Service created successfully",
      });
      reset();
      router.push("/dashboard/services/flight-services");
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

  const onSubmit = async (data: FlightServiceForm) => {
    setIsSubmitting(true);
    const {
      title,
      title1,
      description,
      description1,
      location,
      economicPrice,
      businessPrice,
      images,
    } = data;
    const serviceData: FlightServiceData = {
      title,
      title1,
      description,
      description1,
      location,
      economicPrice,
      businessPrice,
      creatorCategory: user?.role || "",
      createdBy: user?.id || "",
      imageUrl: images,
    };

    console.log(serviceData);
    await mutateAsync(serviceData);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 bg-white p-4'>
      <Text className='text-2xl font-bold mb-6 text-center'>
        Create New Flight Service
      </Text>

      {/* Economy Title */}
      <Text className='text-gray-700 mb-1'>Economy Class Title *</Text>
      <Controller
        control={control}
        name='title'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-2'
            placeholder='Enter economy class title'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && (
        <Text className='text-red-500 mb-2'>{errors.title.message}</Text>
      )}

      {/* Business Title */}
      <Text className='text-gray-700 mb-1'>Business Class Title *</Text>
      <Controller
        control={control}
        name='title1'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-2'
            placeholder='Enter business class title'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title1 && (
        <Text className='text-red-500 mb-2'>{errors.title1.message}</Text>
      )}

      {/* Economy Description */}
      <Text className='text-gray-700 mb-1'>Economy Class Description *</Text>
      <Controller
        control={control}
        name='description'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 h-24 mb-2'
            placeholder='Enter economy class description'
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

      {/* Business Description */}
      <Text className='text-gray-700 mb-1'>Business Class Description *</Text>
      <Controller
        control={control}
        name='description1'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 h-24 mb-2'
            placeholder='Enter business class description'
            multiline
            textAlignVertical='top'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.description1 && (
        <Text className='text-red-500 mb-2'>{errors.description1.message}</Text>
      )}

      {/* Economy Price */}
      <Text className='text-gray-700 mb-1'>Economy Class Ticket Price *</Text>
      <Controller
        control={control}
        name='economicPrice'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-2'
            placeholder='Economy Class Ticket Price in USD'
            keyboardType='numeric'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.economicPrice && (
        <Text className='text-red-500'>{errors.economicPrice.message}</Text>
      )}

      {/* Business Price */}
      <Text className='text-gray-700 mb-1'>Business Class Ticket Price *</Text>
      <Controller
        control={control}
        name='businessPrice'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-2'
            placeholder='Business Class Ticket Price in USD'
            keyboardType='numeric'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.businessPrice && (
        <Text className='text-red-500'>{errors.businessPrice.message}</Text>
      )}

      {/* Location */}
      <Text className='text-gray-700 mb-1'>Location *</Text>
      <Controller
        control={control}
        name='location'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className='border border-gray-300 rounded-md p-3 mb-2'
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
              : "Create Flight Service"}
          </Text>
          {isLoading && <ActivityIndicator size='small' color='#ffffff' />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateNewFlightService;
