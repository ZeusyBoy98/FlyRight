import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="howtouse" options={{headerTitle: "How To Use", headerBackTitle: "Settings", headerStyle: {backgroundColor: "#202020"}, headerTitleStyle: {color: "white"}}} />
        <Stack.Screen name="logs/[id]" options={{headerShown: false}} />
      </Stack>
    </SafeAreaProvider>
  );
}