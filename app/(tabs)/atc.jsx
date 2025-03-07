import { Text, View, StyleSheet } from "react-native";

export default function ATC() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Coming Soon™</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#333333",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: "40",
    }
})