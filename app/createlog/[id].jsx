import { Text, View, TextInput, Appearance, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import GestureRecognizer from 'react-native-swipe-gestures';
import Feather from '@expo/vector-icons/Feather';


const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function CreateLog() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [plane, setPlane] = useState("");
    const [logs, setLogs] = useState([]);
    const router = useRouter();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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
                { id: newId, title, arrival, departure, plane, hours, minutes, date: formattedDate, text, completed: false },
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
            setFormattedDate("");
            setHours("");
            setMinutes("");
            setPlane("")
            setText("");
        }
        router.push('/(tabs)/logbook');
    };

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            const day = selectedDate.getDate().toString().padStart(2, "0");
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
            const year = selectedDate.getFullYear();
            setFormattedDate(`${day}/${month}/${year}`);
        }
    };    
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={addLog}
            onSwipeRight={() => {router.push("/(tabs)/logbook")}}
            config={config}
            style={styles.swipe}
        >
        <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10} style={styles.container}>
                <Text style={styles.heading}>Create Log</Text>
                <View>
                    <TextInput
                        style={styles.titleInput}
                        maxLength={14}
                        placeholder="Title"
                        placeholderTextColor={theme.inPlaceholder}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View style={{flexDirection: "row"}}>
                    <TextInput
                    style={styles.dateInput}
                    maxLength={4}
                    placeholder="Dep"
                    placeholderTextColor={theme.inPlaceholder}
                    value={departure}
                    onChangeText={setDeparture}
                    />
                    <Text style={{color: "gray", fontSize: 36}}> - </Text>
                    <TextInput
                    style={styles.dateInput}
                    maxLength={4}
                    placeholder="Arr"
                    placeholderTextColor={theme.inPlaceholder}
                    value={arrival}
                    onChangeText={setArrival}
                    />
                    <TextInput
                    style={[styles.dateInput, styles.planeInput]}
                    maxLength={8}
                    placeholder="Aircraft"
                    placeholderTextColor={theme.inPlaceholder}
                    value={plane}
                    onChangeText={setPlane}
                    />
                </View>
                <View style={{flexDirection: "row", marginBottom: 10}}>
                    <Pressable onPress={showDatepicker}>
                        <Feather name="calendar" size={30} color={theme.text} />
                    </Pressable>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        />                    
                    )}
                </View>
                <View style={{flexDirection: "row", gap: 20,}}>
                    <TextInput
                        style={styles.dateInput}
                        maxLength={2}
                        placeholder="Hrs"
                        placeholderTextColor={theme.inPlaceholder}
                        value={hours}
                        onChangeText={setHours}
                    />
                    <TextInput
                        style={styles.dateInput}
                        maxLength={2}
                        placeholder="Mins"
                        placeholderTextColor={theme.inPlaceholder}
                        value={minutes}
                        onChangeText={setMinutes}
                    />
                </View>
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Text"
                            placeholderTextColor={theme.inPlaceholder}
                            value={text}
                            onChangeText={setText}
                            multiline={true}
                            scrollEnabled={false}
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
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: "center",
        width: "100%",
    },
    swipe: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    heading: {
        color: theme.highlight,
        fontFamily: theme.font,
        fontSize: 30,
        fontWeight: "bold",
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
        fontWeight: "400",
        borderRadius: 10,
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
        borderRadius: 10,
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
        borderRadius: 10,
        padding: 10,
        minWidth: "90%",
        maxWidth: "90%",
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