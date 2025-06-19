import { Text, View, Pressable, StyleSheet, FlatList, Appearance, TextInput, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from "react-native-gifted-charts";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Statistics() {
    const [logs, setLogs] = useState([]);
    const [fullData, setFullData] = useState([]);
    const router = useRouter();
    const [planes, setPlanes] = useState([]);
    const [dep, setDep] = useState([]);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Logs");
                const storageLogs = jsonValue ? JSON.parse(jsonValue) : [];
                setLogs(storageLogs.sort((a, b) => b.id - a.id));

                setFullData(storageLogs);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const planeCounts = {};
        for (const log of logs) {
            planeCounts[log.plane] = (planeCounts[log.plane] || 0) + 1;
        }
        setPlanes(planeCounts);

        const chartData = Object.entries(planeCounts).map(([plane, count]) => ({
            value: count,
            text: plane,
            color: getRandomColor(),
        }));

        setPlanes(chartData);
    }, [logs]);

    useEffect(() => {
        const depCounts = {};
        for (const log of logs) {
            depCounts[log.departure] = (depCounts[log.departure] || 0) + 1;
        }
        setDep(depCounts);

        const chartData = Object.entries(depCounts).map(([dep, count]) => ({
            value: count,
            text: dep,
            color: getRandomColor(),
        }));

        setDep(chartData);
    }, [logs]);

    useEffect(() => {
        const arrCounts = {};
        for (const log of logs) {
            arrCounts[log.arrival] = (arrCounts[log.arrival] || 0) + 1;
        }
        setArr(arrCounts);

        const chartData = Object.entries(arrCounts).map(([arr, count]) => ({
            value: count,
            text: arr,
            color: getRandomColor(),
        }));

        setArr(chartData);
    }, [logs]);

    function getRandomColor() {
        const r = Math.floor(Math.random() * 200);
        const g = Math.floor(Math.random() * 200);
        const b = Math.floor(Math.random() * 200);

        const toHex = (val) => val.toString(16).padStart(2, '0');

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => {router.push('/(tabs)/logbook')}} style={{position: "absolute", top: "6.1%", left: "5%",}}>
                <MaterialIcons name="cancel" color="red" size={50} />
            </Pressable>
            <Text style={styles.header}>Stats</Text>
            <ScrollView style={{width: "100%"}} contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
            <View style={styles.box}>
                <Text style={styles.text} >Most Used Planes</Text>
                <PieChart data = {planes} showText textColor="white" />
            </View>
            <View style={styles.box}>
                <Text style={styles.text} >Most Used Departure</Text>
                <PieChart data = {dep} showText textColor="white" />
            </View>
            <View style={styles.box}>
                <Text style={styles.text} >Most Used Arrival</Text>
                <PieChart data = {arr} showText textColor="white" />
            </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.background,
        flex: 1,
        alignItems: "center",
    },
    header: {
        color: theme.highlight,
        fontSize: 50,
        fontWeight: "bold",
    },
    box: {
        borderColor: "gray",
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
    },
    text: {
        color: theme.text,
        fontSize: 30,
    }
})