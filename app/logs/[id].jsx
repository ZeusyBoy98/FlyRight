import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';

export default function ViewLog() {
    const { id } = useLocalSearchParams()
    const [log, setLog] = useState({})
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Logs")
                const storageLogs = jsonValue != null ? JSON.parse(jsonValue) : null;
                if (storageLogs && storageLogs.length) {
                    const myLog = storageLogs.find(log => log.id.toString() === id)
                    setLog(myLog)
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchData(id)
    }, [id])

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{log?.title}</Text>
            <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{log?.text}</Text>
                </View>
                <Pressable onPress={() => router.push('/logbook')} style={styles.exitButton}>
                    <Text style={styles.exitButtonText}>Exit</Text>
                </Pressable>
            </ScrollView>
            
        </View>
    )
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
        paddingHorizontal: "30",
        marginBottom: 20,
    },
    exitButtonText: {
        fontSize: 18,
        color: "black",
    },
    titleText: {
        color: "rgb(150, 239, 255)",
        fontSize: "40",
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
})