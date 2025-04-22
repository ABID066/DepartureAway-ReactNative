import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import "@/global.css"

const index = () => {
  return (
    <View className="flex-1 justify-center items-center bg-yellow-400">
      {/* App Logo */}
      
      {/* App Name */}
      <Text className="text-3xl font-bold text-blue-800 mt-4">
        Departure Away
      </Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})