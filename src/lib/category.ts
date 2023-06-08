import { Alert } from "react-native";
import config from "../../config";
import { getLoginDetails } from "./storage";

export const   getCategoriesApi = async (setCategories: any) => {

    try {
        const loginDetails = await getLoginDetails()

        if ('login_token' in loginDetails) {
            if (loginDetails['login_token'] != null) {

                const response = await fetch(
                    `${config.API_URL}/expense/categories/`,
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