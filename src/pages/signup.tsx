//import liraries
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectCountryScreen from '../components/dropdown';


// create a component
const SignUp = () => {
    return (
        <View style={styles.container}>
            <SelectCountryScreen/>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SignUp;

