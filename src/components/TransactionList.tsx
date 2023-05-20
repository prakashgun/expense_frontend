import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommonHeader from './CommonHeader'
import UserInterface from '../interfaces/UserInterface'
import { getLoginDetails } from '../lib/storage'

const TransactionList = () => {
  const [user, setUser] = useState<UserInterface>()

  const initialSetup = async () => {
    const loginDetails = await getLoginDetails()
    setUser(loginDetails.user)
  }

  useEffect(() => {
    initialSetup()
  }, [])

  return (
    <View style={styles.container}>
      <CommonHeader heading="Register" />
      <Text>TransactionList</Text>
      {user && <Text>{user.first_name}</Text>}
    </View>
  )
}

export default TransactionList

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})