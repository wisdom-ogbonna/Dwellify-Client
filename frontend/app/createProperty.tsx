import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "./constants/colors";

export default function AgentCreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  const handleVideoPick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (res.assets && !res.canceled) {
        setVideo(res.assets[0]);
        console.log("Video URI:", res.assets[0].uri);
      }
    } catch (error) {
      console.warn("Video pick failed:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Property posted successfully.");
    }, 2000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
          <Text style={styles.heading}>Create Property Listing</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />

          <TextInput
            placeholder="Price (₦)"
            value={price?.toString() ?? ""}
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            style={[styles.input, { height: 100 }]}
            multiline
          />

          <Text style={styles.label}>Property Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={propertyType}
              style={styles.picker}
              dropdownIconColor="gray"
              onValueChange={(value) => setPropertyType(value)}
            >
              <Picker.Item label="Select Property Type" value="select-property-type" />
              <Picker.Item label="Self-Contain" value="self-contain" />
              <Picker.Item label="1 Bedroom Flat" value="1bedroomflat" />
              <Picker.Item label="2 Bedroom Flat" value="2bedroomflat" />
            </Picker>
          </View>

          <TouchableOpacity onPress={pickImage} style={styles.imageUploadBtn}>
            <Text style={styles.uploadText}>
              {image ? "Change Image" : "Upload Image"}
            </Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}

          <TouchableOpacity style={styles.uploadBtn} onPress={handleVideoPick}>
            <Text style={[styles.uploadText, { color: COLORS.PRIMARY }]}>
              Upload Video
            </Text>
          </TouchableOpacity>

          {video && (
            <Text style={styles.videoInfo}>Selected: {video.name}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Post Property</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    width: "100%",
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  imageUploadBtn: {
    backgroundColor: COLORS.PRIMARY,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "500",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadBtn: {
    backgroundColor: COLORS.BACKGROUND,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  videoInfo: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
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
