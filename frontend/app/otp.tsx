import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import COLORS from "./constants/colors";

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams<{ name: string; phone: string }>();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setError("");
    // In production, verify with backend here.
    Alert.alert("Success", `Welcome, ${params.name}! Verified number: ${params.phone}`);
    router.push("/");  // Or wherever you want to go next
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a 6-digit code to
      </Text>
      <Text style={styles.phone}>{params.phone}</Text>

      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        placeholderTextColor={COLORS.ICON_BG}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleVerify}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.BUTTON_TEXT,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.BUTTON_TEXT,
    textAlign: "center",
    marginBottom: 4,
  },
  phone: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 20,
  },
  otpInput: {
    width: "60%",
    borderWidth: 1,
    borderColor: COLORS.BUTTON_TEXT,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 20,
    textAlign: "center",
    color: COLORS.BUTTON_TEXT,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 42,
    borderRadius: 14,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: COLORS.CTA_ACCENT,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.BACKGROUND,
  },
  error: {
    color: COLORS.CTA_ACCENT,
    marginBottom: 8,
  },
});
