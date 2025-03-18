import { Text, View, StyleSheet, ImageBackground, Appearance, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from 'react';
import { colors } from '@/data/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import convertbg from "@/assets/images/convertbg.jpg";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Convert() {
    const [poundsItem, setPoundsItem] = useState();
    const [kilogramsItem, setKilogramsItem] = useState();
    const [feetItem, setFeetItem] = useState();
    const [metresItem, setMetresItem] = useState();
    const [knots1Item, setKnots1Item] = useState();
    const [knots2Item, setKnots2Item] = useState();
    const [kmhItem, setKmhItem] = useState();
    const [mphItem, setMphItem] = useState();

    return (
        <ImageBackground source={convertbg} resizeMode="cover" style={styles.image}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Text style={styles.heading}>Convert</Text>
                    <ScrollView style={{flex: 1, width: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                        <Text style={styles.label}>Pounds - Kilograms</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="Pounds"
                            placeholderTextColor="gray"
                            value={poundsItem}
                            onChangeText={setPoundsItem}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(poundsItem * 0.45359237).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>Kilograms - Pounds</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="Kilograms"
                            placeholderTextColor="gray"
                            value={kilogramsItem}
                            onChangeText={setKilogramsItem}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(kilogramsItem *  2.2046226218).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>Feet - Metres</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="Feet"
                            placeholderTextColor="gray"
                            value={feetItem}
                            onChangeText={setFeetItem}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(feetItem *  0.3048).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>Metres - Feet</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="Metres"
                            placeholderTextColor="gray"
                            value={metresItem}
                            onChangeText={setMetresItem}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(metresItem *  3.280839895).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>Knots - km/h</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="Knots"
                            placeholderTextColor="gray"
                            value={knots1Item}
                            onChangeText={setKnots1Item}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(knots1Item *  1.852).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>km/h - Knots</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="km/h"
                            placeholderTextColor="gray"
                            value={kmhItem}
                            onChangeText={setKmhItem}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(kmhItem /  1.852).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>Knots - mp/h</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="Knots"
                            placeholderTextColor="gray"
                            value={knots2Item}
                            onChangeText={setKnots2Item}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(knots2Item * 1.150779).toFixed(2)}</Text>
                        </View>

                        <Text style={styles.label}>mp/h - Knots</Text>
                        <View style={styles.same}>
                            <TextInput
                            style={styles.input}
                            placeholder="mp/h"
                            placeholderTextColor="gray"
                            value={mphItem}
                            onChangeText={setMphItem}
                            maxLength={9}
                            />
                            <FontAwesome name="arrow-right" size={30} color="white" />
                            <Text style={styles.output}>{(mphItem * 0.868976).toFixed(2)}</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
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