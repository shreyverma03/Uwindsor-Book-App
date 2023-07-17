
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>A book application for UoW students, which aims to provide effortless access to their course materials. Developed by Shreyash Shantam
Nidhi Patel
Hanikumari Patel
             
</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default AboutScreen;