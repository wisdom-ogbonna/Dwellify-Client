import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import COLORS from "./constants/colors";

const client = {
  name: "Chinedu Okoro",
  email: "chineduclient@gmail.com",
  phone: "+234 701 456 7890",
  profileImage: "https://i.pravatar.cc/150?img=52",
  savedListings: 12,
  successfulBookings: 5,
  totalSpent: 7800000,
  reviews: 9,
};

type StatBoxProps = {
  label: string;
  value: string | number;
  color?: string;
};

export default function ClientProfile() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.profileCard}>
            <Image source={{ uri: client.profileImage }} style={styles.avatar} />

            <View style={styles.nameRow}>
              <Text style={styles.name}>{client.name}</Text>
            </View>

            <Text style={styles.email}>{client.email}</Text>

            <View style={styles.statsContainer}>
              <StatBox label="Saved Homes" value={client.savedListings} />
              <StatBox label="Bookings" value={client.successfulBookings} />
              <StatBox
                label="Total Spent"
                value={`₦${client.totalSpent.toLocaleString()}`}
                color="green"
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Profile Info</Text>
            <InfoRow icon="user" label="Full Name" value={client.name} />
            <InfoRow icon="envelope" label="Email" value={client.email} />
            <InfoRow icon="phone" label="Phone Number" value={client.phone} />
            <InfoRow icon="heart" label="Saved Listings" value={client.savedListings} />
            <InfoRow icon="calendar" label="Bookings Made" value={client.successfulBookings} />
            <InfoRow icon="dollar" label="Total Spent" value={`₦${client.totalSpent.toLocaleString()}`} />
            <InfoRow icon="comments" label="Reviews" value={client.reviews} />
          </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={30} color={COLORS.ICON_BG} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="calendar-outline" size={30} color={COLORS.ICON_BG} />
            <Text style={styles.navText}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-circle-outline" size={30} color={COLORS.PRIMARY} />
            <Text style={styles.navText}>Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

function StatBox({ label, value, color = "#222" }: StatBoxProps) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <View style={styles.infoRow}>
      <FontAwesome name={icon as any} size={18} color={COLORS.PRIMARY} />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "#777",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 13,
    color: "#555",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 12,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    color: COLORS.PRIMARY_TEXT,
    marginTop: 4,
  },
});
