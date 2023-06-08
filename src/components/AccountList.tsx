import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import config from '../../config'
import AccountInterface from '../interfaces/AccountInterface'
import { getLoginDetails } from '../lib/storage'
import AccountItem from './AccountItem'
import CommonHeader from './CommonHeader'
import { getAccountsApi } from '../lib/account'


const AccountList = ({ navigation }: any) => {
    const [accounts, setAccounts] = useState<AccountInterface[]>()

    useEffect(() => {
        getAccountsApi(setAccounts)
    }, [useIsFocused()])

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
        backgroundColor: '#729343',
        margin: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})