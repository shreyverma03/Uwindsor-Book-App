import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

const BookCarousel = ( ) => {
  const dummyImage= "https://uwindsor.primo.exlibrisgroup.com/discovery/custom/01UTON_UW-UWINDSOR/img/icon_book.png";
  const [books, setBooks] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    fetchBooks();
    
  }, []);



  const fetchBooks = async () => {
    try {
      const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&came_from=pagination_1_2&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=50&multiFacets=facet_tlevel,include,available_p&multiFacets=facet_rtype,include,books&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=facet_library,exact,2181%E2%80%93147948590002181&rapido=false&refEntryActive=false&rtaLinks=true&scope=OCUL_Discovery_Network&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=new_Windsor_Omni&vid=01UTON_UW:UWINDSOR');
      const data = await response.json();
      
      const {docs} = data;
     //const {records} = data;
     const randomBooks = getRandomBooks(docs, 50); 
    // const booksWithImages = docs.filter((book) => book.pnx.addata.isbn); // Filter out books without isbn
      setBooks(randomBooks); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  const getRandomBooks = (books, count) => {
    const shuffledBooks = books.sort(() => 0.5 - Math.random()); // Shuffle the books array
    return shuffledBooks.slice(0, count); // Return the first 'count' books from the shuffled array
  };

  const handleBookPress = (book) => {
    // Navigate to the desired screen passing the book data as a parameter
    navigation.navigate('UniversityBookDetails', { book , searchnavigate: 'false'});
  };
  
  const renderBookItem = ({ item }) => {
   // console.log(item.addata);
    const coverid = item.pnx.addata.isbn;
 // const imageUrl = `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${coverid}/sc.jpg`;
  const imageUrl= item.pnx.addata.isbn ? `https://proxy-ca.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=${item.pnx.addata.isbn}/sc.jpg` : dummyImage;
  return (
    <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View>
        
        <Image source={{ uri: imageUrl}} 
        style={{
                width: width * 0.5,
                height: height * 0.4
              }} 
        className="rounded-3xl" 
        />
        <Text style={styles.bookTitle}>{item.pnx.display.title[0]?.split(':')[0]}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
       <Text className="text-black text-xl mx-4 mb-5 font-bold">University Books</Text>
          <Text style={{ color: "#60a7db", marginTop: -35, paddingStart: 15, paddingBottom: 15, fontWeight: 'bold' }}>_____________________________</Text>
      <Carousel
        data={books}
        renderItem={renderBookItem}
        inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

});

export default BookCarousel;
