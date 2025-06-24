import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { router, Stack } from "expo-router";

const WebViewerPage: React.FC = () => {
  const websiteUrl = "https://departure-away-travel-ai-assistant.vercel.app/";
  const [loading, setLoading] = useState<boolean>(true);

  const goToHomepage = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.customHeader}>
        <TouchableOpacity
          className='bg-blue-400 rounded-2xl'
          onPress={goToHomepage}
          style={styles.headerButton}>
          <Text
            className='flex items-center justify-center'
            style={styles.headerButtonText}>
            Back To Homepage
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.webviewContainer}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size='large' color='#0000ff' />
            <Text style={styles.loadingText}>AI Assistant is Loading...</Text>
          </View>
        )}
        <WebView
          source={{ uri: websiteUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent.description);
            setLoading(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default WebViewerPage;
