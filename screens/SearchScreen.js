import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { debounce, size } from 'lodash'
import Loading from '../components/loading'
import { AlignCenter } from 'react-native-feather'
import { contains } from 'lodash';
import filter from 'lodash.filter'

const {width, height} =  Dimensions.get('window');



export default function SearchScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
   
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const dummyimage= "https://uwindsor.primo.exlibrisgroup.com/discovery/custom/01UTON_UW-UWINDSOR/img/icon_book.png";
    useEffect(() => {
        fetchBooks();
      }, []);


  
  
    const fetchBooks = async () => {
        try {
            const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&came_from=pagination_1_2&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=50&multiFacets=facet_tlevel,include,available_p&multiFacets=facet_rtype,include,books&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=facet_library,exact,2181%E2%80%93147948590002181&rapido=false&refEntryActive=false&rtaLinks=true&scope=OCUL_Discovery_Network&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=new_Windsor_Omni&vid=01UTON_UW:UWINDSOR');
            const data = await response.json();
            
            const {docs} = data;
         
            const randomBooks = getRandomBooks(docs, 50).map((book) => ({
                ...book,
                imageUrl: book.pnx.addata.isbn ? `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${book.pnx.addata.isbn}/sc.jpg` : dummyimage,
              }));
          
            setBooks(randomBooks); 
            setFullData(randomBooks);
            setFilteredDataSource(randomBooks);
            setMasterDataSource(randomBooks);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };

      const getRandomBooks = (books, count) => {
        const shuffledBooks = books.sort(() => 0.5 - Math.random()); // Shuffle the books array
        return shuffledBooks.slice(0, count); // Return the first 'count' books from the shuffled array
      };

      const searchFilterFunction = (text) => {
        if (text) {
            setLoading(true);
            const newData = masterDataSource.filter((item) => {
                
                const itemData = item.pnx.display.title[0];
                
                const textData = text;
               
                setLoading(false);
                return itemData.indexOf(textData) > -1;
            }).map((book) => ({
                ...book,
                imageUrl: book.imageUrl === dummyimage ? dummyimage : book.imageUrl,
              }));
            setFilteredDataSource(newData);
            setSearchQuery(text);
        } else {
            const newData = masterDataSource.map((book) => ({
                ...book,
                imageUrl: book.imageUrl === dummyimage ? dummyimage : book.imageUrl,
              }));
            setFilteredDataSource(masterDataSource);
            setSearchQuery(text);
        }
    };
      
    
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">

        {/* search input */}
        <View 
            className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >
            <TextInput 
                //onChangeText={handleSearch}
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchQuery}
                placeholder="Search Books" 
                placeholderTextColor={'lightblue'} 
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" 
            />
            <TouchableOpacity 
                onPress={()=> navigation.navigate('Home')}
                className="rounded-full p-3 m-1 bg-neutral-500" 
            >
                <XMarkIcon size="25" color="white" />
                
            </TouchableOpacity>
        </View>

        {/* search results */}
        {
            loading? (
                <Loading />
            ):
            filteredDataSource.length>0? (
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingHorizontal:15}}
                    className="space-y-3"
                >
                    <Text className="text-white font-semibold ml-1">Results ({filteredDataSource.length})</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            filteredDataSource.map((item, index)=>{
                               
                                return (
                                    <TouchableWithoutFeedback 
                                        key={index} 
                                        
                                        onPress={()=> navigation.push('UniversityBookDetails', {item, searchnavigate: 'true'} )}>
                                        <View className="space-y-2 mb-4">
                                            <Image
                                            source={{ uri: item.imageUrl === dummyimage ? dummyimage : item.imageUrl }}
                                            className="rounded-3xl" 
                                            style={{ width: width*0.44, height: height*0.3}} // adjust the width and height as per your requirement
                                            />
                                            <Text className="text-gray-300 ml-1">
                                                {
                                                   
                                                    item.pnx.display.title[0].length>22? item.pnx.display.title[0].slice(0,22)+'...': item.pnx.display.title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                    
                </ScrollView>
                ):(
                    
                    <View >
                        <Text className="text-white font-semibold ml-1" style={{marginTop:height*0.02}}>Results ({filteredDataSource.length}) </Text>
                        <View className="flex-row justify-center" style={{marginTop:height*0.15}}>
                        <Image 
                            source={require('../assets/images/booktime2.png')} 
                            className="h-96 w-96"
                        />
                        </View>
                    </View>
                )
            
        }
    </SafeAreaView>
  )
}