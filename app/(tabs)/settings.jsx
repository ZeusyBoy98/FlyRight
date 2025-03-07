import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Link href="/howtouse" style={{ marginHorizontal: 'auto'}} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>How To Use</Text>
                </Pressable>
            </Link>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#333333",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        height: 40,
        width: 300,
        minWidth: "50%",
        maxWidth: "100%",
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
    },
})