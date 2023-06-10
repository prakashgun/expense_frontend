import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TransactionInterface from '../interfaces/TransactionInterface'
import { getTransactionsApi } from '../lib/transaction'
import CommonHeader from './CommonHeader'
import TransactionItem from './TransactionItem'


const TransactionList = ({ navigation }: any) => {
    const [transactions, setTransactions] = useState<TransactionInterface[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const loadData = async () => {
        const allTransactions = await getTransactionsApi()
        setTransactions(allTransactions)
    }

    useEffect(() => {
        setIsLoading(true)
        loadData()
        setIsLoading(false)
    }, [useIsFocused()])

    return (
        <View style={styles.container}>
            <CommonHeader heading="Transactions" />
            {isLoading ? <ActivityIndicator size="large" color="#3e3b33" /> :
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

                </ScrollView>}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTransaction')}>
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