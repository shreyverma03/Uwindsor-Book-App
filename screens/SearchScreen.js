import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native'
// import React, { useCallback, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { XMarkIcon } from 'react-native-heroicons/outline'
// import { useNavigation } from '@react-navigation/native'
// import { debounce } from 'lodash'
// import Loading from '../components/loading'

// const {width, height} =  Dimensions.get('window');



// export default function SearchScreen() {
//     const [error, setError] = useState(null);
//     const [fullData, setFullData] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [books, setBooks] = useState([]);

//     const navigation = useNavigation();
//     const [loading, setLoading] = useState(false);
//     const [results, setResults] = useState([])


//     const fetchBooks = async () => {
//         try {
//           const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&came_from=pagination_1_2&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=50&multiFacets=facet_tlevel,include,available_p&multiFacets=facet_rtype,include,books&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=facet_library,exact,2181%E2%80%93147948590002181&rapido=false&refEntryActive=false&rtaLinks=true&scope=OCUL_Discovery_Network&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=new_Windsor_Omni&vid=01UTON_UW:UWINDSOR');
//           const data = await response.json();
//           console.log(data);
//           setBooks(data); 
//         } catch (error) {
//           console.error('Error fetching books:', error);
//         }
//       };
//     const handleSearch = search=>{
//         if(search && search.length>2){
//             setLoading(true);
//             fetchBooks().then(data=>{
//                 console.log('got search results');
//                 setLoading(false);
//                 if(data && data.results) setResults(data.results);
//             })
//         }else{
//             setLoading(false);
//             setResults([])
//         }
//       }
    
//     const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);    

//   return (
//     <SafeAreaView className="bg-neutral-800 flex-1">
//         {/* search input */}
//         <View 
//             className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >
//             <TextInput 
//                 onChangeText={handleTextDebounce} 
//                 placeholder="Search Book" 
//                 placeholderTextColor={'lightgray'} 
//                 className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" 
//             />
//             <TouchableOpacity 
//                 onPress={()=> navigation.navigate('Home')}
//                 className="rounded-full p-3 m-1 bg-neutral-500" 
//             >
//                 <XMarkIcon size="25" color="white" />
                
//             </TouchableOpacity>
//         </View>

//         {/* search results */}
//         {
//             loading? (
//                 <Loading />
//             ): 
//             results.length>0? (
//                 <ScrollView 
//                     showsVerticalScrollIndicator={false} 
//                     contentContainerStyle={{paddingHorizontal:15}}
//                     className="space-y-3"
//                 >
//                     <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
//                     <View className="flex-row justify-between flex-wrap">
//                         {
//                             results.map((item, index)=>{
//                                 return (
//                                     <TouchableWithoutFeedback 
//                                         key={index} 
//                                         onPress={()=> navigation.push('UniversityBooks', item)}>
//                                         <View className="space-y-2 mb-4">
//                                             <Text className="text-gray-300 ml-1">
//                                                 {
//                                                     item.pnx.display.title.length>22? item.pnx.display.title.slice(0,22)+'...': item.pnx.display.title
//                                                 }
//                                             </Text>
//                                         </View>
//                                     </TouchableWithoutFeedback>
//                                 )
//                             })
//                         }
//                     </View>
                    
//                 </ScrollView>
//             ):(
//                 <View className="flex-row justify-center">
//                     <Image 
//                         source={require('../assets/images/book_not_found.png')} 
//                         className="h-96 w-96"
//                     />
//                 </View>
//             )
//         }
//     </SafeAreaView>
//   )
// }
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
const {width, height} =  Dimensions.get('window');
export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&came_from=pagination_1_2&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=50&multiFacets=facet_tlevel,include,available_p&multiFacets=facet_rtype,include,books&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=facet_library,exact,2181%E2%80%93147948590002181&rapido=false&refEntryActive=false&rtaLinks=true&scope=OCUL_Discovery_Network&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=new_Windsor_Omni&vid=01UTON_UW:UWINDSOR');
      const data = await response.json();
      const docs = data.docs;
      setBooks(docs);
    }catch (error) {
        console.error('Error fetching books:', error);
      }
    };

  
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank

    setFilteredDataSource(books);
    setMasterDataSource(books);
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        return item.pnx.display.title.toUpperCase().indexOf(text.toUpperCase()) > -1;
      });
      setFilteredDataSource(newData);
      console.log(newData + 'nd');
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.pnx.display.title.toUpperCase()}
      </Text>
    );
  };


  const getItem = (item) => {
    // Function for click on an item
    alert( ' Title : ' + item.pnx.display.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 100,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});