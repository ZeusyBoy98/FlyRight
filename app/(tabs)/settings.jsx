import { Text, View, StyleSheet, Pressable, Appearance, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/data/colors";
import { Link } from "expo-router";
import { useEffect, useState } from "react";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Settings() {
    const [planeBg, setPlaneBg] = useState(false);
    const [homeBg, setHomeBg] = useState(false);

    useEffect(() => {
        const loadSetting = async () => {
            const storedValue2 = await AsyncStorage.getItem("homebg");
            if (storedValue2 !== null) {
                setPlaneBg(JSON.parse(storedValue2));
            }
            const storedValue = await AsyncStorage.getItem("planebg");
            if (storedValue !== null) {
                setPlaneBg(JSON.parse(storedValue));
            }
        };
        loadSetting();
    }, []);

    const saveSetting = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleHome = async () => {
        const newValue = !homeBg;
        setHomeBg(newValue);
        await saveSetting("homebg", newValue);
    };

    const toggleSwitch = async () => {
        const newValue = !planeBg;
        setPlaneBg(newValue);
        await saveSetting("planebg", newValue);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.switch, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 1, borderBottomColor: "rgba(99, 99, 99, 0.23)"}]}>
                <Text style={styles.buttonText}>Home Background</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "rgb(97, 229, 95)" }}
                    thumbColor="white"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleHome}
                    value={homeBg}
                />
            </View>
            <View style={[styles.switch, {borderTopLeftRadius: 0, borderTopRightRadius: 0,}]}>
                <Text style={styles.buttonText}>Airplane Backgrounds</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "rgb(97, 229, 95)" }}
                    thumbColor="white"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={planeBg}
                />
            </View>
            <Text style={{ color: "gray", marginTop: 3, marginBottom: 20 }}>Restart the app after changing settings</Text>
            <Link href="mailto:wetcementstudios@gmail.com?subject=FeedBack" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonTop}>
                    <Text style={styles.buttonText}>FeedBack</Text>
                </Pressable>
            </Link>
            <Link href="https://github.com/ZeusyBoy98/FlyRight/issues" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonBottom}>
                    <Text style={styles.buttonText}>Report A Bug</Text>
                </Pressable>
            </Link>
            <Text style={{ color: "gray", marginTop: 30, marginBottom: 3 }}>Support The Developer</Text>
            <Link href="https://buymeacoffee.com/zeusyboy" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonRound}>
                    <Text style={styles.buttonText}>Buy Me A Coffee</Text>
                </Pressable>
            </Link>
            <Text style={{ marginTop: 30 }}>
                <Text style={{ color: "gray", fontFamily: theme.font }}>Made with ❤️ by </Text>
                <Text style={{ color: "gray", fontFamily: theme.font, fontWeight: "bold" }}>ZeusyBoy</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.background,
        alignItems: "center",
        paddingTop: "20%",
    },
    switch: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        gap: 20,
    },
    buttonTop: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(99, 99, 99, 0.23)",
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    buttonBottom: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonRound: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: theme.text,
        fontFamily: theme.mid,
        fontSize: 18,
        textAlign: "center",
        padding: 4,
    },
});