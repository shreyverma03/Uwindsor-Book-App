import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon} from 'react-native-heroicons/solid';
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'; 
import { LinearGradient } from 'expo-linear-gradient'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
		
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
  const [location,setLocation] = useState([]);
 
  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    try {
      const response = await fetch(locationApi);
      const jsonData = await response.json();
      // Extract the required data from jsonData.delivery.bestlocation.callnumber and handle it as needed
      setLocation([
        jsonData.delivery.bestlocation.subLocation.split('- ')[1]+" - "+jsonData.delivery.bestlocation.subLocation.split('- ')[2],
        '( ' + jsonData.delivery.bestlocation.callNumber + ' )'
      ]);

    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };
  
  const { book } = route.params;
 
  const coverid = route.params.book.pnx.addata.isbn;
  const navigation = useNavigation();
  const locationApi ='https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs/L/alma'+route.params.book.pnx.display.mms[0]+'?vid=01UTON_UW:UWINDSOR&lang=en&search_scope=MyInst_and_CI&adaptor=Local%20Search%20Engine&lang=en'
  const dummyImage= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBlaRpwiZTcfRlQF0AZdjBhve1BECVe5e0BcdAUijnJ8a6AeDakQHReAP1cM_PZgVXICTTJf2XOFev3GoyT14k9KhSVdP5z4vOC-EMBAxLGvMxQ0agZqIonH6BHFKXNbD6qu4tBSTbVJ8W2PRSX5_1_PGsjHqmKruy16qzCy1FR5nzoUIhr17TreaC/w200-h200/Sample%20Paper%20Library%20cbse.jpg";                                                                                                                                                                                                                                                                                                                                                                                                                                   
  const imageUrl= coverid ? `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${coverid}/sc.jpg` : dummyImage;
  return (
    
    <ScrollView 
    contentContainerStyle={{paddingBottom: 20}} 
    className="flex-1 bg-neutral-900">

  {/* back button and book poster */}
  <View className="w-full">
    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
        <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
            <ChevronLeftIcon size="30" strokeWidth={2.5} color="white" />
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
              <Text className="text-white text-center text-3xl font-bold tracking-widest" style={{ fontFamily: 'Times New Roman' } }>
            {
                book?.pnx.display.title[0]?.split(':')[0]
            }
        </Text>
        <Text style={{ textAlign: 'center', color: 'white', padding: 10, fontWeight: 'bold' }}>_____________________________</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
                      <Text style={{ textAlign: 'center', color: '#60a7db', paddingStart: 10, fontSize: 18, fontFamily: 'Times New Roman', fontWeight: 'bold', }}>Published Year</Text>
                      <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Times New Roman'  }}>{book?.pnx.addata.date}</Text>
  </View>
  <View style={{ flex: 1 }}>
                      <Text style={{ textAlign: 'center', color: '#60a7db', fontSize: 18, fontFamily: 'Times New Roman', fontWeight: 'bold', }}>Publisher</Text>
                      <Text style={{ textAlign: 'center', color: 'white', flexDirection: 'column', fontFamily: 'Times New Roman' }}>{book?.pnx.display.publisher || 'N/A'}</Text>
  </View>
  <View style={{ flex: 1 }}>
                      <Text style={{ textAlign: 'center', color: '#60a7db', fontSize: 18, fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Language</Text>
                      <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Times New Roman' }}>{book?.pnx.display.language}</Text>
  </View>
</View>

<View >
                  <Text style={{ textAlign: 'center', color: '#60a7db', paddingStart: 10, fontSize: 18, fontFamily: 'Times New Roman',fontWeight: 'bold',paddingBottom:10 }}>Leddy Library Location</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
                          <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Times New Roman'  }}>{location[0]}</Text>
       </View>
        <View style={{ flex: 1 }}>
                        
                          <Text style={{ textAlign: 'center', color: 'white', flexDirection: 'column', fontFamily: 'Times New Roman'  }}>{location[1]}</Text>
        </View>
        </View>
  </View>
        
<View style={{ marginTop: 20, paddingTop: 40, paddingStart: 20 }}>
                  <Text style={{ color: '#60a7db', fontWeight: 'bold', fontSize: 18, fontFamily: 'Times New Roman' }}>Authors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {
            (book?.pnx.display.contributor || book?.pnx.display.creator)?.map((author, index) => (
              <View key={index} style={{ width: 120,alignItems: 'center', padding: 10 }}>
                 <Image source={require('../assets/icons/person.png')} style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white' }} />
                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Times New Roman' }}>{author?.split(':')[0]}</Text>
              </View>
            ))
          }
        </View>
        </View>

        </ScrollView>
        </View>
       
       		

    <Button
      title="EMAIL INFO"
      onPress={() =>
        navigation.navigate('EmailForm', { item: book, location: location[0] + ' ' + location[1] })
      }
    />
        </View>
        </ScrollView>

)

        }
       else if (searchnavigate === 'true') {
        const [isFavourite, toggleFavourite] = useState(false);
        const [loading, setLoading] = useState(false);
        const [location,setLocation] = useState([]);
 
        useEffect(() => {
          fetchLocationData();
        }, []);
      
        const fetchLocationData = async () => {
          try {
            const response = await fetch(locationApi);
            const jsonData = await response.json();
            // Extract the required data from jsonData.delivery.bestlocation.callnumber and handle it as needed
            setLocation([
              jsonData.delivery.bestlocation.subLocation.split('- ')[1]+" - "+jsonData.delivery.bestlocation.subLocation.split('- ')[2],
              '( ' + jsonData.delivery.bestlocation.callNumber + ' )'
            ]);
      
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        };
       
        const { book } = route.params;
       // console.log("route00="+JSON.stringify(route.params));
        //console.log("route100="+JSON.stringify(route));
        const locationApi ='https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs/L/alma'+route.params.item.pnx.display.mms[0]+'?vid=01UTON_UW:UWINDSOR&lang=en&search_scope=MyInst_and_CI&adaptor=Local%20Search%20Engine&lang=en'
        const coverid = route.params.item.pnx.addata.isbn;

        const navigation = useNavigation();
        const dummyImage= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBlaRpwiZTcfRlQF0AZdjBhve1BECVe5e0BcdAUijnJ8a6AeDakQHReAP1cM_PZgVXICTTJf2XOFev3GoyT14k9KhSVdP5z4vOC-EMBAxLGvMxQ0agZqIonH6BHFKXNbD6qu4tBSTbVJ8W2PRSX5_1_PGsjHqmKruy16qzCy1FR5nzoUIhr17TreaC/w200-h200/Sample%20Paper%20Library%20cbse.jpg";                                                                                                                                                                                                                                                                                                                                                                                                                                   
  const imageUrl= coverid ? `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${coverid}/sc.jpg` : dummyImage;
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
                      route.params.item?.pnx.display.title[0]?.split(':')[0]
                  }
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flex: 1 }}>
  <Text style={{ textAlign: 'center', color: '#60a7db', paddingStart: 10, fontSize:18, fontWeight: 'bold', }}>Published Year</Text>
    <Text style={{ textAlign: 'center',color: 'white'  }}>{route.params.item?.pnx.addata.date}</Text>
  </View>
  <View style={{ flex: 1 }}>
  <Text style={{ textAlign: 'center', color: '#60a7db', fontSize: 18, fontWeight: 'bold', }}>Publisher</Text>
    <Text style={{ textAlign: 'center', color: 'white',flexDirection: 'column' }}>{route.params.item?.pnx.display.publisher || 'N/A'}</Text>
  </View>
  <View style={{ flex: 1 }}>
  <Text style={{ textAlign: 'center', color: '#60a7db', fontSize: 18, fontWeight: 'bold', }}>Language</Text>
    <Text style={{ textAlign: 'center',color: 'white'  }}>{route.params.item?.pnx.display.language}</Text>
  </View>
</View>
      
<View >
<Text style={{ textAlign: 'center', color: '#60a7db', paddingStart: 10, fontSize:18, fontWeight: 'bold',paddingBottom:10 }}>Leddy Library Location</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
                      <Text style={{ textAlign: 'center', color: 'white',  }}>{location[0]}</Text>
       </View>
        <View style={{ flex: 1 }}>
                        
                      <Text style={{ textAlign: 'center', color: 'white', flexDirection: 'column',  }}>{location[1]}</Text>
        </View>
        </View>
  </View>     
              
<View style={{ marginTop: 20, paddingTop: 40, paddingStart: 20 }}>
                      <Text style={{ color: '#60a7db', fontWeight: 'bold', fontSize: 18,  }}>Authors</Text>
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
