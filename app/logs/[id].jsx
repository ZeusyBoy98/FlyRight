import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, Appearance, ImageBackground } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import logview from "@/assets/images/logview.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function ViewLog() {
    const { id } = useLocalSearchParams();
    const [log, setLog] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Logs");
                const storageLogs = jsonValue ? JSON.parse(jsonValue) : [];
                if (storageLogs.length) {
                    const myLog = storageLogs.find(log => log.id.toString() === id);
                    setLog(myLog || {});
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [id]);

    const removeLog = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Logs");
            const storageLogs = jsonValue ? JSON.parse(jsonValue) : [];
            const updatedLogs = storageLogs.filter(log => log.id.toString() !== id);

            await AsyncStorage.setItem("Logs", JSON.stringify(updatedLogs));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            router.push('/(tabs)/logbook');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ImageBackground source={logview} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <View style={{flexDirection: "row", justifyContent: "center", width: "100%", gap: 30, borderBottomColor: "gray", borderBottomWidth: 1,}}>
                    <Text style={styles.titleText}>{log?.title}</Text>
                    <Text style={styles.dateText}>{log?.date}</Text>
                </View>
                <Text style={styles.placeText}>{log?.length}</Text>
                <Text><Text style={styles.placeText}>{log?.departure}</Text><Text style={styles.placeText}> - </Text><Text style={styles.placeText}>{log?.arrival}</Text></Text>
                <Text style={styles.placeText}>{log?.plane}</Text>
                <View style={{width: "70%", height: 10, borderBottomColor: "gray", borderBottomWidth: 1}}></View>
                <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{log?.text}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 30, marginBottom: 100,}}>
                        <Pressable onPress={removeLog}>
                            <MaterialCommunityIcons name="delete" size={43} color="red" />
                        </Pressable>
                        <Pressable onPress={() => router.push('/logbook')} style={styles.exitButton}>
                            <Text style={styles.exitButtonText}>Exit</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
        width: "100%",
    },
    exitButton: {
        backgroundColor: theme.exitButton,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    exitButtonText: {
        fontFamily: theme.font,
        fontSize: 18,
        color: "black",
    },
    titleText: {
        color: theme.highlight,
        fontSize: 30,
        fontFamily: theme.font,
        marginTop: 42,
        paddingBottom: 10,
    },
    placeText: {
        fontFamily: theme.font,
        color: "gray",
        fontSize: 20,
    },
    dateText: {
        fontFamily: theme.font,
        color: "white",
        fontSize: 30,
        marginTop: 42,
    },
    text: {
        fontFamily: theme.font,
        color: "white",
        fontSize: 18,
    },
    textContainer: {
        padding: 10,
        maxWidth: "100%",
        marginVertical: 10,
    },
});
