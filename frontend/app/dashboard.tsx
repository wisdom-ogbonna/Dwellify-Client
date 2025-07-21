import { Feather, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "./constants/colors";

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

  // Swipe gesture to close sidebar
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < -20 && isSidebarVisible) {
        toggleSidebar();
      }
    },
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        {/* Hamburger Button */}
        <TouchableOpacity style={styles.hamburgerWrapper} onPress={toggleSidebar}>
          <View style={styles.hamburgerCircle}>
            <Feather name="menu" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Overlay for dismissing sidebar */}
        {isSidebarVisible && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <Animated.View
          {...panResponder.panHandlers}
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

        {/* Search Form */}
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
                <Picker.Item style={styles.pickerItem} label="Select Type" value="" />
                <Picker.Item style={styles.pickerItem} label="Self-contained" value="selfcontained" />
                <Picker.Item style={styles.pickerItem} label="1 Bedroom" value="1bedroom" />
                <Picker.Item style={styles.pickerItem} label="2 Bedroom" value="2bedroom" />
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
            <Ionicons name="home" size={30} color={COLORS.PRIMARY} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="calendar-outline" size={30} color={COLORS.ICON_BG} />
            <Text style={styles.navText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-circle-outline" size={30} color={COLORS.ICON_BG} />
            <Text style={styles.navText}>Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
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
    top: "7%",
    left: "7%",
    zIndex: 999,
  },
  hamburgerCircle: {
    width: 60,
    height: 60,
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 22,
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
    fontSize: 22,
    marginLeft: 8,
    color: "#333",
    borderWidth: 0,
    outlineWidth: 0,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
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
    fontSize: 22,
    color: "#333",
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: {
    color: COLORS.BACKGROUND,
    fontWeight: "bold",
    fontSize: 22,
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
  sidebar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
    width: width * 0.75,
    backgroundColor: "#fff",
    zIndex: 998,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
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
    fontSize: 22,
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 997,
  },
  pickerItem: {
    fontSize: 22,
    color: "#333",
  },
});
