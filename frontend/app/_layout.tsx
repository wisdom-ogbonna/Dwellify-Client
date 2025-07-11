import { Stack } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    
      <View style={styles.overlay}>
        <Stack
          screenOptions={{
            headerTransparent: true,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: "#fff",
            title: '',
          }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
