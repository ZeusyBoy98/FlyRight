import { Text, View, StyleSheet, ImageBackground, Appearance, Pressable } from "react-native";
import { colors } from "@/data/colors";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer from 'react-native-swipe-gestures';
import homepageImage from "@/assets/images/homepage.png";
import { enableScreens } from 'react-native-screens';
import { useRouter } from "expo-router";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

enableScreens();

export default function Index() {
  const [log, setLog] = useState({});
  const [logs, setLogs] = useState([]);
  const [checklist, setChecklist] = useState({});
  const [checklists, setChecklists] = useState({});
  const [bg, setBg] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLogData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Logs");
            const storageLogs = jsonValue ? JSON.parse(jsonValue) : [];
            setLogs(storageLogs.sort((a, b) => b.id - a.id))
            if (storageLogs.length) {
                const myLog = storageLogs[0];
                setLog(myLog || {});
            }
        } catch (e) {
            console.error(e);
        }
    };
    const fetchChecklistData = async () => {
      try {
          const jsonValue = await AsyncStorage.getItem("Checklists");
          const storageChecklists = jsonValue ? JSON.parse(jsonValue) : [];
          setChecklists(storageChecklists.sort((a, b) => b.id - a.id))
          if (storageChecklists.length) {
              const myChecklist = storageChecklists[0];
              setChecklist(myChecklist || {});
          }
      } catch (e) {
          console.error(e);
      }
  };

    fetchLogData();
    fetchChecklistData();
  }, []);

  useEffect(() => {
    const loadSetting = async () => {
        const bgValue = await AsyncStorage.getItem("homebg");
        setBg(bgValue === "true");
    };
    loadSetting();
}, []);

  const checkFirstLaunch = async () => {
    try {
      const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      
      if (isFirstLaunch === null) {
        await AsyncStorage.setItem('planebg', 'true');
        await AsyncStorage.setItem('homebg', 'true');
        await AsyncStorage.setItem('isFirstLaunch', 'false');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  checkFirstLaunch();

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => {router.push("/(tabs)/convert")}}
      onSwipeRight={() => {router.push("/(tabs)/logbook")}}
      config={config}
      style={styles.container}
    >
    <View style={styles.container}>
      <ImageBackground source={bg === false ? null : homepageImage} resizeMode="cover" style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Fly</Text>
          <Text style={styles.right}>Right</Text>
        </View>
        <Pressable onPress={() => router.push(`../logs/${log?.id}`)}>
          <Text style={styles.itemText}>Latest Log:</Text>
          <View style={styles.log}>
            <View style={{flexDirection: "row", gap: 10, borderBottomColor: "gray",}}>
              <Text style={styles.logTitle}>{log?.title}</Text>
              <Text style={styles.logDate}>{log?.date}</Text>
            </View>
            <View style={{flexDirection: "row", gap: 20,}}>
              <Text style={styles.logPlane}>Aircraft: {log?.plane}</Text>
              <Text style={styles.logPlane}>{log?.departure} - {log?.arrival}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push(`../checklists/${checklist?.id}`)} style={{marginTop: 10}}>
          <Text style={styles.itemText}>Latest Checklist:</Text>
          <View style={styles.log}>
            <View style={{flexDirection: "row", gap: 10, borderBottomColor: "gray",}}>
              <Text style={styles.logTitle}>{checklist?.plane}</Text>
              <Text style={styles.logDate}>{checklist?.title}</Text>
            </View>
          </View>
        </Pressable>
        <Text style={styles.credit}>Image Credit: Jose Antunes @ Medium</Text>
      </ImageBackground>
    </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.background,
  },
  image: {
    width: "100%",
    height: "101%",
    flex: 1,
    alignItems: "center",
    marginTop: -4,
  },
  heading: {
    color: "white",
    fontFamily: theme.font,
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },
  itemText: {
    color: "white",
    fontSize: 35,
    fontWeight: "600",
    marginTop: 30,
  },
  log: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    minWidth: "80%",
    maxWidth: "95%",
    justifyContent: "center",
  },
  logTitle: {
    color: theme.highlight,
    fontSize: 30,
  },
  logDate: {
    color: "white",
    fontSize: 28,
  },
  logPlane: {
    color: "white",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
  },
  textContainer: {
    flexDirection: "row",
    gap: 0,
    backgroundColor: theme.homeTrans,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: "20%",
    maxWidth: "95%",
    marginTop: "15%",
  },
  right: {
    color: theme.highlight,
    fontFamily: theme.font,
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },
  credit: {
    color: "white",
    fontFamily: theme.font,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
})