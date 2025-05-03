import { View, Text, Modal } from "react-native";

interface PaymentSuccessModalProps {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

const PaymentSuccessModal = ({showModal, setShowModal}: PaymentSuccessModalProps) => {
  return (
    <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={() => setShowModal(!showModal)}>
      <Text>PaymentSuccessModal</Text>
    </Modal>
  );
};

export default PaymentSuccessModal;
