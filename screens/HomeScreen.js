import { View, Image, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import BookCarousel from '../components/BookCarousel';
import UniversityBook from '../components/UniversityBook';
import MovieList from '../components/movieList';

import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies, searchMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';
import moment from 'moment';

const ios = Platform.OS === 'ios';
const style = StyleSheet.create({

    logo: {
        height: 10,
        width: 10,
    },
});

export default function HomeScreen() {



    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const [selected, setSelected] = useState(0);

    useEffect(() => {
        getTrendingMovies();

    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();

        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }

    const day = moment().format(" DD ");
    const month = moment().format("MMM");
    const year = moment().format("YYYY");


    return (
        <View className="flex-1" >
           
            {/* Menu bar */}
            {/* <SafeAreaView className={ios ? "-mb-2" : "mb-3"} 
                style={{backgroundColor: "#60a7db", borderRadius: 30, paddingTop: 10, marginTop:-10,}}>
                <StatusBar />

                
                <View className="flex-row justify-between items-center mx-3">
                    
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="font-bold" style={{ marginStart: -165, fontSize:50 }} >{day} </Text>
                    <Text style={{ marginStart: -205, marginTop: -10, color:"white" }} className="font-bold">
                        {'\n'} {month}{'\n'} {year}</Text>
                     
        
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : ( */}
                    <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 10}}>

                        
                        <BookCarousel />
                        <UniversityBook />

                    </ScrollView>
        </View>


    )

}
