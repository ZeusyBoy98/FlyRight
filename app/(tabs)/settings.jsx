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
            <Text style={{position: "absolute", bottom: "5%", alignItems: "center", color: "gray"}}>insert update here</Text>
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