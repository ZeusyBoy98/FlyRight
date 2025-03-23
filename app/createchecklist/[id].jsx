import { 
    Text, View, TextInput, Appearance, Pressable, StyleSheet, 
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import Animated from "react-native-reanimated";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function CreateChecklist() {
    const [plane, setPlane] = useState("");
    const [title, setTitle] = useState("");
    const [checklists, setChecklists] = useState([]);
    const [items, setItems] = useState([]);  
    const [newItem, setNewItem] = useState(""); 
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Checklists");
                if (jsonValue !== null) {
                    setChecklists(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem("Checklists", JSON.stringify(checklists));
            } catch (e) {
                console.error(e);
            }
        };
        if (checklists.length > 0) saveData();
    }, [checklists]);

    const addChecklist = async () => {
        if (!plane.trim() || !title.trim() || items.length === 0) return;

        const highestId = checklists.length > 0 ? Math.max(...checklists.map(checklist => checklist.id)) : 0;
        const newId = highestId + 1;
    
        const newChecklists = [
            { id: newId, plane, title, items },
            ...checklists,
        ];
        setChecklists(newChecklists);

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        setPlane("");
        setTitle("");
        setItems([]); 
        
        router.push('/(tabs)/checklists');
    };

    const addItem = () => {
        if (newItem.trim() === "") return;

        setItems([...items, { id: Date.now(), text: newItem }]);
        setNewItem("");

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.heading}>Create Checklist</Text>
                
                {/* Plane and Title Inputs */}
                <View style={{ flexDirection: "row", gap: 30 }}>
                    <TextInput
                        style={styles.planeInput}
                        maxLength={4}
                        placeholder="Aircraft"
                        placeholderTextColor={theme.inPlaceholder}
                        value={plane}
                        onChangeText={setPlane}
                    />
                    <TextInput
                        style={styles.planeInput}
                        maxLength={14}
                        placeholder="Title"
                        placeholderTextColor={theme.inPlaceholder}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Checklist Items */}
                <View style={styles.itemsContainer}>
                    <Text style={styles.subheading}>Checklist Items</Text>
                    <View style={styles.itemInputContainer}>
                        <TextInput
                            style={styles.itemInput}
                            placeholder="Add checklist item..."
                            placeholderTextColor={theme.inPlaceholder}
                            value={newItem}
                            onChangeText={setNewItem}
                        />
                        <Pressable onPress={addItem} style={styles.addItemButton}>
                            <MaterialCommunityIcons name="plus" size={24} color="white" />
                        </Pressable>
                    </View>
                    <Animated.FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.text}</Text>
                                <Pressable onPress={() => removeItem(item.id)} style={styles.deleteButton}>
                                    <MaterialCommunityIcons name="trash-can" size={24} color="white" />
                                </Pressable>
                            </View>
                        )}
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ width: '100%', flex: 1 }}
                    />
                    <View style={{ flexDirection: "row", gap: 30, marginBottom: 10, marginTop: 10 }}>
                        <Pressable onPress={() => router.push('/(tabs)/checklists')} style={styles.cancelButton}>
                            <Text style={{ fontSize: 20, color: "white", fontFamily: theme.font }}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={addChecklist} style={styles.createButton}>
                            <Text style={{ fontSize: 20, fontFamily: theme.font }}>Create</Text>
                        </Pressable>
                    </View>
                </View>
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
        fontSize: 30,
        fontWeight: "bold",
        borderBottomWidth: 3,
        borderBottomColor: theme.text,
        marginTop: "10%",
        marginBottom: 10,
        paddingBottom: 5,
    },
    subheading: {
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 25,
        marginBottom: 10,
    },
    planeInput: {
        backgroundColor: theme.inputBackground,
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 140,
    },
    itemsContainer: {
        width: "90%",
        alignItems: "center",
        marginBottom: 20,
        flex: 1,
    },
    itemInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
    itemInput: {
        flex: 1,
        backgroundColor: theme.inputBackground,
        color: theme.text,
        fontFamily: theme.font,
        fontSize: 18,
        borderRadius: 10,
        padding: 10,
    },
    addItemButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: theme.inputBackground,
        borderRadius: 5,
        marginTop: 5,
    },
    itemText: {
        fontSize: 18,
        color: theme.text,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
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