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
        {/* <Stack.Screen name="login" options={{ headerShown: false }} />
        */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="logs/[id]" options={{headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="createlog/[id]" options={{headerShown: false, gestureEnable: false}}/>
        <Stack.Screen name="checklists/[id]" options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="createchecklist/[id]" options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="editlog/[id]" options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="editchecklist/[id]" options={{headerShown: false, gestureEnabled: false}}/>
        {/* <Stack.Screen name="publicchecklists/index" options={{title: "Find Checklists", headerBackTitle: "Back", headerStyle: {backgroundColor: theme.unText}, headerTitleStyle: {color: theme.text}}}/>
        */}
        <Stack.Screen name="stats/index" options={{headerShown: false, gestureEnabled: false}}/>
      </Stack>
    </SafeAreaProvider>
  );
}