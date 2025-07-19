import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "./constants/colors";

const { width } = Dimensions.get("window");

export default function NotFound() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGoHome = () => {
    router.replace("./login");
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

        <View style={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
          <Image
            source={require("../assets/images/server-error.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.code}>404</Text>
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.description}>
            The page you’re looking for doesn’t exist or was moved.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleGoHome}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    alignItems: "center",
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.7,
    marginTop: -45,
  },
  code: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.BUTTON_TEXT,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: COLORS.BUTTON_TEXT,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 4,
  },
  buttonPressed: {
    backgroundColor: COLORS.CTA_ACCENT,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.BACKGROUND,
  },
});
