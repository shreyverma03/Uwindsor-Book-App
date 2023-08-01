<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

const BookCarousel = ( ) => {
  const dummyImage= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBlaRpwiZTcfRlQF0AZdjBhve1BECVe5e0BcdAUijnJ8a6AeDakQHReAP1cM_PZgVXICTTJf2XOFev3GoyT14k9KhSVdP5z4vOC-EMBAxLGvMxQ0agZqIonH6BHFKXNbD6qu4tBSTbVJ8W2PRSX5_1_PGsjHqmKruy16qzCy1FR5nzoUIhr17TreaC/w200-h200/Sample%20Paper%20Library%20cbse.jpg";
  const [books, setBooks] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    fetchBooks();
    
  }, []);



  const fetchBooks = async () => {
    try {
      const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=500&multiFacets=facet_rtype,include,book_chapters%7C,%7Cfacet_rtype,include,books%7C,%7Cfacet_library,include,2181%E2%80%93147948590002181%7C,%7Cfacet_topic,include,Computer+Science%7C,%7Cfacet_topic,include,Technology%7C,%7Cfacet_topic,include,Computer+Science,+Theory+%26+Methods%7C,%7Cfacet_topic,include,Computer+Science,+Information+Systems%7C,%7Cfacet_topic,include,Computer+Science,+Artificial+Intelligence%7C,%7Cfacet_topic,include,Computer+Communication+Networks%7C,%7Cfacet_topic,include,Computers%7C,%7Cfacet_topic,include,Computer+Communication+Systems%7C,%7Cfacet_topic,include,Information+Systems+Applications+Incl+Internet%7C,%7Cfacet_topic,include,Database+Management%7C,%7Cfacet_topic,include,Computer+Networks%7C,%7Cfacet_topic,include,Computer+Programming%7C,%7Cfacet_topic,include,Computer+Science%E2%80%94mathematics%7C,%7Cfacet_topic,include,User+Interfaces+Computer+Systems%7C,%7Cfacet_topic,include,Data+Mining%7C,%7Cfacet_topic,include,Electrical+Computer+Engineering%7C,%7Cfacet_topic,include,Computer+Science,+Interdisciplinary+Applications%7C,%7Cfacet_topic,include,Artificial+Intelligence%7C,%7Cfacet_topic,include,Software+Engineering%7C,%7Cfacet_topic,include,Software%7C,%7Cfacet_topic,include,Computer+Simulation%7C,%7Cfacet_tlevel,include,available_p&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=&rapido=false&refEntryActive=false&rtaLinks=true&scope=MyInst_and_CI&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=Everything&vid=01UTON_UW:UWINDSOR');
      //const response = await fetch('http://localhost:5001/custom_api');
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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
                width: width * 0.3,
                height: height * 0.2
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
          <Text className=" text-xl mx-4 mb-5 font-bold" style={{ fontFamily: 'Times New Roman', fontSize: 25, paddingTop:20 }} >University Books</Text>
         
      <Carousel
        data={books}
        renderItem={renderBookItem}
        inactiveSlideOpacity={0.60}
            sliderWidth={width}
              itemWidth={width * 0.36}
            slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  bookTitle: {
        fontSize: 14,
        marginTop: 10,
        color: '#60a20b',
        fontFamily: 'Times New Roman',
        fontWeight: 'bold'
  },

});

export default BookCarousel;
=======
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

const BookCarousel = ( ) => {
  const dummyImage= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBlaRpwiZTcfRlQF0AZdjBhve1BECVe5e0BcdAUijnJ8a6AeDakQHReAP1cM_PZgVXICTTJf2XOFev3GoyT14k9KhSVdP5z4vOC-EMBAxLGvMxQ0agZqIonH6BHFKXNbD6qu4tBSTbVJ8W2PRSX5_1_PGsjHqmKruy16qzCy1FR5nzoUIhr17TreaC/w200-h200/Sample%20Paper%20Library%20cbse.jpg";
  const [books, setBooks] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    fetchBooks();
    
  }, []);



  const fetchBooks = async () => {
    try {
      const response = await fetch('https://uwindsor.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?blendFacetsSeparately=false&disableCache=false&getMore=0&inst=01UTON_UW&lang=en&limit=500&multiFacets=facet_rtype,include,book_chapters%7C,%7Cfacet_rtype,include,books%7C,%7Cfacet_library,include,2181%E2%80%93147948590002181%7C,%7Cfacet_topic,include,Computer+Science%7C,%7Cfacet_topic,include,Technology%7C,%7Cfacet_topic,include,Computer+Science,+Theory+%26+Methods%7C,%7Cfacet_topic,include,Computer+Science,+Information+Systems%7C,%7Cfacet_topic,include,Computer+Science,+Artificial+Intelligence%7C,%7Cfacet_topic,include,Computer+Communication+Networks%7C,%7Cfacet_topic,include,Computers%7C,%7Cfacet_topic,include,Computer+Communication+Systems%7C,%7Cfacet_topic,include,Information+Systems+Applications+Incl+Internet%7C,%7Cfacet_topic,include,Database+Management%7C,%7Cfacet_topic,include,Computer+Networks%7C,%7Cfacet_topic,include,Computer+Programming%7C,%7Cfacet_topic,include,Computer+Science%E2%80%94mathematics%7C,%7Cfacet_topic,include,User+Interfaces+Computer+Systems%7C,%7Cfacet_topic,include,Data+Mining%7C,%7Cfacet_topic,include,Electrical+Computer+Engineering%7C,%7Cfacet_topic,include,Computer+Science,+Interdisciplinary+Applications%7C,%7Cfacet_topic,include,Artificial+Intelligence%7C,%7Cfacet_topic,include,Software+Engineering%7C,%7Cfacet_topic,include,Software%7C,%7Cfacet_topic,include,Computer+Simulation%7C,%7Cfacet_tlevel,include,available_p&newspapersActive=true&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,computer+science&qExclude=&qInclude=&rapido=false&refEntryActive=false&rtaLinks=true&scope=MyInst_and_CI&searchInFulltextUserSelection=false&skipDelivery=Y&sort=rank&tab=Everything&vid=01UTON_UW:UWINDSOR');
      //const response = await fetch('http://localhost:5001/custom_api');
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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
                width: width * 0.3,
                height: height * 0.2
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
          <Text className=" text-xl mx-4 mb-5 font-bold" style={{ fontFamily: 'Times New Roman', fontSize: 25, paddingTop:20 }} >University Books</Text>
         
      <Carousel
        data={books}
        renderItem={renderBookItem}
        inactiveSlideOpacity={0.60}
            sliderWidth={width}
              itemWidth={width * 0.36}
            slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  bookTitle: {
        fontSize: 14,
        marginTop: 10,
        color: '#60a20b',
        fontFamily: 'Times New Roman',
        fontWeight: 'bold'
  },

});

export default BookCarousel;
>>>>>>> cd9fb665b584cd70d6d47de1be0ea830b1d76ce6
