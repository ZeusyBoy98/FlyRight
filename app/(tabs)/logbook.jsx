import { Text, View, Pressable, StyleSheet, FlatList, Appearance, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { LinearTransition } from "react-native-reanimated";
import filter from "lodash.filter";

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

    const contains = ({title, date, departure, arrival, plane, text}, query) => {
        if(title.toLowerCase().includes(query) || departure.toLowerCase().includes(query) || arrival.toLowerCase().includes(query) || date.toLowerCase().includes(query) || plane.toLowerCase().includes(query) || text.toLowerCase().includes(query)) {
            return true;
        }

        return false;
    }

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handlePress(item.id)} style={styles.logItem}>
            <View style={styles.logContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: "row", gap: 10}}>
                <TextInput 
                placeholder='Search' 
                autoCapitalize="none" 
                autoCorrect={false} 
                color={theme.text}
                clearButtonMode='always' 
                style={styles.search}
                value={searchQuery}
                fontSize={24}
                onChangeText={(query) => handleSearch(query)}
                />
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
                contentContainerStyle={{ flexGrow: 1 }}
                itemLayoutAnimation={LinearTransition}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        width: "80%"
    },
    logItem: {
        width: "100%",
        paddingVertical: 20,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    logContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
    },
    dateText: {
        fontSize: 30,
        fontFamily: theme.font,
        color: theme.dateColor,
        flexShrink: 1,
    },
    titleText: {
        fontSize: 30,
        fontFamily: theme.font,
        color: theme.highlight,
        textAlign: "right",
        flexShrink: 1,
    },
});