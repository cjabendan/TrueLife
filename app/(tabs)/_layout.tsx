import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: Colors.light.tabIconSelected,
            tabBarStyle: {
              backgroundColor: theme.tab,
              position: "absolute",
              elevation: 0,
              height: 40,
              paddingTop: 8,
              paddingBottom: 10,
              borderTopWidth: 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="bookmarks"
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="bookmarks" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons
                  name="add-circle"
                  size={size}
                  color={Colors.light.tabIconSelected}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="heart" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="person-circle" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
