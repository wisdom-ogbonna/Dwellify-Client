import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { COLORS } from "./constants/colors";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.BACKGROUND },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
});
