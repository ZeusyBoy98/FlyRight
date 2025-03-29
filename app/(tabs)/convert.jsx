import { Text, View, StyleSheet, ImageBackground, Appearance, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { colors } from '@/data/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import convertbg from "@/assets/images/convertbg.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer from 'react-native-swipe-gestures';
import { useRouter } from "expo-router";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Convert() {
    const [poundsItem, setPoundsItem] = useState();
    const [kilogramsItem, setKilogramsItem] = useState();
    const [feetItem, setFeetItem] = useState();
    const [metresItem, setMetresItem] = useState();
    const [knots1Item, setKnots1Item] = useState();
    const [knots2Item, setKnots2Item] = useState();
    const [knots3Item, setKnots3Item] = useState();
    const [kmhItem, setKmhItem] = useState();
    const [mphItem, setMphItem] = useState();
    const [machItem, setMachItem] = useState();
    const [PK, setPK] = useState(0);
    const [FM, setFM] = useState(0);
    const [KK, setKK] = useState(0);
    const [KM, setKM] = useState(0);
    const [KMa, setKMa] = useState(0);
    const [bg, setBg] = useState(null);
    const router = useRouter();

    function togglePK() {
        setPK(prevPK => (prevPK === 0 ? 1 : 0));
    };

    function toggleFM() {
        setFM(prevFM => (prevFM === 0 ? 1 : 0));
    };

    function toggleKK() {
        setKK(prevKK => (prevKK === 0 ? 1 : 0));
    };

    function toggleKM() {
        setKM(prevKM => (prevKM === 0 ? 1 : 0));
    };

    function toggleKMa() {
        setKMa(prevKMa => (prevKMa === 0 ? 1 : 0));
    };

    const parseInput = (input) => {
        return isNaN(parseFloat(input)) ? 0 : parseFloat(input);
    };

    useEffect(() => {
        const loadSetting = async () => {
            const bgValue = await AsyncStorage.getItem("planebg");
            setBg(bgValue === "true");
        };
        loadSetting();
    }, []);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={() => {router.push("/(tabs)/settings")}}
            onSwipeRight={() => {router.push("/(tabs)/")}}
            config={config}
            style={styles.swipe}
        >
            <ImageBackground source={bg === false ? null : convertbg} resizeMode="cover" style={styles.image}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <Text style={styles.heading}>Convert</Text>
                        <ScrollView style={{flex: 1, width: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                            <Text style={styles.label}>{PK === 0 ? "Pounds - Kilograms" : "Kilograms - Pounds"}</Text>
                            <View style={styles.same}>
                                {PK === 0 ? 
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Pounds"
                                    placeholderTextColor="gray"
                                    value={poundsItem}
                                    onChangeText={setPoundsItem}
                                    maxLength={9}
                                    /> :
                                    <Text style={styles.output}>{Math.round(parseInput(kilogramsItem) *  2.2046226218)}</Text>
                                }
                                <Pressable onPress={togglePK}>
                                    <FontAwesome name={PK === 0 ? "arrow-right": "arrow-left"} size={30} color="white" />
                                </Pressable>
                                {PK === 0 ? 
                                    <Text style={styles.output}>{Math.round(parseInput(poundsItem) * 0.45359237)}</Text> : 
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Kilograms"
                                    placeholderTextColor="gray"
                                    value={kilogramsItem}
                                    onChangeText={setKilogramsItem}
                                    maxLength={9}
                                    />
                                }
                            </View>

                            <Text style={styles.label}>{FM === 0 ? "Feet - Metres" : "Metres - Feet"}</Text>
                            <View style={styles.same}>
                                {FM === 0 ? 
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Feet"
                                    placeholderTextColor="gray"
                                    value={feetItem}
                                    onChangeText={setFeetItem}
                                    maxLength={9}
                                    /> : 
                                    <Text style={styles.output}>{Math.round(parseInput(metresItem) *  3.280839895)}</Text>
                                }
                                <Pressable onPress={toggleFM}>
                                    <FontAwesome name={FM === 0 ? "arrow-right" : "arrow-left"} size={30} color="white" />
                                </Pressable>
                                {FM === 0 ? 
                                    <Text style={styles.output}>{Math.round(parseInput(feetItem) *  0.3048)}</Text> :
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Metres"
                                    placeholderTextColor="gray"
                                    value={metresItem}
                                    onChangeText={setMetresItem}
                                    maxLength={9}
                                    />
                                }
                            </View>

                            <Text style={styles.label}>{KK ===0 ? "Knots - km/h" : "km/h - Knots"}</Text>
                            <View style={styles.same}>
                                {KK === 0 ? 
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Knots"
                                    placeholderTextColor="gray"
                                    value={knots1Item}
                                    onChangeText={setKnots1Item}
                                    maxLength={9}
                                    /> : 
                                    <Text style={styles.output}>{Math.round(parseInput(kmhItem) /  1.852)}</Text>
                                }
                                <Pressable onPress={toggleKK}>
                                    <FontAwesome name={KK === 0 ? "arrow-right" : "arrow-left"} size={30} color="white" />
                                </Pressable>
                                {KK === 0 ?
                                    <Text style={styles.output}>{Math.round(parseInput(knots1Item) *  1.852)}</Text> :
                                    <TextInput
                                    style={styles.input}
                                    placeholder="km/h"
                                    placeholderTextColor="gray"
                                    value={kmhItem}
                                    onChangeText={setKmhItem}
                                    maxLength={9}
                                    />
                                }
                            </View>

                            <Text style={styles.label}>{KM === 0 ? "Knots - mp/h" : "mp/h - Knots"}</Text>
                            <View style={styles.same}>
                                {KM === 0 ?
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Knots"
                                    placeholderTextColor="gray"
                                    value={knots2Item}
                                    onChangeText={setKnots2Item}
                                    maxLength={9}
                                    /> :
                                    <Text style={styles.output}>{Math.round(parseInput(mphItem) * 0.868976)}</Text>
                                }
                                <Pressable onPress={toggleKM}>
                                    <FontAwesome name={KM === 0 ? "arrow-right" : "arrow-left"} size={30} color="white" />
                                </Pressable>
                                {KM === 0 ? 
                                    <Text style={styles.output}>{Math.round(parseInput(knots2Item) * 1.150779)}</Text> :
                                    <TextInput
                                    style={styles.input}
                                    placeholder="mp/h"
                                    placeholderTextColor="gray"
                                    value={mphItem}
                                    onChangeText={setMphItem}
                                    maxLength={9}
                                    />
                                }
                            </View>

                            <Text style={styles.label}>{KMa === 0 ? "Knots - Mach" : "Mach - Knots"}</Text>
                            <View style={styles.same}>
                                {KMa === 0 ?
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Knots"
                                    placeholderTextColor="gray"
                                    value={knots3Item}
                                    onChangeText={setKnots3Item}
                                    maxLength={9}
                                    /> :
                                    <Text style={styles.output}>{Math.round(parseInput(machItem) * 666.738661)}</Text>
                                }
                                <Pressable onPress={toggleKMa}>
                                    <FontAwesome name={KMa === 0 ? "arrow-right" : "arrow-left"} size={30} color="white" />
                                </Pressable>
                                {KMa === 0 ? 
                                    <Text style={styles.output}>{(parseInput(knots3Item) * 0.0015).toFixed(2)}</Text> :
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Mach"
                                    placeholderTextColor="gray"
                                    value={machItem}
                                    onChangeText={setMachItem}
                                    maxLength={9}
                                    />
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingTop: "10%",
        width: "100%"
    },
    swipe: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.background,
        justifyContent: "center",
    },
    same: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    heading: {
        color: theme.highlight,
        fontSize: 50,
        fontWeight: "bold",
    },
    label: {
        color: "white",
        fontSize: 20,
    },
    input: {
        fontSize: 25,
        padding: 10,
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        color: "white",
    },
    output: {
        color: "white",
        fontSize: 25,
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
    },
})