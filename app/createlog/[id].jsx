import { Text, View, TextInput, Appearance, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';
import { data } from "@/data/logs";
import { colors } from "@/data/colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function CreateLog() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [date, setDate] = useState("");
    const [plane, setPlane] = useState("");
    const [logs, setLogs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Logs");
                if (jsonValue !== null) {
                    setLogs(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadData();
    }, []);

    const addLog = async () => {
        if (text.trim()) {
            const highestId = logs.length > 0 ? Math.max(...logs.map(log => log.id)) : 0;
            const newId = highestId + 1;
    
            const newLogs = [
                { id: newId, title, arrival, departure, plane, date, text, completed: false },
                ...logs,
            ];
            setLogs(newLogs);
    
            try {
                await AsyncStorage.setItem("Logs", JSON.stringify(newLogs));
            } catch (e) {
                console.error(e);
            }
    
            setTitle("");
            setArrival("");
            setDeparture("");
            setDate("");
            setPlane("")
            setText("");
        }
        router.push('/(tabs)/logbook');
    };
    

    return (
        <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.heading}>Create Log</Text>
                <View>
                    <TextInput
                        style={styles.titleInput}
                        maxLength={20}
                        placeholder="Title"
                        placeholderTextColor="gray"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View style={{flexDirection: "row",}}>
                    <TextInput
                    style={styles.dateInput}
                    maxLength={4}
                    placeholder="Dep"
                    placeholderTextColor="gray"
                    value={departure}
                    onChangeText={setDeparture}
                    />
                    <Text style={{color: "gray", fontSize: 36}}> - </Text>
                    <TextInput
                    style={styles.dateInput}
                    maxLength={4}
                    placeholder="Arr"
                    placeholderTextColor="gray"
                    value={arrival}
                    onChangeText={setArrival}
                    />
                    <TextInput
                    style={[styles.dateInput, styles.planeInput]}
                    maxLength={8}
                    placeholder="Aircraft"
                    placeholderTextColor="gray"
                    value={plane}
                    onChangeText={setPlane}
                    />
                </View>
                <View>
                    <Text style={styles.dateFormat}>Format: xx/xx/xxxx</Text>
                    <TextInput
                        style={styles.dateInput}
                        maxLength={10}
                        placeholder="Date"
                        placeholderTextColor="gray"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Text"
                            placeholderTextColor="gray"
                            value={text}
                            onChangeText={setText}
                            multiline={true}
                        />
                    </View>
                    <View style={{ flexDirection: "row", gap: 30, marginBottom: 10, }}>
                        <Pressable onPress={() => router.push('/(tabs)/logbook')} style={styles.cancelButton}>
                            <Text style={{ fontSize: 20, color: "white", fontFamily: theme.font, }}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={addLog} style={styles.createButton}>
                            <Text style={{ fontSize: 20, fontFamily: theme.font, }}>Create</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: "center",
    },
    heading: {
        color: theme.highlight,
        fontFamily: theme.font,
        fontSize: 50,
        borderBottomWidth: 3,
        borderBottomColor: theme.text,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: "10%",
        marginBottom: 10,
        paddingBottom: 5,
    },
    titleInput: {
        backgroundColor: theme.inputBackground,
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 30,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    dateFormat: {
        color: theme.text,
        fontFamily: theme.font,
    },
    dateInput: {
        backgroundColor: theme.inputBackground,
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 20,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    planeInput: {
        marginLeft: "5%"
    },
    textInput: {
        backgroundColor: theme.inputBackground,
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 18,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        minWidth: "95%",
        maxWidth: "95%",
        marginBottom: 10,
    },
    createButton: {
        backgroundColor: "rgb(150, 239, 255)",
        padding: 5,
        borderRadius: 10,
    },
    cancelButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 10,
    },
});