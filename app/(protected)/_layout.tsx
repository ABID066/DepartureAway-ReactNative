import{ useAuth }from "@/hooks/useAuth";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/signIn");
        Toast.show({
          type: "error",
          text1: "You must be signed in to access this page.",
        });
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
  if (!user) {
    return null;
  }

  return <Slot />;
}
