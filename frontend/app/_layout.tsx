import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { COLORS } from "./constants/colors";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor={"transparent"} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.BUTTON_TEXT },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BUTTON_TEXT,
  },
});
