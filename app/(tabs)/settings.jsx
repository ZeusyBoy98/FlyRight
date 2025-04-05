import { Text, View, StyleSheet, Pressable, Appearance, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/data/colors";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import GestureRecognizer from 'react-native-swipe-gestures';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Settings() {
    const router = useRouter();

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeRight={() => {router.push("/(tabs)/convert")}}
            config={config}
            style={styles.swipe}
        >
        <View style={styles.container}>
            <Link href="mailto:wetcementstudios@gmail.com?subject=FeedBack" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonTop}>
                    <Text style={styles.buttonText}>Feedback</Text>
                </Pressable>
            </Link>
            <Link href="https://github.com/ZeusyBoy98/FlyRight/issues" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonBottom}>
                    <Text style={styles.buttonText}>Report a Bug</Text>
                </Pressable>
            </Link>
            <Text style={{ color: "gray", marginTop: 30, marginBottom: 3 }}>Support the Developer</Text>
            <Link href="https://buymeacoffee.com/zeusyboy" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonRound}>
                    <Text style={styles.buttonText}>Buy Me a Coffee</Text>
                </Pressable>
            </Link>
            <Text style={{ marginTop: 30 }}>
                <Text style={{ color: "gray", fontFamily: theme.font }}>Made with ❤️ by </Text>
                <Text style={{ color: "gray", fontFamily: theme.font, fontWeight: "bold" }}>ZeusyBoy</Text>
            </Text>
            <Text style={{ color: "gray", fontFamily: theme.font, marginTop: 50 }}>Check FlyRight out on GitHub:</Text>
            <Link href="https://github.com/ZeusyBoy98/FlyRight" style={{ marginHorizontal: "auto" }} asChild>
                <Text style={{ color: "gray", fontFamily: theme.font }}>https://github.com/ZeusyBoy98/FlyRight</Text>
            </Link>
        </View>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.background,
        alignItems: "center",
        paddingTop: "20%",
        width: "100%",
    },
    swipe: {
        flex: 1,
        alignItems: "center",
        width: "100%"
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