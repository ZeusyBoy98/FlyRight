import { Text, View, StyleSheet, Pressable, Appearance, Switch, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/data/colors";
import { Link } from "expo-router";
// import { syncFromCloud, syncToCloudMerge, deleteCloudData } from "@/lib/sync";
import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Settings() {
    // const { isLoggedIn } = useAuth();
    const router = useRouter();

    {/* const clearStorage = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          await AsyncStorage.multiRemove(keys);
          Alert.alert('Storage Cleared', 'All data has been removed from storage.');
        } catch (error) {
          console.error('Error clearing storage:', error);
          Alert.alert('Error', 'An error occurred while clearing storage.');
        }
      };
    */}
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const exportLogs = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Logs");
            const logs = jsonValue ? JSON.parse(jsonValue) : [];
            if (logs.length > 0) {
                const logsString = JSON.stringify(logs, null, 2);
                const fileUri = FileSystem.documentDirectory + 'logs.json';
                await FileSystem.writeAsStringAsync(fileUri, logsString);
                await Sharing.shareAsync(fileUri, { mimeType: 'application/json' });
            } else {
                Alert.alert("No Logs", "There are no logs to export.");
            }
        } catch (error) {
            console.error("Error exporting logs:", error);
            Alert.alert("Export Failed", "An error occurred while exporting logs.");
        }
    };

    const importLogs = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: true,
            });

            if (result.canceled) return;

            const uri = result.assets[0].uri;
            const contents = await FileSystem.readAsStringAsync(uri);
            const importedLogs = JSON.parse(contents);

            const existingJson = await AsyncStorage.getItem("Logs");
            let existingLogs = existingJson ? JSON.parse(existingJson) : [];

            const maxId = existingLogs.length > 0 ? Math.max(...existingLogs.map(log => log.id)) : 0;
            const adjustedImportedLogs = importedLogs.map((log, index) => ({
                ...log,
                id: maxId + index + 1,
            }));
            const mergedLogs = [...existingLogs, ...adjustedImportedLogs];

            await AsyncStorage.setItem("Logs", JSON.stringify(mergedLogs));

            Alert.alert("Import Successful", "Close and reopen the app to see imported logs.");
        } catch (error) {
            console.error("Error importing logs:", error);
            Alert.alert("Import Failed", "An error occurred while importing logs. Ensure the file is a valid JSON.");
        }
    };

    return (
        <GestureRecognizer
            onSwipeRight={() => {router.push("/(tabs)/convert")}}
            config={config}
            style={styles.swipe}
        >
        <View style={styles.container}>
            <Pressable onPress={() => router.push('/onboarding')} style={[styles.buttonRound, {marginBottom: 30}]}>
                <Text style={styles.buttonText}>Onboarding</Text>
            </Pressable>
            {/*{!isLoggedIn && (
            <Pressable style={[styles.buttonRound,{marginBottom: 30}]} onPress={() => router.push("/login")}>
                <Text style={styles.buttonText}>Login or Register</Text>
            </Pressable>
            )}
           {isLoggedIn && (
                <Pressable style={[styles.buttonRound, {marginBottom: 30}]} onPress={async () => {
                    await supabase.auth.signOut();
                    Alert.alert("Signed out", "You have been logged out.");
                }}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </Pressable>
            )}*/}
            <Link href="mailto:wetcementstudios@gmail.com?subject=FeedBack" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonTop}>
                    <Text style={styles.buttonText}>Feedback</Text>
                </Pressable>
            </Link>
            <Link href="https://github.com/ZeusyBoy98/FlyRight/issues" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonMiddle}>
                    <Text style={styles.buttonText}>Report a Bug</Text>
                </Pressable>
            </Link>
            <Link href="https://zeusyboy.com/flyright-support/" style={{ marginHorizontal: "auto", marginBottom: 30 }} asChild>
                <Pressable style={styles.buttonBottom}>
                    <Text style={styles.buttonText}>Support</Text>
                </Pressable>
            </Link>
            <Pressable onPress={() => exportLogs()} style={styles.buttonTop}>
                <Text style={styles.buttonText}>Export Logs</Text>
            </Pressable>
            <Pressable onPress={() => importLogs()} style={[styles.buttonBottom, {marginBottom: 30}]}>
                <Text style={styles.buttonText}>Import Logs</Text>
            </Pressable>
            {/* {isLoggedIn && (
            <>
                <Pressable
                    style={styles.buttonTop}
                    onPress={async () => {
                        const { error } = await syncToCloudMerge();
                        if (error) {
                            Alert.alert("Sync Failed", error.message);
                        } else {
                            Alert.alert("Synced", "Local data merged into cloud.");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Merge With Cloud</Text>
                </Pressable>

                <Pressable
                    style={styles.buttonBottom}
                    onPress={async () => {
                        const { error } = await syncFromCloud();
                        if (error) {
                            Alert.alert("Restore Failed", error.message);
                        } else {
                            Alert.alert("Restored", "Data synced from cloud.");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Restore from Cloud</Text>
                </Pressable>
                <Text style={{color: "gray", fontFamily: theme.font, marginBottom: 30}}>Restart App After Restoring</Text>
                <Pressable
                    style={[styles.buttonRound, { backgroundColor: "#ff4d4d" }]}
                    onPress={() => {
                        Alert.alert(
                            "Confirm Wipe",
                            "This will permanently delete all your cloud-stored checklists and logs. Are you sure?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Delete",
                                    style: "destructive",
                                    onPress: async () => {
                                        const { error } = await deleteCloudData();
                                        if (error) {
                                            Alert.alert("Failed", error.message);
                                        } else {
                                            Alert.alert("Cloud Data Deleted", "Your cloud backup has been cleared.");
                                        }
                                    },
                                },
                            ]
                        );
                    }}
                >
                    <Text style={[styles.buttonText, { color: "white" }]}>Wipe Cloud Data</Text>
                </Pressable>
            </>
        )}*/}
            {/* <Text style={{ color: "gray", marginTop: 30, marginBottom: 3 }}>Support the Developer</Text>
            <Link href="https://buymeacoffee.com/zeusyboy" style={{ marginHorizontal: "auto" }} asChild>
                <Pressable style={styles.buttonRound}>
                    <Text style={styles.buttonText}>Buy Me a Coffee</Text>
                </Pressable>
            </Link>*/}
            <Text style={{ marginTop: 30 }}>
                <Text style={{ color: "gray", fontFamily: theme.font }}>Made with ❤️ by </Text>
                <Text style={{ color: "gray", fontFamily: theme.font, fontWeight: "bold" }}>ZeusyBoy</Text>
            </Text>
            <Text style={{ color: "gray", fontFamily: theme.font, marginTop: 50 }}>Check FlyRight out on GitHub:</Text>
            <Link href="https://github.com/ZeusyBoy98/FlyRight" style={{ marginHorizontal: "auto" }} asChild>
                <Text style={{ color: "gray", fontFamily: theme.font }}>https://github.com/ZeusyBoy98/FlyRight</Text>
            </Link>
            {/*<Pressable onPress={clearStorage}>
                <Text>Clear</Text>
            </Pressable>*/}
            <Text style={{position: "absolute", bottom: "5%", alignItems: "center", color: "gray"}}>1.3.0</Text>
        </View>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.background,
        alignItems: "center",
        paddingTop: "20%",
        width: "100%",
    },
    swipe: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    switch: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        gap: 20,
    },
    buttonTop: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(99, 99, 99, 0.23)",
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    buttonBottom: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonMiddle: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(99, 99, 99, 0.23)",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonRound: {
        height: 50,
        width: "90%",
        backgroundColor: theme.settingsButton,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: theme.text,
        fontFamily: theme.mid,
        fontSize: 18,
        textAlign: "center",
        padding: 4,
    },
});