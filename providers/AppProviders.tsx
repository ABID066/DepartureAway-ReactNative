import React from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import { MultiStepFormProvider } from "@/providers/MultiStepFormProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MultiStepFormProvider>{children}</MultiStepFormProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
