
import InitialLayout from '@/components/InitialLayout';
import { Colors } from "@/constants/Colors";
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as SystemUI from 'expo-system-ui';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

   const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      SystemUI.setBackgroundColorAsync(theme.background);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <StatusBar
        backgroundColor={theme.background}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}