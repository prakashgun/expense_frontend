import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import TransactionList from './TransactionList'
import Register from './Register'
import Menu from './Menu'
import VerifyRegister from './VerifyRegister'
import Login from './Login'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn && <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />}
                <Stack.Screen name="TransactionList" component={TransactionList} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="VerifyRegister" component={VerifyRegister} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Menu" component={Menu} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator