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
    const [imageExists, setImageExists] = useState(true);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const dummyimage= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBlaRpwiZTcfRlQF0AZdjBhve1BECVe5e0BcdAUijnJ8a6AeDakQHReAP1cM_PZgVXICTTJf2XOFev3GoyT14k9KhSVdP5z4vOC-EMBAxLGvMxQ0agZqIonH6BHFKXNbD6qu4tBSTbVJ8W2PRSX5_1_PGsjHqmKruy16qzCy1FR5nzoUIhr17TreaC/w200-h200/Sample%20Paper%20Library%20cbse.jpg";
    useEffect(() => {
        fetchBooks();
      }, []);


  
  
    const fetchBooks = async () => {
        try {
            const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=500&multiFacets=facet_rtype,include,book_chapters%7C,%7Cfacet_rtype,include,books%7C,%7Cfacet_library,include,2181%E2%80%93147948590002181%7C,%7Cfacet_topic,include,Computer+Science%7C,%7Cfacet_topic,include,Technology%7C,%7Cfacet_topic,include,Computer+Science,+Theory+%26+Methods%7C,%7Cfacet_topic,include,Computer+Science,+Information+Systems%7C,%7Cfacet_topic,include,Computer+Science,+Artificial+Intelligence%7C,%7Cfacet_topic,include,Computer+Communication+Networks%7C,%7Cfacet_topic,include,Computers%7C,%7Cfacet_topic,include,Computer+Communication+Systems%7C,%7Cfacet_topic,include,Information+Systems+Applications+Incl+Internet%7C,%7Cfacet_topic,include,Database+Management%7C,%7Cfacet_topic,include,Computer+Networks%7C,%7Cfacet_topic,include,Computer+Programming%7C,%7Cfacet_topic,include,Computer+Science%E2%80%94mathematics%7C,%7Cfacet_topic,include,User+Interfaces+Computer+Systems%7C,%7Cfacet_topic,include,Data+Mining%7C,%7Cfacet_topic,include,Electrical+Computer+Engineering%7C,%7Cfacet_topic,include,Computer+Science,+Interdisciplinary+Applications%7C,%7Cfacet_topic,include,Artificial+Intelligence%7C,%7Cfacet_topic,include,Software+Engineering%7C,%7Cfacet_topic,include,Software%7C,%7Cfacet_topic,include,Computer+Simulation%7C,%7Cfacet_tlevel,include,available_p&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=&rapido=false&refEntryActive=false&rtaLinks=true&scope=MyInst_and_CI&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=Everything&vid=01UTON_UW:UWINDSOR');
            const data = await response.json();
            
            const {docs} = data;
         
            const randomBooks = getRandomBooks(docs, 500).map((book) => ({
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
    <SafeAreaView className="flex-1">

        {/* search input */}
        <View 
            className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >
            <TextInput 
                //onChangeText={handleSearch}
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchQuery}
                placeholder="Search Books" 
                placeholderTextColor={'lightblue'} 
                className="pb-1 pl-6 flex-1 text-base font-semibold tracking-wider"  
            />
            <TouchableOpacity 
                onPress={()=>{ 
                   // handleClearSearch(); // Clear the search query first    
                navigation.navigate('Home')
            }}
                className="rounded-full p-3 m-1 bg-gray-500">
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
                    <Text className="font-bold ml-1" style={{color: "#60a7db"}}>Results ({filteredDataSource.length})</Text>
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
                                            onError={()=>console.log("Testttt123")}
                                            className="rounded-3xl" 
                                            style={{ width: width*0.44, height: height*0.3}} // adjust the width and height as per your requirement
                                            />
                                            <Text className="ml-1" style={{ color: "#60a7db", fontSize: 13 }}>
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
                        <Text className="font-bold ml-1" style={{color: "#60a7db"}}>Results ({filteredDataSource.length})</Text>
                        <View className="flex-row justify-center" style={{marginTop:-150}}>

                                  <Loading />
                                  
                        </View>
                    </View>
                )
            
        }
    </SafeAreaView>
  )
}