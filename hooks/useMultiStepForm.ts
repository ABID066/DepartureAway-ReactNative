import { MultiStepFormContext } from "@/providers/MultiStepFormProvider";
import { useContext } from "react";

const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider"
    );
  }
  return context;
};
export default useMultiStepForm;
