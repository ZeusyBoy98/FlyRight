import { Text, View, StyleSheet, ImageBackground, Appearance } from "react-native";
import { colors } from "@/data/colors";
import homepageImage from "@/assets/images/homepage.png";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

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
    backgroundColor: theme.background,
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
    fontFamily: theme.font,
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row", // Places text side by side
    gap: 0, // Adds spacing between them
    backgroundColor: theme.homeTrans,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 100,
  },
  right: {
    color: theme.highlight,
    fontFamily: theme.font,
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },
  credit: {
    color: "white",
    fontFamily: theme.font,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
})