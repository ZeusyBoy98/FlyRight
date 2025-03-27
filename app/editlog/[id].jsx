import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, Appearance, ImageBackground, SafeAreaView, TextInput } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function EditLog() {
    const { id } = useLocalSearchParams();
    const [log, setLog] = useState({});
    const router = useRouter();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Logs");
                const storageLogs = jsonValue ? JSON.parse(jsonValue) : [];
                if (storageLogs.length) {
                    const myLog = storageLogs.find(log => log.id.toString() === id);
                    setLog(myLog || {});
                    if (myLog && myLog.date) {
                        const parts = myLog.date.split('/');
                        const year = parseInt(parts[2], 10);
                        const month = parseInt(parts[1], 10) - 1;
                        const day = parseInt(parts[0], 10);
                        setDate(new Date(year, month, day));
                        setFormattedDate(myLog.date);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            const savedLog = { ...log, title: log.title, date: formattedDate, hours: log.hours, minutes: log.minutes, departure: log.departure, arrival: log.arrival, plane: log.plane, text: log.text };

            const jsonValue = await AsyncStorage.getItem('Logs')
            const storageLogs = jsonValue != null ? JSON.parse(jsonValue) : null

            if (storageLogs && storageLogs.length) {
                const otherLogs = storageLogs.filter(log => log.id !== savedLog.id)
                const allLogs = [...otherLogs, savedLog]
                await AsyncStorage.setItem('Logs', JSON.stringify(allLogs))
            } else {
                await AsyncStorage.setItem('Logs', JSON.stringify([savedLog]))
            }

            router.push(`/logs/${id}`);
        } catch (e) {
            console.error(e)
        }
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

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
            style={styles.titleInput}
            maxLength={14}
            placeholder="Title"
            placeholderTextColor={theme.inPlaceholder}
            value={log?.title || ''}
            onChangeText={(text) => setLog(prev => ({ ...prev, title: text}))}
            />
            <View style={{flexDirection: "row"}}>
                <TextInput
                style={styles.dateInput}
                maxLength={4}
                placeholder="Dep"
                placeholderTextColor={theme.inPlaceholder}
                value={log?.departure || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, departure: text}))}
                />
                <Text style={{color: theme.inPlaceholder, fontSize: 36}}> - </Text>
                <TextInput
                style={styles.dateInput}
                maxLength={4}
                placeholder="Arr"
                placeholderTextColor={theme.inPlaceholder}
                value={log?.arrival || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, arrival: text}))}
                />
                <TextInput
                style={[styles.dateInput, styles.planeInput]}
                maxLength={8}
                placeholder="Aircraft"
                placeholderTextColor={theme.inPlaceholder}
                value={log?.plane || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, plane: text}))}
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
            <TextInput
            style={styles.dateInput}
            maxLength={2}
            placeholder="Hrs"
            placeholderTextColor={theme.inPlaceholder}
            value={log?.hours || ''}
            onChangeText={(text) => setLog(prev => ({ ...prev, hours: text}))}
            />
            <TextInput
            style={styles.dateInput}
            maxLength={2}
            placeholder="Min"
            placeholderTextColor={theme.inPlaceholder}
            value={log?.minutes || ''}
            onChangeText={(text) => setLog(prev => ({ ...prev, minutes: text}))}
            />
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <TextInput
                style={styles.textInput}
                placeholder="Text"
                placeholderTextColor={theme.inPlaceholder}
                value={log?.text || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, text: text}))}
                multiline={true}
                scrollEnabled={false}
                />
                <View style={{ flexDirection: "row", gap: 30, marginBottom: 10, }}>
                    <Pressable onPress={() => router.push(`/logs/${id}`)} style={styles.cancelButton}>
                        <Text style={{ fontSize: 20, color: "white", fontFamily: theme.font }}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={handleSave} style={styles.createButton}>
                        <Text style={{ fontSize: 20, fontFamily: theme.font }}>Save</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
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