import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "./constants/colors";

export default function OfflineScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="wifi-off" size={120} color={COLORS.INACTIVE_DOT} style={styles.icon} />

        <Text style={styles.title}>You're Offline</Text>
        <Text style={styles.description}>
          Please check your internet connection and try again.
        </Text>

        <Pressable
          onPress={onRetry}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="refresh" size={22} color={COLORS.BACKGROUND} />
            <Text style={styles.buttonText}>Retry</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    flexDirection: "row",
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: COLORS.CTA_ACCENT,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.BACKGROUND,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
