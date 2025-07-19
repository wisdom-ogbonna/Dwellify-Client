import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import COLORS from "./constants/colors"; // Ensure path is correct

const { width } = Dimensions.get("window");

export default function HomeSearchScreen() {
  const [houseType, setHouseType] = useState("");
  const [location, setLocation] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarX = useState(new Animated.Value(-width))[0];

  const toggleSidebar = () => {
    Animated.timing(sidebarX, {
      toValue: isSidebarVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsSidebarVisible(!isSidebarVisible);
    });
  };

  const handleSearch = () => {
    console.log("Searching for:", houseType, location);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hamburger Button */}
      <TouchableOpacity style={styles.hamburgerWrapper} onPress={toggleSidebar}>
        <View style={styles.hamburgerCircle}>
          <Feather name="menu" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Sidebar Menu */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: sidebarX }],
          },
        ]}
      >
        <View style={styles.sidebarContent}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Centered Form */}
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.heading}>Find Your Home</Text>

          <Text style={styles.label}>House Type</Text>
          <View style={styles.pickerWrapper}>
            <Ionicons name="home-outline" size={20} color="gray" />
            <Picker
              selectedValue={houseType}
              onValueChange={(value) => setHouseType(value)}
              style={styles.picker}
              dropdownIconColor="gray"
            >
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Self-contained" value="selfcontained" />
              <Picker.Item label="1 Bedroom" value="1bedroom" />
              <Picker.Item label="2 Bedroom" value="2bedroom" />
            </Picker>
          </View>

          <Text style={styles.label}>Location</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={20} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Enter location"
              placeholderTextColor="gray"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    backgroundColor: "#f2f2f2",
    position: "relative",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  hamburgerWrapper: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 999,
  },
  hamburgerCircle: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.BACKGROUND,
    width: "90%",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  picker: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: {
    color: COLORS.BACKGROUND,
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: COLORS.PRIMARY_TEXT,
    marginTop: 4,
  },
  sidebar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
    width: width * 0.75,
    backgroundColor: "#fff",
    zIndex: 998,
    elevation: 8,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sidebarContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sidebarItem: {
    marginBottom: 16,
  },
  sidebarText: {
    fontSize: 22,
    color: "#333",
  },
});
