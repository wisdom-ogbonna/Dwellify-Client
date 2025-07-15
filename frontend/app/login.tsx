import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { useRouter } from "expo-router";
import { COLORS } from "./constants/colors";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rawPhone, setRawPhone] = useState("");
  const [error, setError] = useState("");

  const sanitizePhone = (input: string) => {
    let clean = input.replace(/\D/g, "");
    if (clean.startsWith("0")) {
      clean = clean.substring(1);
    }
    return clean;
  };

  const validateInputs = () => {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    const clean = sanitizePhone(rawPhone);
    if (!/^[789][01]\d{8}$/.test(clean)) {
      setError("Enter a valid Nigerian phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;

    const cleanedPhone = sanitizePhone(rawPhone);
    setError("");
    router.push({
      pathname: "/otp",
      params: {
        name: name.trim(),
        phone: `+234${cleanedPhone}`,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" />

      <Image
        source={require("../assets/images/dwellify-black-nobg.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Dwellify</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor={COLORS.ICON_BG}
        value={name}
        autoComplete="name"
        onChangeText={setName}
      />

      <View style={styles.phoneContainer}>
        <View style={styles.prefix}>
          <CountryFlag isoCode="NG" size={20} />
          <Text style={styles.prefixText}>+234</Text>
        </View>
        <TextInput
          style={styles.phoneInput}
          placeholder="8012345678"
          placeholderTextColor={COLORS.ICON_BG}
          keyboardType="number-pad"
          maxLength={10}
          value={rawPhone}
          onChangeText={setRawPhone}
          autoComplete="tel"
        />
      </View>

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.BUTTON_TEXT,
  },
  logo: {
    width: 220,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.BUTTON_TEXT,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.INACTIVE_DOT,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    color: COLORS.BUTTON_TEXT,
  },
  phoneContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.INACTIVE_DOT,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  prefix: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 10,
    gap: 6,
    borderRightWidth: 1,
    borderColor: COLORS.INACTIVE_DOT,
  },
  prefixText: {
    fontSize: 16,
    color: COLORS.BUTTON_TEXT,
    fontWeight: "bold",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    color: COLORS.BUTTON_TEXT,
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
    marginBottom: 12,
    marginTop: -10,
  },
});
