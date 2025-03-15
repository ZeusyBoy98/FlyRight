import { Text, View, StyleSheet, Appearance } from "react-native";
import { colors } from "@/data/colors";

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function Checklists() {
    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.background,
    },
})