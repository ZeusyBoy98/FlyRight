import { Appearance } from 'react-native';
import { colors } from '@/data/colors';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-reanimated';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="howtouse" options={{headerTitle: "How To Use", headerBackTitle: "Settings", headerStyle: {backgroundColor: theme.tabBar}, headerTitleStyle: {color: "white", fontFamily: theme.font,}}} />
        <Stack.Screen name="logs/[id]" options={{headerShown: false}} />
        <Stack.Screen name="createlog/[id]" options={{headerShown: false}}/>
      </Stack>
    </SafeAreaProvider>
  );
}