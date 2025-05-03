import { View, Text, Modal } from "react-native";
import React from "react";

interface PaymentErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PaymentErrorModal = ({
  showModal,
  setShowModal,
}: PaymentErrorModalProps) => {
  return (
    <Modal
      visible={showModal}
      animationType='slide'
      transparent={true}
      onRequestClose={() => setShowModal(!showModal)}>
      <Text>PaymentErrorModal</Text>
    </Modal>
  );
};

export default PaymentErrorModal;
