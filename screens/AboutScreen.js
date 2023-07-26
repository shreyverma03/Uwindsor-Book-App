import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
    return (

        <View style={styles.container}>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={{ paddingTop: 10 }}>About</Text>
            <Text style={{ color: "#60a7db", marginTop: -35, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>_____________________________</Text>

            <Text style={styles.text}>
                A book application for UoW students, which aims to provide effortless access to their course materials available at Leddy Library.
                {'\n'} {'\n'}For more details:
                {'\n'}https://leddy.uwindsor.ca/about-library {'\n'} {'\n'}
            </Text>
            <Text style={{ color: "#60a7db", marginStart: -150, fontWeight: 'bold', fontSize:20 }}>
                Developed by:
                {'\n'}  Shreyash Shantam
                {'\n'}  Nidhi Patel
                {'\n'}  Hanikumari Patel</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:20
    },
    text: {
        fontSize: 20,
        paddingStart:15
    },
});

export default AboutScreen;