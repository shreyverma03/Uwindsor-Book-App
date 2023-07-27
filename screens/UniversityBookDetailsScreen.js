import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon} from 'react-native-heroicons/solid';
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'; 
import { LinearGradient } from 'expo-linear-gradient'

import { EmailForm } from './emailForm'
import { Button } from 'react-native-elements';

const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');

const UniversityBookDetailsScreen = ({ route }) => {
  const searchnavigate = route.params.searchnavigate;

  if (searchnavigate === 'false') {
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { book } = route.params;
  const coverid = route.params.book.pnx.addata.isbn;
  const navigation = useNavigation();
  const imageUrl = `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${coverid}/sc.jpg`;
  return (
    
    <ScrollView 
    contentContainerStyle={{paddingBottom: 20}} 
    className="flex-1 bg-neutral-900">

  {/* back button and book poster */}
  <View className="w-full">
    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
        <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite? theme.background: 'white'} />
        </TouchableOpacity>
    </SafeAreaView>
    {
        loading? (
            <Loading />
        ):(
            <View>  
                <Image 
                    source={{uri: imageUrl }}
                    style={{width, height: height*0.55}} 
                />
                 <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.40}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
            </View>
  )
        }
        </View>

        <View style={{marginTop: -(height*0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {
                book?.pnx.display.title
            }
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>First Published Year</Text>
    <Text style={{ textAlign: 'center',color: 'white'  }}>{book?.pnx.addata.date}</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>Publisher</Text>
    <Text style={{ textAlign: 'center', color: 'white',flexDirection: 'column' }}>{book?.pnx.display.publisher || 'N/A'}</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>Language</Text>
    <Text style={{ textAlign: 'center',color: 'white'  }}>{book?.pnx.display.language}</Text>
  </View>
</View>

        
        <View style={{ marginTop: 20, paddingTop: 50}}>
        <Text className="text-white text-md mx-4 mb-5">All Authors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {
            (book?.pnx.display.contributor || book?.pnx.display.creator)?.map((author, index) => (
              <View key={index} style={{ alignItems: 'center', padding: '1%' }}>
                <Image source={{ uri: 'https://static-00.iconduck.com/assets.00/person-icon-476x512-hr6biidg.png' }} style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white' }} />
                <Text style={{ color: 'white', textAlign: 'center' }}>{author}</Text>
              </View>
            ))
          }
        </View>
        </View>

        </ScrollView>
        </View>
        <Button title="EMAIL INFO" onPress={() => navigation.navigate('EmailForm')}></Button>
        </View>
        </ScrollView>

)

        }
       else if (searchnavigate === 'true') {
        const [isFavourite, toggleFavourite] = useState(false);
        const [loading, setLoading] = useState(false);
        
        const { book } = route.params;
        console.log("route00="+JSON.stringify(route.params));
        console.log("route100="+JSON.stringify(route));
        const coverid = route.params.item.pnx.addata.isbn;

        const navigation = useNavigation();
        const imageUrl = `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${coverid}/sc.jpg`;
        return (
          
          <ScrollView 
          contentContainerStyle={{paddingBottom: 20}} 
          className="flex-1 bg-neutral-900">
      
        {/* back button and movie poster */}
        <View className="w-full">
          <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
              <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                  <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
      
              <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                  <HeartIcon size="35" color={isFavourite? theme.background: 'white'} />
              </TouchableOpacity>
          </SafeAreaView>
          {
              loading? (
                  <Loading />
              ):(
                  <View>  
                      <Image 
                          source={{uri: imageUrl }}
                          style={{width, height: height*0.55}} 
                      />
                       <LinearGradient 
                              colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                              style={{width, height: height*0.40}}
                              start={{ x: 0.5, y: 0 }}
                              end={{ x: 0.5, y: 1 }}
                              className="absolute bottom-0"
                          />
                  </View>
        )
              }
              </View>
      
              <View style={{marginTop: -(height*0.09)}} className="space-y-3">
              {/* title */}
              <Text className="text-white text-center text-3xl font-bold tracking-widest">
                  {
                      route.params.item?.pnx.display.title
                  }
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>First Published Year</Text>
    <Text style={{ textAlign: 'center',color: 'white'  }}>{route.params.item?.pnx.addata.date}</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>Publisher</Text>
    <Text style={{ textAlign: 'center', color: 'white',flexDirection: 'column' }}>{route.params.item?.pnx.display.publisher || 'N/A'}</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>Language</Text>
    <Text style={{ textAlign: 'center',color: 'white'  }}>{route.params.item?.pnx.display.language}</Text>
  </View>
</View>
      
              
              <View style={{ marginTop: 20, paddingTop: 50}}>
              <Text className="text-white text-md mx-4 mb-5">All Authors</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
             
<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
{
  (route.params.item?.pnx.display.contributor || route.params.item?.pnx.display.creator)?.map((author, index) => (
    <View key={index} style={{ alignItems: 'center', padding: '1%' }}>
      <Image source={{ uri: 'https://static-00.iconduck.com/assets.00/person-icon-476x512-hr6biidg.png' }} style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white' }} />
      <Text style={{ color: 'white', textAlign: 'center' }}>{author}</Text>
    </View>
  ))
}
</View>
              </View>
      
              </ScrollView>
              </View>
              </View>
              </ScrollView>
      
      )

       }
};


export default UniversityBookDetailsScreen;
