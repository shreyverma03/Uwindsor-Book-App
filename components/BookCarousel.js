import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get('window');

const BookCarousel = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      //const response = await axios.get('https://openlibrary.org/search.json?title=computer+science');
      const response = await fetch('https://openlibrary.org/search.json?title=computer+science');
      //const data = response.data;
      const data = await response.json();
      const {docs} = data;
      const randomBooks = getRandomBooks(docs, 30).filter((book) => book.cover_i); // Filter
      setBooks(randomBooks); // Adjust the slice based on your API response structure
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
    navigation.navigate('OSBookDetails', { book });
  };

  const renderBookItem = ({ item }) => {
    const coverid = item.cover_i;
  const imageUrl = `https://covers.openlibrary.org/b/id/${coverid}-L.jpg`;
    return (
      <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View >
       
        <Image source={{ uri: imageUrl}} 
        style={{
                width: width * 0.3,
                height: height * 0.2
              }} 
        className="rounded-3xl" 
        />
        <Text style={styles.bookTitle}>{item.title}</Text>
        
      </View>
      </TouchableOpacity>
    );
  };

  return (
      <View >
          <Text className=" text-xl mx-4 mb-5 font-bold" style={{ fontFamily:'Times New Roman', fontSize: 25 }}>Open Source Books</Text>
         <Carousel
        data={books}
        renderItem={renderBookItem}
        inactiveSlideOpacity={0.60}
              sliderWidth={width}
              autoplay={true}
            itemWidth={width*0.36}
            slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 
  bookImage: {
    width: 100,
    height: 150,
  },
  bookTitle: {
      fontSize: 14,
      marginTop: 10,
      color: '#60a20b',
      fontFamily: 'Times New Roman',
      fontWeight: 'bold'
  },

});

export default BookCarousel;
