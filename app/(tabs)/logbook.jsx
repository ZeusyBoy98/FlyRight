import { Text, View, Pressable, StyleSheet, FlatList, Appearance, TextInput, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { LinearTransition } from "react-native-reanimated";
import GestureRecognizer from 'react-native-swipe-gestures';
import { LinearGradient } from 'expo-linear-gradient';
import filter from "lodash.filter";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function LogBook() {
    const [logs, setLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fullData, setFullData] = useState([]);
    const router = useRouter();

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

    const handlePress = (id) => {
        router.push(`/logs/${id}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (log) => {
            return contains(log, formattedQuery);
        });
        setLogs(filteredData);
    };

    const contains = (log, query) => {
        return [
            log.title,
            log.departure,
            log.hours,
            log.minutes,
            log.arrival,
            log.date,
            log.plane,
            log.text
        ]
        .some(field => field?.toString().toLowerCase().includes(query));
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handlePress(item.id)} style={styles.logItem}>
            <View style={styles.logContainer}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
            </View>
        </Pressable>
    );

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            // onSwipeLeft={() => {router.push("/(tabs)/flashcards")}}
            onSwipeLeft={() => {router.push("/(tabs)/")}}
            onSwipeRight={() => {router.push("/(tabs)/checklists")}}
            config={config}
            style={styles.swipe}
        >
        <LinearGradient
            colors={theme.secGrad}
            style={styles.background}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <SafeAreaView style={styles.content}>
                <View style={{flexDirection: "row", gap: 10,}}>
                    <View style={styles.search}>
                        <FontAwesome name="search" size={25} color="white" />
                        <TextInput 
                        placeholder='Search' 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        clearButtonMode='always' 
                        placeholderTextColor="white"
                        value={searchQuery}
                        fontSize={24}
                        onChangeText={(query) => handleSearch(query)}
                        />
                    </View>
                    <Pressable 
                    onPress={() => {
                        const newId = logs.length > 0 ? Math.max(...logs.map(log => log.id)) + 1 : 1;
                        router.push(`/createlog/${newId}`);
                    }} 
                    >
                        <MaterialCommunityIcons name="plus-circle" size={50} color={theme.addButton} />
                    </Pressable>
                </View>
                <Animated.FlatList
                    data={logs}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1,}}
                    itemLayoutAnimation={LinearTransition}
                />
                {logs.length == 0 ? <Text style={{color: "white"}}>No Logs Yet</Text> : ""}
            <Pressable onPress={() => {router.push('/stats/')}} style={{position: "absolute", bottom: "5%", right: "5%",}}>
                <FontAwesome name="pie-chart" color="white" size={50}/>
            </Pressable>
            </SafeAreaView>
        </LinearGradient>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
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
    content: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%",
    },
    search: {
        flexDirection: "row",
        gap: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 8,
        width: "80%",
        marginLeft: 15,
        color: theme.text,
        alignItems: "center",
    },
    logItem: {
        width: "100%",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "flex-start",
        minWidth: "90%",
        paddingHorizontal: "5%",
    },
    logContainer: {
        backgroundColor: theme.check,
        paddingVertical: 15,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 15,
    },
    dateText: {
        fontSize: 30,
        fontFamily: theme.font,
        color: "white",
        textAlign: "right",
    },
    titleText: {
        fontSize: 30,
        fontFamily: theme.font,
        color: theme.highlight,
        textAlign: "left",
        flexShrink: 1,
        width: "100%",
    },
});