import { Tabs } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { hapticTab } from "@/components/ui/utils/hapticTab";
export { ErrorBoundary } from "expo-router";
import { SymbolView } from "expo-symbols";

import BlurTabBarBackground from "@/components/ui/utils/tabBarBackground";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
    
    screenOptions={{
      tabBarButton: hapticTab,
      headerShown: false,
      tabBarBackground: BlurTabBarBackground,
      tabBarStyle: {
        // Use a transparent background on iOS to show the blur effect
        position: "absolute",
        backgroundColor: 'transparent'
      },

    }}
    >
      <Tabs.Screen
        name="movie"
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="movieclapper.fill"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="magnifyingglass"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tv"
        options={{
          title: "Shows",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="popcorn.fill"
              type="hierarchical"
              tintColor={color}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
