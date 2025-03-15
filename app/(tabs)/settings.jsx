import { Text, View, StyleSheet, Pressable, Linking, Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/data/colors";
import { Link } from "expo-router";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Settings() {
    return (
        <View style={styles.container}>
            <Link href="/howtouse" style={{ marginHorizontal: 'auto'}} asChild>
                <Pressable style={styles.buttonTop}>
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
                <Pressable style={styles.buttonBottom}>
                    <Text style={styles.buttonText}>Report A Bug</Text>
                </Pressable>
            </Link>
            <Text style={{color: 'gray', marginTop: 30, marginBottom: 3}}>Support The Developer</Text>
            <Link href="https://buymeacoffee.com/zeusyboy" style={{ marginHorizontal: 'auto' }} asChild>
                <Pressable style={styles.buttonRound}>
                    <Text style={styles.buttonText}>Buy Me A Coffee</Text>
                </Pressable>
            </Link>
            <Text style={{marginTop: 30}}><Text style={{color: "gray", fontFamily: theme.font}}>Made with ❤️ by </Text><Text style={{color: "gray", fontFamily: theme.font, fontWeight: "bold" }}>ZeusyBoy</Text></Text>
            <Pressable style={styles.buttonRound} onPress={() => AsyncStorage.clear()}>
                <Text style={styles.buttonText}>(Debug) Clear Async Storage</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.background,
        alignItems: "center",
        paddingTop: "20%"
    },
    button: {
        height: 50,
        width: "90%",
        minWidth: "50%",
        maxWidth: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(99, 99, 99, 0.23)",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRound: {
        height: 50,
        width: "90%",
        minWidth: "50%",
        maxWidth: "100%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonTop: {
        height: 50,
        width: "90%",
        minWidth: "50%",
        maxWidth: "100%",
        backgroundColor: theme.settingsButton,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(99, 99, 99, 0.23)",
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    buttonBottom: {
        height: 50,
        width: "90%",
        minWidth: "50%",
        maxWidth: "100%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        color: theme.text,
        fontFamily: theme.mid,
        fontSize: 18,
        textAlign: 'center',
        padding: 4,
    },
})