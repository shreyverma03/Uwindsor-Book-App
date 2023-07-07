import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb'
import { debounce, size } from 'lodash'
import Loading from '../components/loading'
import { AlignCenter } from 'react-native-feather'

const {width, height} =  Dimensions.get('window');



export default function SearchScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchBooks();
    })
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    const fetchBooks = async () => {
        try {
          const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&came_from=pagination_1_2&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=50&multiFacets=facet_tlevel,include,available_p&multiFacets=facet_rtype,include,books&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=facet_library,exact,2181%E2%80%93147948590002181&rapido=false&refEntryActive=false&rtaLinks=true&scope=OCUL_Discovery_Network&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=new_Windsor_Omni&vid=01UTON_UW:UWINDSOR');
          const data = await response.json();
          console.log(data);
          const {docs} = data;
         const {records} = data;
         //const randomBooks = getRandomBooks(docs, 50); 
        // const booksWithImages = docs.filter((book) => book.pnx.addata.isbn); // Filter out books without isbn
          setBooks(records); 
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
    // const handleSearch = search=>{
    //     if(search && search.length>2){
    //         setLoading(true);
    //         searchBooks({
    //             query: search,
    //             include_adult: false,
    //             language: 'en-US',
    //             page: '1'
    //         }).then(data=>{
    //             console.log('got search results');
    //             setLoading(false);
    //             if(data && data.results) setResults(data.results);
    //         })
    //     }else{
    //         setLoading(false);
    //         setResults([])
    //     }
    //   }
    
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);    

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">

        {/* search input */}
        <View 
            className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >
            <TextInput 
                onChangeText={(query) => handleSearch(query)} 
                value={searchQuery}
                placeholder="Search Book" 
                placeholderTextColor={'lightgray'} 
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
            isLoading? (
                <Loading />
            ): 
            results.length>0? (
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingHorizontal:15}}
                    className="space-y-3"
                >
                    <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            results.map((item, index)=>{
                                return (
                                    <TouchableWithoutFeedback 
                                        key={index} 
                                        onPress={()=> navigation.push('UniversityBooks', item)}>
                                        <View className="space-y-2 mb-4">
                                            <Text className="text-gray-300 ml-1">
                                                {
                                                    item.pnx.display.title.length>22? item.pnx.display.title.slice(0,22)+'...': item.pnx.display.title
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
                <View className="flex-row justify-center">
                    <Image 
                        source={require('../assets/images/movieTime.png')} 
                        className="h-96 w-96"
                    />
                </View>
            )
        }
    </SafeAreaView>
  )
}