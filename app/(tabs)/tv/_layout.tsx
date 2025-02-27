import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import * as AC from "@bacons/apple-colors";

const TvLayout = () => {
  return (
    <Stack screenOptions={{
      headerShadowVisible: false,
    }}>
      <Stack.Screen
      name = "index"
      options={{
        title: "Shows",
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: true,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
      }}
      />
         
    </Stack>
  )
}

export default TvLayout