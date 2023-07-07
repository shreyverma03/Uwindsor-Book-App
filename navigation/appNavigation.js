import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MoviesScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import OSBookDetailsScreen from '../screens/OSBookDetailsScreen';
import UniversityBookDetailsScreen from '../screens/OSBookDetailsScreen';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Movies" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name="OSBookDetails" options={{headerShown: false}} component={OSBookDetailsScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
        <Stack.Screen name="UniversityBookDetails" options={{headerShown: false}} component={UniversityBookDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
