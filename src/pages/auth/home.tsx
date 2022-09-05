//import liraries
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

interface Props {
    navigation: Navigation;
}

// create a component
const Home = ({navigation}:Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigation.navigate('Tabs')}>
                <Text>Tabs</Text>
            </TouchableOpacity>

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
export default Home;
