import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonHeader from './CommonHeader'
import { Input } from '@rneui/themed'
import SearchableCountryPicker from './SearchableCountryPicker'
import countries from '../lib/countries'
import { useNavigation } from '@react-navigation/native'

type Country = {
    name: string;
    code: string;
    dialCode: string;
  };

const Register = () => {
    const navigation = useNavigation<any>()

    const [selectedCountry, setSelectedCountry] = useState<Country>({
        name: 'India',
        code: 'IN',
        dialCode: '+91',
      });

    return (
        <View style={styles.container}>
            <CommonHeader heading="Register" />
            <SearchableCountryPicker countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
            <Input
                placeholder='Mobile'
                leftIcon={{ type: 'font-awesome', name: 'phone' }}
            />            
            <Input
            placeholder='First Name'
            leftIcon={{ type: 'material-icons', name: 'person' }}
        />
        <Input
            placeholder='Last Name'
            leftIcon={{ type: 'material-icons', name: 'person' }}
        />
                    <TouchableOpacity style={[styles.button, styles.register]} onPress={()=>navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button:{
        width: '88%',
        height:50,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center'
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold'
    },
    login:{
        backgroundColor:'#096A2E'
    },
    register:{
        backgroundColor:'#729343'
    }
})