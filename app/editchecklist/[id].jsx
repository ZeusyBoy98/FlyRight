import { 
    Text, View, TextInput, Appearance, Pressable, StyleSheet, 
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Modal 
} from "react-native";
import Animated from "react-native-reanimated";
import { useState, useEffect } from 'react';
import { colors } from "@/data/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from 'expo-haptics';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ColorPicker from 'react-native-wheel-color-picker'   
import Ionicons from '@expo/vector-icons/Ionicons';
import GestureRecognizer from 'react-native-swipe-gestures';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function EditChecklist() {
    const { id } = useLocalSearchParams();
    const [plane, setPlane] = useState("");
    const [title, setTitle] = useState("");
    const [items, setItems] = useState([]);
    const [checklistColor, setChecklistColor] = useState(theme.highlight);
    const [newItem, setNewItem] = useState(""); 
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Checklists");
                const checklists = jsonValue ? JSON.parse(jsonValue) : [];
                const checklist = checklists.find(c => c.id.toString() === id);
                if (checklist) {
                    setPlane(checklist.plane);
                    setTitle(checklist.title);
                    setItems(checklist.items);
                    setChecklistColor(checklist.checklistColor);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchChecklist();
    }, [id]);

    const saveChecklist = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Checklists");
            const checklists = jsonValue ? JSON.parse(jsonValue) : [];
            const updatedChecklists = checklists.map(c => 
                c.id.toString() === id ? { ...c, plane, title, checklistColor, items } : c
            );
            await AsyncStorage.setItem("Checklists", JSON.stringify(updatedChecklists));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.push(`/checklists/${id}`);
        } catch (e) {
            console.error(e);
        }
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

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const onColorChange = checklistColor => {
        setChecklistColor(checklistColor);
    };

    return (
        <GestureRecognizer
            onSwipeLeft={saveChecklist}
            onSwipeRight={() => router.push(`/checklists/${id}`)}
            config={config}
            style={styles.swipe}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.heading}>Edit Checklist</Text>
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

                <Pressable onPress={() => setShowModal(true)}>
                    <Ionicons name="color-palette" size={40} color={checklistColor} />
                </Pressable>

                <Modal visible={showModal} animationType="slide" transparent={true}>
                    <View style={styles.modal}>
                        <ColorPicker
                            color={checklistColor}
                            onColorChange={(checklistColor) => onColorChange(checklistColor)}
                            thumbSize={30}
                            sliderSize={30}
                            noSnap={true}
                            row={false}
                            swatches={false}
                            sliderHidden={true}
                        />
                        <Pressable style={styles.ok} onPress={() => setShowModal(false)}>
                            <Text style={{ color: theme.text, fontWeight: "bold", fontSize: 20 }}>Ok</Text>
                        </Pressable>
                    </View>
                </Modal>

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
                    <View style={{ flex: 1, width: "100%" }}>
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
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode="on-drag"
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={{ flex: 1, width: "100%" }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", gap: 30, marginBottom: 10, marginTop: 10 }}>
                        <Pressable onPress={() => router.push("/(tabs)/checklists")} style={styles.cancelButton}>
                            <Text style={{ fontSize: 20, color: "white", fontFamily: theme.font }}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={saveChecklist} style={styles.createButton}>
                            <Text style={{ fontSize: 20, fontFamily: theme.font }}>Save</Text>
                        </Pressable>
                    </View>
                </View>
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
    button: {
        backgroundColor: "rgb(0, 234, 255)",
        color: "black",
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: "90%",
        alignItems: "center",
    },
    ok: {
        backgroundColor: "rgb(0, 234, 255)",
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        color: theme.text,
        fontFamily: theme.font,
    },
    modal: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '30%',
        marginTop: 'auto',
        backgroundColor: theme.modal,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    picker: {
        width: '90%',
        marginTop: 20
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