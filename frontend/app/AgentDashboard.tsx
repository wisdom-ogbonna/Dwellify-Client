import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router/build/exports";

// Sample mock property data
const sampleProperties = [
  {
    id: "1",
    title: "2 Bedroom Apartment",
    status: "Available",
    liked: false,
  },
  {
    id: "2",
    title: "Luxury Duplex",
    status: "Taken",
    liked: true,
  },
  {
    id: "3",
    title: "Studio Apartment",
    status: "Available",
    liked: false,
  },
  {
    id: "4",
    title: "Detached Bungalow",
    status: "Available",
    liked: false,
  },
];

const AgentDashboard = () => {
  const [properties, setProperties] = useState(sampleProperties);

  const deleteProperty = (id: string) => {
    Alert.alert("Delete Property", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () =>
          setProperties((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const toggleLike = (id: string) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const renderItem = ({ item }: { item: typeof sampleProperties[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[
            styles.status,
            {
              color: item.status === "Available" ? "green" : "gray",
            },
          ]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <AntDesign
            name={item.liked ? "heart" : "hearto"}
            size={24}
            color={item.liked ? "red" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteProperty(item.id)}>
          <MaterialIcons name="delete" size={24} color="darkred" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/createProperty")} // routes to createProperty screen
        >
          <Feather name="plus-circle" size={24} color="#fff" />
          <Text style={styles.addText}>Add Property for Rent</Text>
        </TouchableOpacity>

        <FlatList
          data={properties.slice(0, 4)} // show only 4
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={<Text>No properties yet.</Text>}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/AgentDashboard")}>
          <Ionicons name="home-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/createProperty")}>
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Settings coming soon!")}>
          <Ionicons name="settings-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AgentDashboard;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  status: {
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
