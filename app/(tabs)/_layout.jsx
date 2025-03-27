import { Tabs } from 'expo-router';
import { colors } from "@/data/colors";
import { Appearance } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <MaterialIcons name="checklist" size={34} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
            name="logbook"
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons name="book-open-variant" size={30} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
                <MaterialIcons name="airplanemode-on" size={30} color={focused ? theme.highlight : theme.unHighlight} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
            name="convert"
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <Foundation name="loop" size={30} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
            name="settings"
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="settings-sharp" size={30} color={focused ? theme.highlight : theme.unHighlight} />
                ),
            }} 
        ></Tabs.Screen>
      </Tabs>
    );
  }
  