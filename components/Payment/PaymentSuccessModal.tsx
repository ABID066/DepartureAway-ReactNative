import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";

interface PaymentSuccessModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PaymentSuccessModal = ({
  showModal,
  setShowModal,
}: PaymentSuccessModalProps) => {
  const router = useRouter();
  const Cancel = () => {
    setShowModal(false);
    router.replace("/home");
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
          <Image source={images?.successModal} />
          <View className='gap-4'>
            <Text className='text-center text-2xl font-bold text-[#27AE60]'>
              Congratulations!
            </Text>
            <Text className='text-center text-sm font-light text-[#212121]'>
              Your order has been successfully placed. A confirmation email with
              the details has been sent to you. Thank you for choosing us. Get
              ready to experience the best! 🚀
            </Text>
          </View>
          <View className='w-full gap-2'>
            <Link href={"/payment/paymentReceipt"} asChild>
              <TouchableOpacity className='w-full py-[18px] rounded-[100px] bg-[#FF1A5A] focus:outline-none focus:ring-0'>
                <Text className='text-center text-white font-bold text-base'>
                  View E-Receipt
                </Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              onPress={() => Cancel()}
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

export default PaymentSuccessModal;
