import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
        <View style={styles.container}>
            <Text style={styles.titleText}>{log?.title}</Text>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{log?.text}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 30 }}>
                    <Pressable onPress={removeLog}>
                        <MaterialCommunityIcons name="delete" size={43} color="red" />
                    </Pressable>
                    <Pressable onPress={() => router.push('/logbook')} style={styles.exitButton}>
                        <Text style={styles.exitButtonText}>Exit</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#333333",
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
        width: "100%",
    },
    exitButton: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    exitButtonText: {
        fontSize: 18,
        color: "black",
    },
    titleText: {
        color: "rgb(150, 239, 255)",
        fontSize: 40,
        marginTop: "10%",
        paddingBottom: 10,
        borderBottomColor: "black",
        borderBottomWidth: 3,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    text: {
        color: "black",
        fontSize: 18,
    },
    textContainer: {
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        maxWidth: "100%",
        marginVertical: 10,
    },
});
