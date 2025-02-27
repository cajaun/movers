import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import RankedCard from '@/components/ui/cards/rankedCard';

const CategoryScreen = () => {

  const {id, name} = useLocalSearchParams();


  return (
    <View>
      <Stack.Screen
         options={{

          title: Array.isArray(name) ? name.join(", ") : name,
            headerTransparent: true,
            headerBlurEffect: "systemChromeMaterial",
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: true,
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
        
        }}
       />
      <RankedCard  genreId={id} />
    </View>
  )
}

export default CategoryScreen