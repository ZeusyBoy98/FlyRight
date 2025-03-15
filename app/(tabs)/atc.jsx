import { Text, View, StyleSheet, Appearance, ImageBackground } from "react-native";
import { colors } from "@/data/colors";
import clouds from "@/assets/images/clouds.jpg";
import nightClouds from "@/assets/images/nightClouds.jpg";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function ATC() {
    return (
        <View style={styles.container}>
            <ImageBackground source={colorScheme === "light" ? clouds : nightClouds} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Coming Soon™</Text>
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
    text: {
        color: theme.text,
        fontFamily: theme.font,
        fontWeight: "bold",
        fontSize: "40",
    }
})