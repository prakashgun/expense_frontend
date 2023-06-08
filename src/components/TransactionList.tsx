import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import config from '../../config'
import TransactionInterface from '../interfaces/TransactionInterface'
import { getLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'
import TransactionItem from './TransactionItem'


const TransactionList = ({ navigation }: any) => {
    const [transactions, setTransactions] = useState<TransactionInterface[]>()
    const [transactionDate, setTransactionDate] = useState<Date>(new Date())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTransactionsApi()
    }, [useIsFocused()])

    const getTransactionsApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/expense/transactions/`,
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
                    setTransactions(json)

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
            <CommonHeader heading="Transactions" />
            <ScrollView >
                {
                    transactions && transactions.map((transaction) => (
                        <TransactionItem
                            transaction={transaction}
                            key={transaction.id}
                            onPress={() => {
                                return navigation.navigate('TransactionScreen', { id: transaction.id })
                            }}
                        />
                    ))
                }

            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTransaction', { transactionDate: transactionDate.toISOString() })}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TransactionList

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