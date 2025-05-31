import React, { useEffect } from "react";
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
import {
  getSingleTravelPackage,
  updateTravelPackage,
} from "@/services/packagesServices";
import { useAuth } from "@/hooks/useAuth";

// Validation Schema (same as AddNewService)
const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(
    [
      "Traveler Choose",
      "hajj",
      "honeymoon",
      "alpine",
      "adventure",
      "cultural",
      "beach",
      "city",
      "nature",
      "luxury",
      "budget",
      "family",
      "pilgrimage",
      "resort",
      "boat-trip",
      "mountain",
      "desert",
    ],
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
  premiumPrice: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
});

type ServiceForm = z.infer<typeof serviceSchema>;

const UpdateTravelService = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { uploadImage, imageUploadError, imageUploading } = useUploadImage();

  // Fetch existing service
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ["travelService", "services", id],
    queryFn: async () => await getSingleTravelPackage(id as string),
    enabled: !!id,
  });
  const travelService: TravelServiceData = data?.data;

  // Form setup
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "" as ServiceForm["category"],
      location: "",
      basicPrice: "",
      standardPrice: "",
      premiumPrice: "",
      duration: "",
      images: [],
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (travelService) {
      reset({
        title: travelService.title || "",
        description: travelService.description || "",
        category: (travelService.category as ServiceForm["category"]) || "",
        location: travelService.location || "",
        basicPrice: travelService.price1 ? String(travelService.price1) : "",
        standardPrice: travelService.price2 ? String(travelService.price2) : "",
        duration: travelService.duration ? String(travelService.duration) : "",
        images: travelService.imageUrl ? [travelService.imageUrl].flat() : [],
      });
    }
  }, [travelService, reset]);

  // Update mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (serviceData: any) => {
      const { data } = await updateTravelPackage(id as string, serviceData);
      return data;
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to update service",
      });
      // console.error("Service update failed", err);
    },
    mutationKey: ["update-service", "services", "service", id],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Service updated successfully",
      });
      router.push("/dashboard/services/travel-services");
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
        setValue("images", [imageUrl]);
      } catch (err) {
        console.log("Image upload failed error: ", imageUploadError);
        console.error("Image upload failed", err);
      }
    }
  };

  // Submit handler
  const onSubmit = async (data: ServiceForm) => {
    const {
      basicPrice,
      standardPrice,
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
      duration,
      price1: basicPrice,
      price2: standardPrice,
      category,
      creatorType: user?.role || "",
      createdBy: user?.id,
      imageUrl: images,
    };
    await mutateAsync(serviceData);
  };

  if (isFetching) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#FF1A5A' />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 bg-white p-4'>
      <Text className='text-2xl font-bold mb-6'>Update Service</Text>

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
              <Picker.Item label='Hajj' value='hajj' />
              <Picker.Item label='Honeymoon' value='honeymoon' />
              <Picker.Item label='Alpine wanders' value='alpine' />
              <Picker.Item label='Adventure Tours' value='adventure' />
              <Picker.Item label='Cultural Tours' value='cultural' />
              <Picker.Item label='Beach & Resort' value='beach' />
              <Picker.Item label='City Tours' value='city' />
              <Picker.Item label='Nature & Wildlife' value='nature' />
              <Picker.Item label='Luxury Travel' value='luxury' />
              <Picker.Item label='Budget Travel' value='budget' />
              <Picker.Item label='Family Tours' value='family' />
              <Picker.Item label='Honeymoon Packages' value='honeymoon' />
              <Picker.Item label='Pilgrimage Tours' value='pilgrimage' />
              <Picker.Item label='Resort Stay' value='resort' />
              <Picker.Item label='Boat Trip' value='boat-trip' />
              <Picker.Item label='Mountains' value='mountain' />
              <Picker.Item label='Desert' value='desert' />
            </Picker>
          </View>
        )}
      />
      {errors.category && (
        <Text className='text-red-500 mb-2'>{errors.category.message}</Text>
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

      {/* Upload Images */}
      <View>
        <Text className='text-gray-600 mb-2'>Upload Images</Text>
        <TouchableOpacity
          onPress={handleImagePick}
          disabled={imageUploading || isSubmitting}
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
          disabled={imageUploading || isSubmitting}
          className={`px-6 py-3 rounded-lg flex-row items-center justify-center ${
            imageUploading || isSubmitting ? "bg-gray-400" : "bg-[#FF1A5A]"
          }`}>
          <Text
            className={`font-medium ${
              imageUploading || isSubmitting ? "text-gray-600" : "text-white"
            } mr-2`}>
            {imageUploading
              ? "Image Uploading"
              : isSubmitting
              ? "Updating..."
              : "Update Service"}
          </Text>
          {(imageUploading || isSubmitting) && (
            <ActivityIndicator size='small' color='#ffffff' />
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateTravelService;
// ...existing code...
