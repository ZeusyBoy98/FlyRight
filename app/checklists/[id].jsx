import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, Appearance, ImageBackground } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GestureRecognizer from 'react-native-swipe-gestures';
import checklistbg from "@/assets/images/checklistbg.jpg";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function ViewChecklist() {
    const { id } = useLocalSearchParams();
    const [checklist, setChecklist] = useState({});
    const [bg, setBg] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Checklists");
                const storageChecklists = jsonValue ? JSON.parse(jsonValue) : [];
                if (storageChecklists.length) {
                    const myChecklist = storageChecklists.find(checklist => checklist.id.toString() === id);
                    setChecklist(myChecklist || {});
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

    const removeChecklist = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Checklists");
            const storageChecklists = jsonValue ? JSON.parse(jsonValue) : [];
            const updatedChecklists = storageChecklists.filter(checklist => checklist.id.toString() !== id);

            await AsyncStorage.setItem("Checklists", JSON.stringify(updatedChecklists));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            router.push('/(tabs)/checklists');
        } catch (e) {
            console.error(e);
        }
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={() => {router.push( `/editchecklist/${id}`)}}
            onSwipeRight={() => {router.push("/(tabs)/checklists")}}
            config={config}
            style={styles.swipe}
        >
            <ImageBackground source={bg === true ? checklistbg : null} resizeMode="cover" style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.planeText}>{checklist?.plane}</Text>
                    <Text style={styles.planeText}>{checklist?.title}</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
                    {checklist?.items && checklist.items.length > 0 ? (
                        checklist.items.map(item => (
                            <View key={item.id} style={styles.itemContainer}>
                                <BouncyCheckbox 
                                size={25}
                                fillColor={theme.highlight}
                                unFillColor="white"
                                text={item.text}
                                textStyle={styles.itemText}
                                iconStyle={{borderColor:theme.highlight}}
                                innerIconStyle={{borderWidth: 2}}
                                onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}} 
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noItemsText}>No items in this checklist</Text>
                    )}
                </ScrollView>

                <View style={{flexDirection: "row", gap: 30}}>
                    <Pressable onPress={() => router.push("/(tabs)/checklists")} style={styles.exitButton}>
                        <Text style={styles.exitButtonText}>Exit</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push( `/editchecklist/${id}`)}>
                        <MaterialCommunityIcons name="pencil" size={43} color="white" />
                    </Pressable>
                </View>
                <Pressable onPress={removeChecklist} style={styles.deleteChecklist}>
                    <Text style={styles.deleteChecklistText}>Delete Checklist</Text>
                </Pressable>
            </ImageBackground>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.background,
        alignItems: 'center',
    },
    swipe: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    headingContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%", 
        gap: 30, 
        borderBottomColor: "gray", 
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    planeText: {
        color: theme.highlight,
        fontSize: 30,
        fontFamily: theme.font,
        marginTop: 42,
        paddingBottom: 10,
    },
    scrollView: {
        flex: 1,
        width: "100%",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 5,
    },
    itemText: {
        fontSize: 30,
        color: "white",
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
    },
    noItemsText: {
        color: theme.text,
        fontSize: 18,
        marginTop: 20,
    },
    deleteChecklist: {
        backgroundColor: "red",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    deleteChecklistText: {
        fontFamily: theme.font,
        fontSize: 18,
        color: "white",
    },
    exitButton: {
        backgroundColor: "white",
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
});
