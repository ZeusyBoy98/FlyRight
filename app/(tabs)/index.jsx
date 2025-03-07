import { Text, View, StyleSheet, ImageBackground } from "react-native";
import homepageImage from "@/assets/images/homepage.png";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={homepageImage} resizeMode="cover" style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Fly</Text>
          <Text style={styles.right}>Right</Text>
        </View>
        <Text style={styles.credit}>Image Credit: Jose Antunes @ Medium</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#333333"
  },
  image: {
    width: "100%",
    height: "101%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row", // Places text side by side
    gap: 0, // Adds spacing between them
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 100,
  },
  right: {
    color: "rgba(56, 228, 249, 1)",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  credit: {
    color: "white",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
})