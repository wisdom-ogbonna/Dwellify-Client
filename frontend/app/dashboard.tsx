import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { COLORS } from "./constants/colors";
import { ComponentProps } from "react";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

const categories: { id: string; icon: MaterialIconName; label: string }[] = [
  { id: "1", icon: "weekend", label: "Studio" },
  { id: "2", icon: "hotel", label: "1 Bedroom" },
  { id: "3", icon: "hotel", label: "2 Bedroom" },
  { id: "4", icon: "hotel-class", label: "3 Bedroom" },
  { id: "5", icon: "villa", label: "Duplex" },
  { id: "6", icon: "king-bed", label: "Penthouse" },
  { id: "7", icon: "holiday-village", label: "Shortlet" },
  { id: "8", icon: "business", label: "Office" },
  { id: "9", icon: "terrain", label: "Land" },
  { id: "10", icon: "storefront", label: "Shop" },
  { id: "11", icon: "warehouse", label: "Warehouse" },
  { id: "12", icon: "more-horiz", label: "More" },
];

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/dwellify-black-nobg.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <MaterialIcons name="notifications-none" size={28} color={COLORS.PRIMARY_TEXT} />
        </View>

        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hi, John 👋</Text>
          <Text style={styles.subtitle}>Choose your property type</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.INACTIVE_DOT} />
          <TextInput
            placeholder="Search properties, services..."
            style={styles.searchInput}
          />
        </View>

        {/* Categories Glassmorphic Panel */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.glassWrapper}>
          <BlurView intensity={50} tint="light" style={styles.glassPanel}>
            {categories.map((item) => (
              <GlassAction key={item.id} icon={item.icon} label={item.label} />
            ))}
          </BlurView>
        </View>

        {/* Promo Section */}
        <View style={styles.promo}>
          <Text style={styles.promoTitle}>Safe Transactions</Text>
          <Text style={styles.promoDescription}>
            Learn how to pay securely and avoid scams.
          </Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <MaterialIcons name="home" size={24} color={COLORS.PRIMARY} />
          <MaterialIcons name="receipt-long" size={24} color={COLORS.INACTIVE_DOT} />
          <Ionicons name="chatbubble-ellipses" size={24} color={COLORS.INACTIVE_DOT} />
          <MaterialIcons name="person" size={24} color={COLORS.INACTIVE_DOT} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

type GlassActionProps = {
  icon: MaterialIconName;
  label: string;
};

function GlassAction({ icon, label }: GlassActionProps): React.JSX.Element {
  return (
    <Pressable style={styles.glassItem}>
      <MaterialIcons name={icon} size={28} color={COLORS.PRIMARY_TEXT} />
      <Text style={styles.glassLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  logo: {
    width: 200,
    height: 60,
  },
  greeting: {
    marginTop: 16,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.PRIMARY_TEXT,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.SECONDARY_TEXT,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: COLORS.PRIMARY_TEXT,
    outline: "none",
    borderWidth: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: COLORS.PRIMARY_TEXT,
  },
  glassWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassPanel: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.GLASS_CARD,
    borderWidth: 1,
    borderColor: COLORS.GLASS_BORDER,
  },
  glassItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
  glassLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: COLORS.PRIMARY_TEXT,
    fontWeight: "600",
  },
  promo: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.BACKGROUND,
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: COLORS.BACKGROUND,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: COLORS.INACTIVE_DOT,
    marginTop: 16,
  },
});
