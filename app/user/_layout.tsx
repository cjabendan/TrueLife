import { Colors } from "@/constants/Colors";
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Userlayout() {

  const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
  )
}