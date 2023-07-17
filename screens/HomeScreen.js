import { View, ScrollView} from 'react-native'
import React from 'react'
import BookCarousel from '../components/BookCarousel';
import UniversityBook from '../components/UniversityBook';


export default function HomeScreen() {
  return (
    <View className="flex-1 bg-cyan-100">
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
