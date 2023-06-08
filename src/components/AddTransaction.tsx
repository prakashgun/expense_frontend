import { useIsFocused } from '@react-navigation/native'
import { Button, Input } from '@rneui/base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import AccountInterface from '../interfaces/AccountInterface'
import CategoryInterface from '../interfaces/CategoryInterface'
import TransactionTypeInterface, { transactionTypes } from '../interfaces/TransactionTypeInterface'
import AccountSelect from './AccountSelect'
import CategorySelect from './CategorySelect'
import CommonHeader from './CommonHeader'
import TransactionTypeSelect from './TransactionTypeSelect'
import { getLoginDetails } from '../lib/storage'
import config from '../../config'
import { getAccountsApi } from '../lib/account'
import { getCategoriesApi } from '../lib/category'


const AddTransaction = ({ navigation, route }: any) => {
    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<any>()
    const [valueError, setValueError] = useState<string>('')
    const transactionDate: Date = new Date(route.params.transactionDate)
    const [selectedAccount, setSelectedAccount] = useState<AccountInterface>()
    const [accounts, setAccounts] = useState<AccountInterface[]>()
    const [selectedToAccount, setSelectedToAccount] = useState<AccountInterface>()
    const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionTypeInterface>(transactionTypes[0])
    const [selectedCategory, setSelectedCategory] = useState<CategoryInterface>()
    const [categories, setCategories] = useState<CategoryInterface[]>()
    const [isLoading, setIsLoading] = useState(true)
    

    const loadFormData = async () => {
        await getAccountsApi(setAccounts)
        await getCategoriesApi(setCategories)

        if(accounts){
         setSelectedAccount(accounts[0])
        }

        if(categories){
            setSelectedCategory(categories[0])
        }
    }

    useEffect(() => {
        setIsLoading(true)
        loadFormData()
        setIsLoading(false)
    }, [useIsFocused()])

    const onAddItemPress = async () => {
        setValueError('')

        if (!value) {
            setValueError('Value cannot be empty')
            return
        }

        if (!selectedAccount) {
            Alert.alert('Account must be selected')
            return
        }

        if (!selectedCategory) {
            Alert.alert('Category must be selected')
            return
        }

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/expense/categories/`,
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${loginDetails['login_token']}`
                            },
                            body: JSON.stringify({
                                "name": name,
                                "value": value,
                                "is_income": (selectedTransactionType.name === 'Income') ? true : false,
                                "account_id": selectedAccount.id,
                                "category_id": selectedCategory.id,
                                "transaction_date": transactionDate
                            })
                        }
                    )

                    const json = await response.json();

                    if (json.hasOwnProperty('non_field_errors')) {
                        Alert.alert('Error', json.non_field_errors[0])
                    }
                }
            } else {
                Alert.alert('Error', 'Please login again')
            }

            navigation.navigate('TransactionList')
        } catch (error) {
            console.error(error);
        }

        navigation.navigate('TransactionList')
    }

    return (
        <View>
            <CommonHeader heading="Add Transaction" />
            {isLoading ? <ActivityIndicator size="large" color="#3e3b33" /> :
                <View>
                    {transactionTypes && selectedTransactionType &&
                        <TransactionTypeSelect
                            transactionTypes={transactionTypes}
                            selectedTransactionType={selectedTransactionType}
                            setSelectedTransactionType={setSelectedTransactionType}
                            inputButtonStyle={styles.inputButtonStyle} 
                        />}
                    {categories && selectedCategory && <CategorySelect
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory} 
                        inputButtonStyle={styles.inputButtonStyle}               
                    />}
                    {accounts && selectedAccount && selectedTransactionType &&
                        <AccountSelect
                            accounts={accounts}
                            selectedAccount={selectedAccount}
                            setSelectedAccount={setSelectedAccount}
                            selectedTransactionType={selectedTransactionType}
                            isFromAccount={true}
                            inputButtonStyle={styles.inputButtonStyle}
                        />}
                    {accounts && selectedToAccount && selectedTransactionType && selectedTransactionType.name === 'Transfer' &&
                        <AccountSelect
                            accounts={accounts}
                            selectedAccount={selectedToAccount}
                            setSelectedAccount={setSelectedToAccount}
                            selectedTransactionType={selectedTransactionType}
                            isFromAccount={false}
                            inputButtonStyle={styles.inputButtonStyle}
                        />}
                                            <Input
                        placeholder="Value"
                        leftIcon={{ type: 'material-icons', name: 'account-balance-wallet' }}
                        keyboardType="numeric"
                        onChangeText={setValue}
                        errorMessage={valueError}
                    />
                    <Input
                        placeholder="Note (Optional)"
                        leftIcon={{ type: 'font-awesome', name: 'sticky-note' }}
                        onChangeText={setName}
                    />
                    <Button title="Save" onPress={onAddItemPress} />
                </View>}
        </View>
    )
}

export default AddTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {},
    disabled_input: {
        opacity: 1
    },
    inputButtonStyle:{
        backgroundColor:"olive",
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        padding: 5
    }
})
