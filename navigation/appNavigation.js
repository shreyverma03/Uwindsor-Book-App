import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import OSBookDetailsScreen from '../screens/OSBookDetailsScreen';
import UniversityBookDetailsScreen from '../screens/UniversityBookDetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Icon from 'react-native-vector-icons/Ionicons'
import EmailForm from '../screens/emailForm';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer({ navigation }) {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Home" component={HomeScreen} options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="black" 
              onPress={()=> navigation.navigate('Search')} />
            ),
          }} />
      <Drawer.Screen name="About" component={AboutScreen} 
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: () => (
          <TouchableWithoutFeedback
          onPress={() => navigation.goBack()} >
          <Icon name="md-arrow-back" size={24} color="#000" />
      </TouchableWithoutFeedback>

        ),
      }}/>
    </Drawer.Navigator>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/images/homepageImage.png')}
    />
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Drawer"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OSBookDetails" options={{headerShown: false}} component={OSBookDetailsScreen} />
        <Stack.Screen name="EmailForm" options={{headerShown: false}} component={EmailForm} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
        <Stack.Screen name="UniversityBookDetails" options={{headerShown: false}} component={UniversityBookDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
