import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "./constants/colors";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    title: "Find Your Next Home",
    description: "Browse beautiful listings across Nigeria.",
    image: require("../assets/images/for-sale.png"),
  },
  {
    title: "Chat With Verified Agents",
    description: "Connect and book property tours fast.",
    image: require("../assets/images/meet-agent.png"),
  },
  {
    title: "Secure Deals Easily",
    description: "Negotiate and close—all within the app.",
    image: require("../assets/images/home-settings.png"),
  },
];

export default function Index() {
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePress = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onPressButton = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: SLIDES.length - 1, animated: true });
      setCurrentIndex(SLIDES.length - 1);
    } else {
      router.push("./dashboard");
    }
  };

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.slide}>
        <Image source={item.image} style={styles.illustration} resizeMode="contain" />
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="#000" barStyle="light-content" />
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>

        {/* Logo + Progress Dashes Row */}
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/images/dwellify-black-nobg.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.progressContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  currentIndex >= index && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          renderItem={renderSlide}
          keyExtractor={(_, i) => String(i)}
          getItemLayout={(_, i) => ({
            length: width,
            offset: width * i,
            index: i,
          })}
        />

        <View style={[styles.controlDiv, { paddingBottom: insets.bottom + 16 }]}>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={onPressButton}
          >
            <View style={styles.buttonContent}>
              <MaterialIcons
                name={currentIndex === SLIDES.length - 1 ? "check-circle-outline" : "skip-next"}
                size={22}
                color={COLORS.BACKGROUND}
              />
              <Text style={styles.buttonText}>
                {currentIndex === SLIDES.length - 1 ? "GET STARTED" : "SKIP"}
              </Text>
            </View>
          </Pressable>

          {currentIndex < SLIDES.length - 1 && (
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handlePress}
            >
              <View style={styles.buttonContent}>
                <MaterialIcons name="arrow-forward" size={22} color={COLORS.BACKGROUND} />
                <Text style={styles.buttonText}>NEXT</Text>
              </View>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  logoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 5,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 70,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 6,
  },
  progressDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#888",
  },
  progressDotActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 24,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  textOverlay: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.BUTTON_TEXT,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: COLORS.BUTTON_TEXT,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    elevation: 5,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.4,
  },
  buttonPressed: {
    backgroundColor: COLORS.CTA_ACCENT,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.BACKGROUND,
    marginLeft: 8,
  },
  controlDiv: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
