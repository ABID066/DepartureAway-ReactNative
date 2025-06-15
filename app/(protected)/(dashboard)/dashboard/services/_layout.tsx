import { useAuth } from "@/hooks/useAuth";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProtectedLayout() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const isPermitted =
    user?.role?.toLowerCase() === "agency" ||
    user?.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (!isPermitted) {
          router.replace("/signIn");
          Toast.show({
            type: "error",
            text1:
              "You must be signed in as a Agency or Admin to access this page.",
          });
          logout();
        }
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className='min-h-screen justify-center items-center'>
        <ActivityIndicator size='large' color='#F13F5F' />
      </View>
    );
  }
  if (!user || !isPermitted) {
    return null;
  }

  return <Slot />;
}
