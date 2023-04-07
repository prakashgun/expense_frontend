import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PricingCard, lightColors } from '@rneui/themed'

const App = () => {
  return (
    <SafeAreaProvider>
      <Text>App</Text>
      <PricingCard
        color={lightColors.primary}
        title="Free"
        price="$0"
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
      />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})