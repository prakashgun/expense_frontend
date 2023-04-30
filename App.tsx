import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PricingCard, lightColors, createTheme, ThemeProvider } from '@rneui/themed'
import AppNavigator from './src/components/AppNavigator';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

const App = () => {
  
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AppNavigator />
        </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})