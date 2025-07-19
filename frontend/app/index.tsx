import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "./constants/colors";

const { width } = Dimensions.get("window");
const AUTO_SCROLL_INTERVAL = 4000;

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
  const [paused, setPaused] = useState(false);
  const progressAnims = useRef(SLIDES.map(() => new Animated.Value(0))).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const startProgressAnimation = (index: number) => {
    if (animation.current) animation.current.stop();

    progressAnims[index].setValue(0);
    animation.current = Animated.timing(progressAnims[index], {
      toValue: 1,
      duration: AUTO_SCROLL_INTERVAL,
      useNativeDriver: false,
    });

    animation.current.start(({ finished }) => {
      if (finished && !paused) {
        if (index < SLIDES.length - 1) {
          flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
          setCurrentIndex(index + 1);
        }
      }
    });
  };

  useEffect(() => {
    if (!paused) {
      startProgressAnimation(currentIndex);
    }
  }, [currentIndex, paused]);

  const handlePress = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLongPress = () => {
    setPaused(true);
    if (animation.current) animation.current.stop();
  };

  const handlePressOut = () => {
    setPaused(false);
    startProgressAnimation(currentIndex);
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
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
      delayLongPress={200}
    >
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
        <View style={[styles.progressContainer, { marginTop: insets.top + 8 }]}>
          {progressAnims.map((anim, idx) => (
            <View key={idx} style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          ))}
        </View>

        <Image
          source={require("../assets/images/dwellify-black-nobg.png")}
          style={styles.logo}
          resizeMode="contain"
        />

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
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
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
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
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
  progressContainer: {
    flexDirection: "row",
    width: width * 0.85,
    height: 6,
    alignSelf: "center",
    position: "absolute",
    zIndex: 999,
  },
  progressTrack: {
    flex: 1,
    backgroundColor: COLORS.INACTIVE_DOT,
    marginHorizontal: 2,
    borderRadius: 3,
    overflow: "hidden",
    height: 6,
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.PRIMARY,
  },
  logo: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    width: 100,
    height: 70,
    zIndex: 999,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
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