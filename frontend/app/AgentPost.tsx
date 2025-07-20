import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import COLORS from "./constants/colors";

const { width } = Dimensions.get("window");

export default function AgentPostScreen() {
  const images = [
    require("../assets/images/for-sale.png"),
    require("../assets/images/for-sale.png"),
    require("../assets/images/for-sale.png"),
    require("../assets/images/for-sale.png"),
    require("../assets/images/for-sale.png"),
  ];

  const videoSource = require("../assets/videos/nature.mp4");

  return (
    <ScrollView style={styles.container}>
      {/* Agent Info */}
      <View style={styles.agentInfo}>
        <Image
          source={require("../assets/images/meet-agent.png")}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.agentName}>Chinedu Real Estate</Text>
          <Text style={styles.postTime}>Posted 3h ago • Lagos</Text>
        </View>
      </View>

      {/* Post Content */}
      <View style={styles.postCard}>
        <Text style={styles.houseType}>2 Bedroom Apartment</Text>
        <Text style={styles.description}>
          Spacious and affordable 2-bedroom flat with 2 bathrooms, parking space,
          and 24/7 power supply. Located in a serene environment.
        </Text>

        {/* House Images */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {images.map((img, index) => (
            <Image key={index} source={img} style={styles.houseImage} />
          ))}
        </ScrollView>

        {/* Video (New API) */}
        <Image
          source={require("../assets/images/for-sale.png")}
          style={styles.video}
        />


        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="phone-call" size={22} color="#fff" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="chatbox-ellipses-outline" size={22} color="#fff" />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn}>
            <Ionicons name="bookmark-outline" size={22} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  agentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  agentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  postTime: {
    fontSize: 14,
    color: "gray",
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  houseType: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.PRIMARY_TEXT || "#111",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
  },
  imageScroll: {
    marginVertical: 10,
  },
  houseImage: {
    width: width * 0.7,
    height: 200,
    marginRight: 12,
    borderRadius: 12,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  saveBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
});
