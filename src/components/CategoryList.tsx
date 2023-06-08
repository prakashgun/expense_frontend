import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import config from '../../config'
import CategoryInterface from '../interfaces/CategoryInterface'
import { getLoginDetails } from '../lib/storage'
import CategoryItem from './CategoryItem'
import CommonHeader from './CommonHeader'
import { getCategoriesApi } from '../lib/category'


const CategoryList = ({ navigation }: any) => {
    const [categories, setCategories] = useState<CategoryInterface[]>()

    useEffect(() => {
        getCategoriesApi(setCategories)
    }, [useIsFocused()])

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