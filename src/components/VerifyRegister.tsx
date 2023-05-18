import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from './CommonHeader'

const VerifyRegister = () => {
    return (
        <View style={styles.container}>
            <CommonHeader heading="Register" />
            <Text>VerifyRegister</Text>
        </View>
    )
}

export default VerifyRegister

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})