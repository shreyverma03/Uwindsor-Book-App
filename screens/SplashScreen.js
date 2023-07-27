
import React, { Component } from 'react';
import { View, ImageBackground, Image } from 'react-native';

var bg = require('../assets/icons/book_store.png');
var logo = require('../assets/icons/book_store.png');
export default class Splash extends Component {

    constructor(props) {

        super(props);
        setTimeout(() => {
            this.props.navigation.navigate("Drawer");
        }, 3000);
    }

    render() {
        return (
            <ImageBackground
                style={{ height: '100%', width: '100%', backgroundColor: 'white' }} >
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={logo} style={{ height: 500, width: 500 }}></Image>
                </View>
            </ImageBackground>
        );
    }

}