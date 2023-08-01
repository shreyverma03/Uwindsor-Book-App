<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const AboutScreen = () => {
    return (
        <View>
        <View style={styles.container}>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={styles.title}>About the Book App</Text>
            <Text style={{ color: "#60a7db", marginTop: -25, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>__________________________________</Text>
            <Text style={styles.description}>
                A book application for UoW students, which aims to provide effortless access to their course materials.
            </Text>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={styles.developers}>
                Developed by
            </Text>
                <Text style={{ color: "#60a7db", marginTop: -25, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>_____________________________</Text>
            </View>
            <View style={{ paddingStart:60 }}>
            <Text style={styles.names}>
                    <Image
                        style={{ width: 45, height: 45, borderRadius: 25, }}
                    source={require('../assets/icons/male_profile.png')}
                />
                  Shreyash Shantam
            </Text>
            <Text style={styles.names}>
                <Image
                        style={{ width: 45, height: 45, borderRadius: 25, }}
                    source={require('../assets/icons/female_profile.png')}
                />
                  Nidhi Patel
            </Text>
            <Text style={styles.names}>
                <Image
                        style={{ width: 45, height: 45, borderRadius: 25,  }}
                    source={require('../assets/icons/female_profile.png')}
                />
                  Hanikumari Patel
                </Text>
            </View>
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
        
        alignItems: 'center',
        marginTop:20, 
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        marginBottom: 10,
        color: '#60a7db',
        paddingTop: 10
    },
    description: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'black',
        marginBottom: 20,
    },
    developers: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: '#60a7db',
        marginBottom: 10,
    },
    names: {
        fontSize: 18,
        paddingStart: 10,
        paddingTop: -10,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'black',
        fontSize:20
    },
});

export default AboutScreen;
=======
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const AboutScreen = () => {
    return (
        <View>
        <View style={styles.container}>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={styles.title}>About the Book App</Text>
            <Text style={{ color: "#60a7db", marginTop: -25, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>__________________________________</Text>
            <Text style={styles.description}>
                A book application for UoW students, which aims to provide effortless access to their course materials.
            </Text>
            <Text className="text-black text-xl mx-4 mb-5 font-bold" style={styles.developers}>
                Developed by
            </Text>
                <Text style={{ color: "#60a7db", marginTop: -25, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>_____________________________</Text>
            </View>
            <View style={{ paddingStart:60 }}>
            <Text style={styles.names}>
                    <Image
                        style={{ width: 45, height: 45, borderRadius: 25, }}
                    source={require('../assets/icons/male_profile.png')}
                />
                  Shreyash Shantam
            </Text>
            <Text style={styles.names}>
                <Image
                        style={{ width: 45, height: 45, borderRadius: 25, }}
                    source={require('../assets/icons/female_profile.png')}
                />
                  Nidhi Patel
            </Text>
            <Text style={styles.names}>
                <Image
                        style={{ width: 45, height: 45, borderRadius: 25,  }}
                    source={require('../assets/icons/female_profile.png')}
                />
                  Hanikumari Patel
                </Text>
            </View>
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
        
        alignItems: 'center',
        marginTop:20, 
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        marginBottom: 10,
        color: '#60a7db',
        paddingTop: 10
    },
    description: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'black',
        marginBottom: 20,
    },
    developers: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: '#60a7db',
        marginBottom: 10,
    },
    names: {
        fontSize: 18,
        paddingStart: 10,
        paddingTop: -10,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'black',
        fontSize:20
    },
});

export default AboutScreen;
>>>>>>> cd9fb665b584cd70d6d47de1be0ea830b1d76ce6
