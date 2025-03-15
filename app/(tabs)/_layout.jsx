import { Tabs } from 'expo-router';
import { colors } from "@/data/colors";
import { Appearance } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const colorScheme = Appearance.getColorScheme();
let theme = colors[colorScheme];

export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          tabBarLabelStyle: { color: theme.text, size: 50, fontFamily: theme.font },
          headerShown: false,
          tabBarStyle: { paddingTop: 5, height: 80, backgroundColor: theme.tabBar, elevation: 0, shadowOpacity: 0, borderTopWidth: 0, },
          backgroundColor: theme.background,
        }}>
        <Tabs.Screen
            name="checklists"
            options={{
                title: "Checklists",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <FontAwesome6 name="clipboard" size={28} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
            name="logbook"
            options={{
                title: "LogBook",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons name="book-open-variant" size={30} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            size: 40,
            tabBarIcon: ({ focused }) => (
                <Ionicons name="airplane-outline" size={30} color={focused ? theme.highlight : theme.unHighlight} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
            name="atc"
            options={{
                title: "ATC",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="headset-outline" size={30} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
            name="settings"
            options={{
                title: "Settings",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="settings-outline" size={30} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
      </Tabs>
    );
  }
  