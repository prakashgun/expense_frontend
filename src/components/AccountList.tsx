import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Config from 'react-native-config'
import AccountInterface from '../interfaces/AccountInterface'
import { getLoginDetails } from '../lib/storage'
import AccountItem from './AccountItem'
import CommonHeader from './CommonHeader'
import { useIsFocused } from '@react-navigation/native'


const AccountList = ({ navigation }: any) => {
    const [accounts, setAccounts] = useState<AccountInterface[]>()

    useEffect(() => {
        getAccountsApi()
    }, [useIsFocused()])

    const getAccountsApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${Config.API_URL}/expense/accounts/`,
                        {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${loginDetails['login_token']}`
                            }
                        }
                    )
                    
                    const json = await response.json();
                    setAccounts(json)

                    if (json.hasOwnProperty('non_field_errors')) {
                        Alert.alert('Error', json.non_field_errors[0])
                    }
                }
            } else {
                Alert.alert('Error', 'Please login again')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Accounts" />
            <ScrollView >
                {
                    accounts && accounts.map((account) => (
                        <AccountItem
                            account={account}
                            key={account.id}
                            onPress={() => {
                                return navigation.navigate('AccountScreen', { id: account.id })
                            }}
                        />
                    ))
                }

            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddAccount')}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountList

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
        alignSelf: 'center',
        backgroundColor: '#729343'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})