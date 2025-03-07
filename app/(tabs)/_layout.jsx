import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          tabBarLabelStyle: { color: "white", size: 50,},
          headerShown: false,
          tabBarStyle: { height: 70, backgroundColor: "#202020", elevation: 0, shadowOpacity: 0, borderTopWidth: 0, },
          backgroundColor: "#333333",
        }}>
        <Tabs.Screen
            name="checklists"
            options={{
                title: "Checklists",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <FontAwesome6 name={focused ? "clipboard-list" : "clipboard"} size={28} color={focused ? "rgba(56, 228, 249, 1)" : "rgb(204, 247, 255)"} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
            name="logbook"
            options={{
                title: "LogBook",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons name={focused ? "book-open-variant" : "book-open-blank-variant"} size={30} color={focused ? "rgba(56, 228, 249, 1)" : "rgb(204, 247, 255)"} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            size: 40,
            tabBarIcon: ({ focused }) => (
                <Ionicons name={focused ? "airplane" : "airplane-outline"} size={30} color={focused ? "rgba(56, 228, 249, 1)" : "rgb(204, 247, 255)"} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
            name="atc"
            options={{
                title: "ATC",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? "headset" : "headset-outline"} size={30} color={focused ? "rgba(56, 228, 249, 1)" : "rgb(204, 247, 255)"} />
                ),
            }} 
        ></Tabs.Screen>
        <Tabs.Screen
            name="settings"
            options={{
                title: "Settings",
                size: 40,
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? "settings" : "settings-outline"} size={30} color={focused ? "rgba(56, 228, 249, 1)" : "rgb(204, 247, 255)"} />
                ),
            }} 
        ></Tabs.Screen>
      </Tabs>
    );
  }
  