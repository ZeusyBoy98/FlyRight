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

export default function Checklists() {
    const [checklists, setChecklists] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fullData, setFullData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Checklists");
                const storageChecklists = jsonValue ? JSON.parse(jsonValue) : [];
                setChecklists(storageChecklists.sort((a, b) => b.id - a.id));

                setFullData(storageChecklists);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const handlePress = (id) => {
        router.push(`/checklists/${id}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (checklist) => {
            return contains(checklist, formattedQuery);
        });
        setChecklists(filteredData);
    };

    const contains = ({plane, title}, query) => {
        if(plane.toLowerCase().includes(query) || title.toLowerCase().includes(query)) {
            return true;
        }

        return false;
    }

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handlePress(item.id)} style={styles.checklistItem}>
            <View style={styles.checklistContainer}>
                <Text style={styles.planeText}>{item.plane}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
        </Pressable>
    );

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={() => {router.push("/(tabs)/logbook")}}
            config={config}
            style={styles.swipe}
        >
            <LinearGradient
                colors={theme.mainGrad}
                style={styles.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.content}>
                    <View style={{flexDirection: "row", gap: 10,}}>
                        {/*<Pressable onPress={() => {router.push('/publicchecklists/')}}>
                            <MaterialCommunityIcons name="magnify" size={50} color={theme.addButton} />
                        </Pressable>*/}
                        <View style={styles.search}>
                            <FontAwesome name="search" size={25} color="white" />
                            <TextInput 
                            placeholder="Search"
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            color={theme.text}
                            placeholderTextColor="white"
                            clearButtonMode='always' 
                            value={searchQuery}
                            fontSize={24}
                            onChangeText={(query) => handleSearch(query)}
                            />
                        </View>
                        <Pressable 
                        onPress={() => {
                            const newId = checklists.length > 0 ? Math.max(...checklists.map(checklist => checklist.id)) + 1 : 1;
                            router.push(`/createchecklist/${newId}`);
                        }} 
                        >
                            <MaterialCommunityIcons name="plus-circle" size={50} color={theme.addButton} />
                        </Pressable>
                    </View>
                    <Animated.FlatList
                        data={checklists}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ flexGrow: 1 }}
                        itemLayoutAnimation={LinearTransition}
                    />
                {checklists.length == 0 ? <Text style={{color: "white"}}>No Checklists Yet</Text> : ""}
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
    content: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%",
    },
    background: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    search: {
        flexDirection: "row",
        gap: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 8,
        // width: "60%",
        width: "80%",
        marginLeft: 15,
    },
    checklistItem: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    checklistContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        padding: 15,
        backgroundColor: theme.check,
        borderRadius: 20, 
    },
    planeText: {
        fontSize: 30,
        fontFamily: theme.font,
        color: "white",
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