import { createContext, useState, ReactNode } from "react";
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
  image: z.string().min(1, "Image is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string().min(1, "Gender is required"),
  countryCode: countryCodeSchema,
  username: z.string().min(1, "Username is required"),
});

type FormData = z.infer<typeof signUpSchema>;

type MultiStepFormContextType = {
  step: number;
  setStep: (step: number) => void;
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  validateStep: (step: number) => boolean;
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Define initial form data
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

  // Add resetForm function
  const resetMultiStepForm = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({});
  };

  const validateStep = (currentStep: number) => {
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
    }

    const stepSchema = z.object(
      Object.fromEntries(
        fieldsToValidate.map((field) => [field, signUpSchema.shape[field]])
      )
    );

    try {
      stepSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const formInfo = {
    step,
    setStep,
    formData,
    setFormData: (newData: Partial<FormData>) =>
      setFormData({ ...formData, ...newData }),
    errors,
    setErrors,
    validateStep,
    resetMultiStepForm,
  };

  return (
    <MultiStepFormContext.Provider value={formInfo}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

