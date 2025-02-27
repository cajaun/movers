import { Stack } from "expo-router";
import "./global.css";
import ThemeProvider from "@/components/ui/utils/themeProvider";
import React from "react";
import { PlatformColor, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      
      <Stack

 >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
