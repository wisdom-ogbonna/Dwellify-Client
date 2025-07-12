import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "./constants/colors";

const { width, height } = Dimensions.get("window");

// Use HTTPS stock photos for real estate look
const SLIDES = [
  {
    title: "Find Your Next Home",
    description: "Browse beautiful listings across Nigeria.",
    image: {
      uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    title: "Chat With Verified Agents",
    description: "Connect and book property tours fast.",
    image: {
      uri: "https://images.unsplash.com/photo-1679117349740-c46c819d0373?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    title: "Secure Deals Easily",
    description: "Negotiate and close—all within the app.",
    image: {
      uri: "https://images.unsplash.com/photo-1677154488509-fe97beb93ab2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
];


export default function Index() {
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation per slide
  const [progressWidths] = useState(() =>
    SLIDES.map(() => new Animated.Value(0))
  );
  const [imageAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    startImageAnimation();
    startProgressAnimation(currentIndex);
  }, [currentIndex]);

  const startImageAnimation = () => {
    imageAnim.setValue(0);
    Animated.timing(imageAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const startProgressAnimation = (index: number) => {
    // Reset all
    progressWidths.forEach((anim, i) => {
      anim.stopAnimation();
      if (i < index) anim.setValue(1);
      else anim.setValue(0);
    });

    if (index >= SLIDES.length - 1) {
      progressWidths[index].setValue(1);
      return;
    }

    Animated.timing(progressWidths[index], {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && index < SLIDES.length - 1) {
        flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
      }
    });
  };

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) setCurrentIndex(index);
  };

  const onPressButton = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: SLIDES.length - 1, animated: true });
    } else {
      router.push("./login");
    }
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={styles.slide}>
      <Animated.Image
        source={item.image}
        style={[
          styles.image,
          {
            opacity: imageAnim,
            transform: [
              {
                scale: imageAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.1, 1],
                }),
              },
            ],
          },
        ]}
        resizeMode="cover"
      />

      <View style={styles.textOverlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Image
          source={require("../assets/images/dwellify-black-nobg.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.progressContainer}>
          {progressWidths.map((anim, idx) => (
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

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPressButton}
      >
        <Text style={styles.buttonText}>
          {currentIndex === SLIDES.length - 1 ? "LOG IN" : "GET STARTED"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    position: "absolute",
    top: 40,
    width,
    alignItems: "center",
    zIndex: 10,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    width: width * 0.85,
    height: 2,
    marginTop: 6,
  },
  progressTrack: {
    flex: 1,
    backgroundColor: COLORS.INACTIVE_DOT,
    marginHorizontal: 2,
    borderRadius: 1,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.PRIMARY,
  },
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
  },
  image: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  textOverlay: {
    position: "absolute",
    bottom: height * 0.2,
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: "85%",
    alignItems: "center",
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
    color: COLORS.SECONDARY_TEXT,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 42,
    borderRadius: 14,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: COLORS.CTA_ACCENT,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.BUTTON_TEXT,
  },
  imageOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  width,
  height,
  backgroundColor: "rgba(0,0,0,0.35)",
},
});
