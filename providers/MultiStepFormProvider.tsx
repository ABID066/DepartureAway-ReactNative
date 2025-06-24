import { createContext, useState, ReactNode, useContext } from "react"; // Added useContext
import Toast from "react-native-toast-message";
import { z } from "zod";

type CountryCode = {
  code: string;
  dial_code: string;
  flag: string;
  name: string;
};

export const countryCodeSchema = z.object({
  code: z.string().min(1, "Country code is required"),
  dial_code: z.string().min(1, "Dial code is required"),
  flag: z.string().min(1, "Flag is required"),
  name: z.string().min(1, "Country name is required"),
});

export const signUpSchema = z.object({
  image: z.string().min(1, "Profile image is required"), // More descriptive message
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  role: z.string().min(1, "Role is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string().min(1, "Gender is required"),
  countryCode: countryCodeSchema,
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters"), // Added length validation
});

type FormData = z.infer<typeof signUpSchema>;

// Allow errors to be undefined when cleared
type ErrorsType = Record<keyof FormData, string | undefined>;

type MultiStepFormContextType = {
  step: number;
  setStep: (step: number) => void;
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  errors: ErrorsType; // Use the new ErrorsType
  setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>; // Use the new ErrorsType
  validateStep: (step: number, options?: { existingUsernames?: string[] }) => boolean; // Added options
  resetMultiStepForm: () => void;
};

export const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

export const MultiStepFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ErrorsType>({} as ErrorsType); // Initialize as ErrorsType

  const initialFormData: FormData = {
    image: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    gender: "",
    countryCode: {
      code: "US",
      dial_code: "+1",
      flag: "🇺🇸",
      name: "United States",
    },
    username: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const resetMultiStepForm = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({} as ErrorsType); // Reset errors to empty object typed as ErrorsType
  };

  const validateStep = (currentStep: number, options?: { existingUsernames?: string[] }) => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "image",
          "firstName",
          "lastName",
          "phone",
          "email",
          "role",
          "password",
          "gender",
          "countryCode",
        ];
        break;
      case 2:
        fieldsToValidate = ["username"];
        break;
      default:
        return false;
    }

    const currentStepSchema = z.object(
      Object.fromEntries(
        fieldsToValidate.map((field) => [field, signUpSchema.shape[field]])
      )
    );

    try {
      currentStepSchema.parse(formData);

      // --- Custom Username Existence Validation for Step 2 ---
      if (currentStep === 2 && options?.existingUsernames) {
        const usernameInput = formData.username.toLowerCase();
        if (options.existingUsernames.includes(usernameInput)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "This username is already taken. Please choose another.",
          }));
          Toast.show({
            type: "error",
            text1: "Username Not Available!",
            text2: "This username is already taken. Please choose another.",
          });
          return false; // Validation failed
        }
      }
      // --- End Custom Validation ---

      // Clear all errors relevant to the current step after successful validation
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        fieldsToValidate.forEach(field => {
            newErrors[field] = undefined; // Clear the error for this field
        });
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ErrorsType = { ...errors }; // Start with existing errors

        // Clear errors for fields NOT in the current step to avoid stale errors
        Object.keys(newErrors).forEach(key => {
            if (!fieldsToValidate.includes(key as keyof FormData)) {
                newErrors[key as keyof FormData] = undefined;
            }
        });

        // Set new errors for current step's invalid fields
        error.errors.forEach((err) => {
          if (err.path.length) {
            const key = err.path[0] as keyof FormData;
            newErrors[key] = err.message;
          }
        });
        setErrors(newErrors);
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.errors[0]?.message || "Please check your inputs.",
        });
      }
      return false;
    }
  };

  return (
    <MultiStepFormContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData: (newData: Partial<FormData>) =>
          setFormData({ ...formData, ...newData }),
        errors,
        setErrors,
        validateStep,
        resetMultiStepForm,
      }}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

// Custom hook to use the context
const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (context === undefined) {
    throw new Error("useMultiStepForm must be used within a MultiStepFormProvider");
  }
  return context;
};

export default useMultiStepForm;