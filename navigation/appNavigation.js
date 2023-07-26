import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MoviesScreen';
import SplashScreen from '../screens/SplashScreen';
import SearchScreen from '../screens/SearchScreen';
import OSBookDetailsScreen from '../screens/OSBookDetailsScreen';
import UniversityBookDetailsScreen from '../screens/UniversityBookDetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Icon from 'react-native-vector-icons/Ionicons'

import { Image, TouchableWithoutFeedback } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer({ navigation }) {
    return (

        <Drawer.Navigator>

            <Drawer.Screen name="Home" component={HomeScreen} options={{
                headerTitle: (props) => 
                    <LogoTitle style={{ color: '#fff', paddingEnd: 50, }} {...props} />,
                    
             headerStyle: {
                 backgroundColor: '#60a7db',
                 borderRadius: 20,
                 height:110,

                },
                headerTintColor: '#fff',
                headerRight: () => (
                <MagnifyingGlassIcon size="25" strokeWidth={2} style={{ color:'white',paddingEnd: 50, }}
                            onPress={() => navigation.navigate('Search')} />
                       
                ),
          }} />
      

            <Drawer.Screen name="Search" component={SearchScreen}
                options={{
                    headerTitle: (props) => <LogoTitle style={{ color: '#fff', paddingEnd: 50, }} {...props} />,
                    headerStyle: {
                        backgroundColor: '#60a7db',
                        borderRadius: 20,
                        height: 110,

                    },
                    headerTintColor: '#fff',
                    headerRight: () => (

                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('Home')} >
                            <Icon name="md-arrow-back" size={24} style={{ color: 'white', paddingEnd: 10, }} />
                        </TouchableWithoutFeedback>

                    ),
                }} />
            <Drawer.Screen name="About" component={AboutScreen}
                options={{
                    headerTitle: (props) => <LogoTitle style={{ color: '#fff', paddingEnd: 50, }} {...props} />,
                    headerStyle: {
                        backgroundColor: '#60a7db',
                        borderRadius: 20,
                        height: 110,

                    },
                    headerTintColor: '#fff',
                    headerRight: () => (

                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('Home')} >
                            <Icon name="md-arrow-back" size={24} style={{ color: 'white', paddingEnd: 10, }} />
                        </TouchableWithoutFeedback>

                    ),
                }} />
    </Drawer.Navigator>
  );
}

function LogoTitle() {
  return (
    
      <Image
          style={{ width: 60, height: 60, marginBottom: -50, borderRadius: 20, }}
      source={require('../assets/images/homepageImage.png')}
    />
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={MyDrawer}  options={{ headerShown: false }}/>
        <Stack.Screen name="OSBookDetails" options={{headerShown: false}} component={OSBookDetailsScreen} />
        <Stack.Screen name="UniversityBookDetails" options={{headerShown: false}} component={UniversityBookDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
