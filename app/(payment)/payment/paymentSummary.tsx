import { Text, View } from "react-native";
import React, { useState } from "react";
import PaymentSummaryContent from "@/components/Payment/PaymentSummaryContent";
import PaymentErrorModal from "@/components/Payment/PaymentErrorModal";
import Header2 from "@/components/Shared/(Headers)/Header2";
import PaymentSuccessModal from "@/components/Payment/PaymentSuccessModal";

const PaymentSummary = () => {
  const [showPaymentErrorModal, setShowPaymentErrorModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  return (
    <View className='w-full min-h-screen h-auto bg-white overflow-x-hidden'>
      <Header2 />
      {!showPaymentErrorModal && !showPaymentSuccessModal ? (
        <PaymentSummaryContent />
      ) : !showPaymentErrorModal && showPaymentSuccessModal ? (
        <PaymentSuccessModal
          showModal={showPaymentSuccessModal}
          setShowModal={setShowPaymentSuccessModal}
        />
      ) : showPaymentErrorModal && !showPaymentSuccessModal ? (
        <PaymentErrorModal
          showModal={showPaymentErrorModal}
          setShowModal={setShowPaymentErrorModal}
        />
      ) : (
        <Text className='text-center w-full mt-32 p-6 text-3xl text-red-500 font-bold'>
          Something Went Wrong!
        </Text>
      )}
    </View>
  );
};

export default PaymentSummary;
