import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const AboutScreen = () => {
    return (
        
        <View style={styles.container}>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={styles.title}>About the Book App</Text>
            <Text style={{ color: "#60a7db", marginTop: -25, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>____________________________________</Text>
            <Text style={styles.description}>
                A book application for UoW students, which aims to provide effortless access to their course materials.
            </Text>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={styles.developers}>
                Developed by
            </Text>
            <Text style={{ color: "#60a7db", marginTop: -25, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>_____________________________</Text>
            
            <Text style={styles.names}>
                Shreyash Shantam
            </Text>
            <Text style={styles.names}>
                Nidhi Patel
            </Text>
            <Text style={styles.names}>
                Hanikumari Patel
            </Text>
        </View>
  
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '40%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:100, 
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#60a7db',
        paddingTop: 10
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
    },
    developers: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#60a7db',
        marginBottom: 10,
    },
    names: {
        fontSize: 16,
        color: 'black',
        fontSize:20
    },
});

export default AboutScreen;
