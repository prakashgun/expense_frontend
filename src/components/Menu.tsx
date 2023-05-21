
import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Header, Icon, ListItem } from '@rneui/base'
import CommonHeader from './CommonHeader'


const Menu = () => {
    const navigation = useNavigation<any>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)


    return (
        <View>
            <CommonHeader heading="Menu" />
            {isLoggedIn ? (
                <View>

                    {/* <TouchableOpacity
                onPress={() => navigation.navigate('AccountList')}
            >
                <ListItem key="AccountList" bottomDivider>
                    <Icon name="bank" type="font-awesome" />
                    <ListItem.Content>
                        <ListItem.Title>Accounts</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('CategoryList')}
            >
                <ListItem key="CategoryList" bottomDivider>
                    <Icon name="category" type="material-icons" />
                    <ListItem.Content>
                        <ListItem.Title>Categories</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TransactionList')}
                    >
                        <ListItem key="TransactionList" bottomDivider>
                            <Icon name="price-tag" type="entypo" />
                            <ListItem.Content>
                                <ListItem.Title>Transactions</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Logout')}
                    >
                        <ListItem key="Logout" bottomDivider>
                            <Icon name="logout" type="material-icons" />
                            <ListItem.Content>
                                <ListItem.Title>Logout</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                onPress={() => navigation.navigate('ImportTransactions')}
            >
                <ListItem key="ImportTransactions" bottomDivider>
                    <Icon name="file-import" type="font-awesome-5" />
                    <ListItem.Content>
                        <ListItem.Title>Import Transactions</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity> */}

                </View>
            ) : (
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('WelcomeScreen')}
                    >
                        <ListItem key="TransactionList" bottomDivider>
                            <Icon name="home" type="entypo" />
                            <ListItem.Content>
                                <ListItem.Title>Welcome</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default Menu