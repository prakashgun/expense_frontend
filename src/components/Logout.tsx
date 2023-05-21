import { useNavigation } from '@react-navigation/native'
import { Input, LinearProgress } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Config from 'react-native-config'
import CountryInterface from '../interfaces/CountryInterface'
import countries from '../lib/countries'
import CommonHeader from './CommonHeader'
import SearchableCountryPicker from './SearchableCountryPicker'


const Logout = () => {
    const navigation = useNavigation<any>()

    const logoutApi = async () => {

        try {
            const response = await fetch(
                `${Config.API_URL}/customer/logout/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            const json = await response.json();

            if (json.hasOwnProperty('non_field_errors')) {
                Alert.alert('Error', json.non_field_errors[0])
            } else {
                // navigation.navigate('WelcomeScreen')
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Logout" />
            <LinearProgress style={{ marginVertical: 10 }} color="#729343" />
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        width: '88%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    login: {
        backgroundColor: '#096A2E'
    },
    register: {
        backgroundColor: '#729343'
    }
})