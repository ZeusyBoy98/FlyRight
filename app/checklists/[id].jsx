import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, Appearance, ImageBackground, Dimensions } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GestureRecognizer from 'react-native-swipe-gestures';
// import { supabase } from "@/lib/supabase";
import checklistbg from "@/assets/images/checklistbg.jpg";
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get('window').width;

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function ViewChecklist() {
    const { id } = useLocalSearchParams();
    const [checklist, setChecklist] = useState({});
    const [checkboxStates, setCheckboxStates] = useState({});
    const [confettiVisible, setConfettiVisible] = useState(false);
    const router = useRouter();
    const progress = checklist?.items ? Object.values(checkboxStates).filter(isChecked => isChecked).length / checklist.items.length : 0;

    useEffect(() => {
        if (progress === 1 && !confettiVisible) {
            setConfettiVisible(true);
            setTimeout(() => setConfettiVisible(false), 5000); // Hide after 5s
        }
    }, [progress]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Checklists");
                const storageChecklists = jsonValue ? JSON.parse(jsonValue) : [];
                const myChecklist = storageChecklists.find(checklist => checklist.id.toString() === id);
                if (myChecklist) {
                    setChecklist(myChecklist);

                    const storedStates = await AsyncStorage.getItem(`checklistStates_${id}`);
                    if (storedStates) {
                        setCheckboxStates(JSON.parse(storedStates));
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [id]);

    const shareChecklist = async () => {
        try {
            const { title, items, plane, checklistColor } = checklist;
            const { data, error } = await supabase.from("shared_checklists").insert([
                {
                    title,
                    plane,
                    items,
                    checklistColor,
                }
            ]);
    
            if (error) {
                console.error("Error sharing:", error);
                return;
            }
    
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            alert("Checklist shared to public!");
        } catch (e) {
            console.error(e);
            alert("Failed to share checklist.");
        }
    };

    const handleCheckboxPress = async (itemId, isChecked) => {
        const newStates = { ...checkboxStates, [itemId]: isChecked };
        setCheckboxStates(newStates);

        try {
            await AsyncStorage.setItem(`checklistStates_${id}`, JSON.stringify(newStates));
        } catch (e) {
            console.error(e);
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const clearCheckboxes = async () => {
        const clearedStates = {};
        setCheckboxStates(clearedStates);

        try {
            await AsyncStorage.setItem(`checklistStates_${id}`, JSON.stringify(clearedStates));
        } catch (e) {
            console.error(e);
        }
    };

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
            <ImageBackground source={checklistbg} resizeMode="cover" style={styles.container}>
                <View style={styles.headingContainer}>
                    <View style={styles.heading}>
                        <Text style={styles.planeText}>{checklist?.plane}</Text>
                        <Text style={styles.planeText}>{checklist?.title}</Text>
                    </View>
                    <Progress.Bar progress={progress} width={screenWidth * 0.8} height={10} color={checklist.checklistColor}/>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
                    {checklist?.items && checklist.items.length > 0 ? (
                        checklist.items.map(item => (
                            <View key={item.id} style={styles.itemContainer}>
                                <BouncyCheckbox 
                                    size={25}
                                    fillColor={checklist?.checklistColor}
                                    unFillColor="white"
                                    text={item.text}
                                    textStyle={styles.itemText}
                                    iconStyle={{borderColor:theme.highlight}}
                                    innerIconStyle={{borderWidth: 2}}
                                    isChecked={checkboxStates[item.id] || false}
                                    onPress={(isChecked) => handleCheckboxPress(item.id, isChecked)} 
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noItemsText}>No items in this checklist</Text>
                    )}
                </ScrollView>

                <View style={{flexDirection: "row", gap: 30}}>
                    {/* <Pressable onPress={shareChecklist}>
                        <MaterialCommunityIcons name="share" size={40} color="white"/>
                    </Pressable> */}
                    <Pressable onPress={() => router.push("/(tabs)/checklists")} style={styles.exitButton}>
                        <Text style={styles.exitButtonText}>Exit</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push( `/editchecklist/${id}`)}>
                        <MaterialCommunityIcons name="pencil" size={43} color="white" />
                    </Pressable>
                </View>
                <Pressable onPress={clearCheckboxes} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear Checks</Text>
                </Pressable>
                <Pressable onPress={removeChecklist} style={styles.deleteChecklist}>
                    <Text style={styles.deleteChecklistText}>Delete Checklist</Text>
                </Pressable>
            </ImageBackground>
            {confettiVisible && (
                <ConfettiCannon
                    count={100}
                    origin={{ x: 200, y: 0 }}
                    fadeOut={true}
                    explosionSpeed={300}
                    fallSpeed={3000}
                />
            )}
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
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%", 
        borderBottomColor: "gray", 
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingTop: "7%",
        paddingBottom: 5,
    },
    heading: {
        flexDirection: "row", 
        gap: 30,
        justifyContent: "center", 
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
    noItemsText: {
        color: theme.text,
        fontSize: 18,
        marginTop: 20,
    },
    clearButton: {
        backgroundColor: "gray",
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    clearButtonText: {
        fontFamily: theme.font,
        fontSize: 18,
        color: "white",
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