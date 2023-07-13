import { View, Image, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import BookCarousel from '../components/BookCarousel';
import UniversityBook from '../components/UniversityBook';

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';
const style = StyleSheet.create({
 
  logo: {
    height: 50,
    width:50,
  },
});

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();



  return (
    <View className="flex-1 bg-cyan-100">
      {/* search bar */}
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="dark" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="black" />
          <Image style={style.logo} source={require('../assets/images/homepageImage.png')} />
          <Text 
            className="text-black text-3xl font-bold">
              <Text style={styles.text}>B</Text>ooks
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="black" />
          </TouchableOpacity>
        
        </View>
      </SafeAreaView>
      {
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >
      
      
      <BookCarousel />
      <UniversityBook />
            
            

          </ScrollView>
        
      }
  </View>
  )
  
}
