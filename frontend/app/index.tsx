// app/index.tsx
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, Pressable } from "react-native";

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Looking for a house?',
    description: 'Find your dream property quickly and easily.',
    image: require("../assets/images/undraw_destination_fkst.svg"),
  },
  {
    key: '2',
    title: 'Connect with reliable agents',
    description: 'Chat with trusted professionals anytime.',
    image: require("../assets/images/undraw_destination_fkst.svg"),
  },
  {
    key: '3',
    title: 'Make it happen',
    description: 'Your new home is just a few taps away.',
    image: require("../assets/images/undraw_destination_fkst.svg"),
  },
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => console.log('Navigate to Login')}
      >
        <Text style={styles.buttonText}>LOG IN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width,
    height,
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    bottom: 100,
    width: width * 0.9,
    padding: 20,
    backgroundColor: "rgba(245,245,245,0.9)",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  pagination: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#888",
    marginHorizontal: 5,
    marginBottom: 30,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: "#00bfa6",
    width: 20,
  },
  button: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: '#00bfa6',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonPressed: {
    backgroundColor: '#009e8c',
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});