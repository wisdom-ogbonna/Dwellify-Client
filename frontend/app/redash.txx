import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "./constants/colors";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoHolder}>
            <Image
            source={require("../assets/images/dwellify-primary.png")}
            style={styles.logoImage}
          />
          <Text style={styles.logo}>DWELLIFY</Text>
          </View>
          <Pressable style={styles.payBtn}>
            <Ionicons name="wallet" size={20} color={COLORS.PRIMARY_TEXT} />
            <Text style={styles.payText}>Pay</Text>
          </Pressable>
        </View>

        {/* Banner Image */}
        <Image
          source={require("../assets/images/for-sale.png")}
          style={styles.banner}
          resizeMode="contain"
        />
        {/* Categories */}
        <View style={styles.categoryCard}>
          <Text style={styles.cardTitle}>Explore Options</Text>
          <Text style={styles.cardSubTitle}>
            For you who know what you’re looking for
          </Text>
          <View style={styles.categories}>
            {[
              { icon: "home-outline", name: "Self Contained" },
              { icon: "bed-outline", name: "1 Bedroom" },
              { icon: "bed-outline", name: "2 Bedroom" },
            ].map((item, index) => (
              <View style={styles.catItem} key={index}>
          <Ionicons name={item.icon as any} size={35} color={COLORS.PRIMARY} />
          <Text style={styles.catText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Destination Search */}
        <View style={styles.destinationCard}>
          <Text style={[styles.cardTitle, { color: COLORS.BUTTON_TEXT }]}>City Destination</Text>
          <Text style={[styles.cardSubTitle, { color: COLORS.BUTTON_TEXT }]}>
            For those of you who want to rent or buy a property
          </Text>
          <View style={styles.searchBar}>
            <Feather name="map-pin" size={20} color="gray" />
            <TextInput
              placeholder="Lekki Phase 1, Lagos..."
              placeholderTextColor="gray"
              style={styles.input}
            />
          </View>
        </View>

            </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={COLORS.PRIMARY} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.ICON_BG} />
          <Text style={styles.navText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={24} color={COLORS.ICON_BG} />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    fontSize: 22,
    marginTop: 3,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  payBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  payText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_TEXT,
  },
  banner: {
    width: "100%",
    height: 180,
    marginVertical: 10,
  },
  destinationCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.BUTTON_TEXT,
  },
  cardSubTitle: {
    fontSize: 13,
    color: COLORS.BUTTON_TEXT,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.BUTTON_TEXT,
  },
  promoBanner: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  promoText: {
    color: COLORS.BACKGROUND,
    fontWeight: "600",
    fontSize: 13,
  },
  categoryCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  catItem: {
    width: "30%",
    alignItems: "center",
    marginVertical: 12,
    backgroundColor: COLORS.CARD_BACKGROUND,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
  },
  catText: {
    fontSize: 12,
    color: COLORS.BUTTON_TEXT,
    marginTop: 4,
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: COLORS.PRIMARY_TEXT,
    marginTop: 4,
  },
});

// Note: The above code is a React Native component for a dashboard screen.
// It includes a header with a logo and payment button, a banner image, and a list of destination cards.