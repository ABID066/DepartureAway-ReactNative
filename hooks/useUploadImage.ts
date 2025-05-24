import { useState } from "react";
import axios from "axios";

interface UseImageUploadReturn {
  uploadImage: (imageUri: string) => Promise<string>;
  imageUploading: boolean;
  imageUploadError: string | null;
}

const useUploadImage = (): UseImageUploadReturn => {
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const uploadImage = async (imageUri: string): Promise<string> => {
    const fileName = imageUri.split("/").pop() || "photo.jpg";
    const fileType = fileName.split(".").pop();

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: fileName,
      type: `image/${fileType}`,
    } as any);

    setImageUploading(true);
    setImageUploadError(null);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.EXPO_PUBLIC_IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUploading(false);
      return data.data.display_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      setImageUploading(false);
      setImageUploadError("Image upload failed. Please try again.");
      throw error;
    }
  };

  return { uploadImage, imageUploading, imageUploadError };
};

export default useUploadImage;
