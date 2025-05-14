import { Stack } from "expo-router";
import "./global.css";
import ThemeProvider from "@/components/ui/utils/themeProvider";
import React from "react";
import { PlatformColor, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SheetProvider } from 'react-native-sheet-transitions'

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView >
    <ThemeProvider>
      <StatusBar style="auto" />
      <SheetProvider>
      <Stack

 >


        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modal" 
          options={{
            presentation: 'transparentModal',
            contentStyle: { backgroundColor: 'transparent' }
          }}
        />
        
      </Stack>
      </SheetProvider>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
