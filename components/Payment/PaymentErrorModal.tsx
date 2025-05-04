import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";

interface PaymentErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PaymentErrorModal = ({
  showModal,
  setShowModal,
}: PaymentErrorModalProps) => {
  const router = useRouter();
  const TryAgain = () => {
    setShowModal(false);
    router.reload();
  };
  return (
    <Modal
      visible={showModal}
      animationType='slide'
      transparent={true}
      onRequestClose={() => setShowModal(!showModal)}>
      <View className='h-full w-full justify-center items-center'>
        {/* Dimmed Background Layer */}
        <View className='absolute top-0 left-0 right-0 bottom-0 bg-[#09101D] opacity-70 w-full h-full' />

        {/* Modal Content */}
        <View className='w-[85%] p-8 pt-10 gap-8 bg-white rounded-3xl justify-center items-center z-10 mt-24'>
          <Image source={images?.errorModal} />
          <View className='gap-4'>
            <Text className='text-center text-2xl font-bold text-[#F75555]'>
              Oops, Failed!
            </Text>
            <Text className='text-center text-sm font-light text-[#212121]'>
              Your payment failed.{"\n"}
              Please check your internet connection{"\n"}
              then try again.
            </Text>
          </View>
          <View className='w-full gap-2'>
            <TouchableOpacity
              onPress={() => TryAgain()}
              className='w-full py-[18px] rounded-[100px] bg-[#FF1A5A] focus:outline-none focus:ring-0'>
              <Text className='text-center text-white font-bold text-base'>
                Try Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className='w-full py-[18px] rounded-[100px] bg-[#FF1A5A1A] focus:outline-none focus:ring-0'>
              <Text className='text-center text-[#FF1A5A] font-bold text-base'>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentErrorModal;
