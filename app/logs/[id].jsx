import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, Appearance, ImageBackground } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GestureRecognizer from 'react-native-swipe-gestures';
import { LinearGradient } from 'expo-linear-gradient';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function ViewLog() {
    const { id } = useLocalSearchParams();
    const [log, setLog] = useState({});
    const [bg, setBg] = useState(null);
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

    useEffect(() => {
        const loadSetting = async () => {
            const bgValue = await AsyncStorage.getItem("planebg");
            setBg(bgValue === "true");
        };
        loadSetting();
    }, []);

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

    const handlePress = () => {
        router.push(`/editlog/${id}`)
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={handlePress}
            onSwipeRight={() => {router.push("/(tabs)/logbook")}}
            config={config}
            style={styles.swipe}
        >
        <LinearGradient
            colors={['rgb(17, 132, 255)', 'rgb(15, 64, 164)', 'rgb(4, 19, 44)']}
            style={styles.background}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>{log?.title}</Text>
                    <Text style={styles.dateText}>{log?.date}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.placeText}>{log?.hours} Hours</Text>
                    <Text style={styles.placeText}>{log?.minutes} Minutes</Text>
                </View>
                <View style={{flexDirection: "row", gap: 10}}>
                    <View style={styles.group}>
                        <Text style={styles.placeText}>{log?.departure}</Text>
                        <Text style={styles.placeText}>-</Text>
                        <Text style={styles.placeText}>{log?.arrival}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.placeText}>Aircraft:</Text>
                        <Text style={styles.placeText}>{log?.plane}</Text>
                    </View>
                </View>
                
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
                        <Pressable onPress={handlePress}>
                            <MaterialCommunityIcons name="pencil" size={43} color="white" />
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: 'center',
        justifyContent: "center",
    },
    swipe: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    background: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    header: {
        flexDirection: "row", 
        justifyContent: "center", 
        width: "100%", 
        gap: "10%", 
        backgroundColor: theme.check,
        borderRadius: 20,
        marginBottom: 10,
        paddingTop: "5%",
    },
    group: {
        flexDirection: "row", 
        gap: 10, 
        borderWidth: 1, 
        borderColor: "gray", 
        borderRadius: 10, 
        padding: 10,
        marginBottom: 10,
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
        fontSize: 28,
        marginTop: 42,
    },
    text: {
        fontFamily: theme.font,
        color: "white",
        fontSize: 18,
    },
    textContainer: {
        padding: 20,
        width: "95%",
        maxWidth: "95%",
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'gray',
    },
});
