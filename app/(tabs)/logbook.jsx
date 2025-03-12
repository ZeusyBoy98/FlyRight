import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';
import { data } from "@/data/logs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';

export default function LogBook() {
    const [logs, setLogs] = useState([]);
    const [text, setText] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem("Logs")
            const storageLogs = jsonValue != null ? JSON.parse(jsonValue) : null
            if (storageLogs && storageLogs.length) {
              setLogs(storageLogs.sort((a,b) => b.id - a.id))
            } else {
              setLogs(data.sort((a,b) => b.id - a.id))
            }
          } catch (e) {
            console.error(e)
          }
        }
        fetchData()
    }, [data])

    useEffect(() => {
        const storeData = async () => {
          try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem("Logs", jsonValue)
          } catch (e) {
            console.error(e)
          }
        }
        storeData()
    }, [logs])

    const handlePress = (id) => {
        router.push(`/logs/${id}`)
    }

    const renderItem = ({ item }) => (
        <View style={styles.logItem}>
          <Pressable 
          onPress={() => handlePress(item.id)} 
          >
            <View style={styles.logContainer}>
                <Text style={styles.dateText}>{item.date}</Text><Text style={styles.titleText}>{item.title}</Text>
            </View>
          </Pressable>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
            data={logs}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1,}}
            itemLayoutAnimation={LinearTransition}
            />
            <Pressable onPress={""} style={styles.addButton}>
                <MaterialCommunityIcons name="plus-circle" size={60} color="white" selectable={undefined}/>
            </Pressable>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#333333",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logContainer: {
        flexDirection: "row",
        gap: 10,
    },
    logItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: 'auto',
        marginTop: 10,
    },
    dateText: {
        fontSize: 30,
        color: "white",
    },
    titleText: {
        fontSize: 30,
        color: "rgb(150, 239, 255)"
    },
})