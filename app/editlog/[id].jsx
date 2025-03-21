import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Pressable, ScrollView, Appearance, ImageBackground, SafeAreaView, TextInput } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import logview from "@/assets/images/logview.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function EditLog() {
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

    const handleSave = async () => {
        try {
            const savedLog = { ...log, title: log.title, date: log.date, length: log.length, departure: log.departure, arrival: log.arrival, plane: log.plane, text: log.text };

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
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
            style={styles.titleInput}
            maxLength={14}
            placeholder="Title"
            placeholderTextColor="gray"
            value={log?.title || ''}
            onChangeText={(text) => setLog(prev => ({ ...prev, title: text}))}
            />
            <View style={{flexDirection: "row"}}>
                <TextInput
                style={styles.dateInput}
                maxLength={4}
                placeholder="Dep"
                placeholderTextColor="gray"
                value={log?.departure || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, departure: text}))}
                />
                <Text style={{color: "gray", fontSize: 36}}> - </Text>
                <TextInput
                style={styles.dateInput}
                maxLength={4}
                placeholder="Arr"
                placeholderTextColor="gray"
                value={log?.arrival || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, arrival: text}))}
                />
                <TextInput
                style={[styles.dateInput, styles.planeInput]}
                maxLength={8}
                placeholder="Aircraft"
                placeholderTextColor="gray"
                value={log?.plane || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, plane: text}))}
                />
            </View>
            <Text style={styles.dateFormat}>Format: xx/xx/xxxx</Text>
            <TextInput
            style={styles.dateInput}
            maxLength={10}
            placeholder="Date"
            placeholderTextColor="gray"
            value={log?.date || ''}
            onChangeText={(text) => setLog(prev => ({ ...prev, date: text}))}
            />
            <TextInput
            style={styles.dateInput}
            maxLength={10}
            placeholder="Length"
            placeholderTextColor="gray"
            value={log?.length || ''}
            onChangeText={(text) => setLog(prev => ({ ...prev, length: text}))}
            />
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <TextInput
                style={styles.textInput}
                placeholder="Text"
                placeholderTextColor="gray"
                value={log?.text || ''}
                onChangeText={(text) => setLog(prev => ({ ...prev, text: text}))}
                multiline={true}
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