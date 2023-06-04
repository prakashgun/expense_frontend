import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Config from 'react-native-config'
import CategoryInterface from '../interfaces/CategoryInterface'
import { getLoginDetails } from '../lib/storage'
import CategoryItem from './CategoryItem'
import CommonHeader from './CommonHeader'


const CategoryList = ({ navigation }: any) => {
    const [categories, setCategories] = useState<CategoryInterface[]>()

    useEffect(() => {
        getCategoriesApi()
    }, [useIsFocused()])

    const getCategoriesApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${Config.API_URL}/expense/categories/`,
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
                    setCategories(json)

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
            <CommonHeader heading="Categories" />
            <ScrollView >
                {
                    categories && categories.map((category) => (
                        <CategoryItem
                            category={category}
                            key={category.id}
                            onPress={() => {
                                return navigation.navigate('CategoryScreen', { id: category.id })
                            }}
                        />
                    ))
                }

            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddCategory')}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryList

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