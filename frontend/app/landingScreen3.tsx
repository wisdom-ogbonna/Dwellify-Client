// app/index.tsx
import { Text, View, ImageBackground, StyleSheet, Dimensions, Image, Pressable } from "react-native";
export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/undraw_destination_fkst.svg")}
      style={styles.background}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <Image
        source={require("../assets/images/dwellify-white-nobg.png")}
        style={styles.logo}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>LET'S GET STARTED</Text>
          <Pressable style={styles.button}><Text style={styles.buttonText}>LOG IN</Text></Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    borderTopLeftRadius: 50,
    borderTopRightRadius:  50,
    position: 'absolute',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#000000",
    bottom: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#000000",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 15,
    marginTop: 30,
    paddingHorizontal: 35,
    backgroundColor: '#00bfa6',
    borderRadius: 10,
    borderWidth: 2,
    textAlign: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 30,
    fontWeight: 'bold',
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: 300,
    position: "absolute",
    top: 50,
  }
});
