import { Text, View, StyleSheet, Pressable, Linking } from "react-native";
import { Link } from "expo-router";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Link href="/howtouse" style={{ marginHorizontal: 'auto'}} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>How To Use</Text>
                </Pressable>
            </Link>
            <Link 
                href='mailto:wetcementstudios@gmail.com?subject=FeedBack'
                style={{ marginHorizontal: 'auto' }}
                asChild
            >
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>FeedBack</Text>
                </Pressable>
            </Link>
            <Link href="https://github.com/ZeusyBoy98/FlyRight/issues" style={{ marginHorizontal: 'auto'}} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Report A Bug</Text>
                </Pressable>
            </Link>
            <Text style={{color: 'gray', marginTop: 30, marginBottom: 3}}>Support The Developer</Text>
            <Link href="https://buymeacoffee.com/zeusyboy" style={{ marginHorizontal: 'auto' }} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Buy Me A Coffee</Text>
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
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
    },
})