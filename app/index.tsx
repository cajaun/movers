import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import * as AC from "@bacons/apple-colors";


const Welcome = () => {

  return (
    <View>
        <TouchableOpacity  onPress={() => router.push('/movie')} ><Text style={{color: AC.label}}>Welcome</Text></TouchableOpacity>
    </View>
  )
}

export default Welcome