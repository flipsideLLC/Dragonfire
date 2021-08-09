import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from 'lodash';
import GLOBAL from '../Global';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

const androidBanner = 'ca-app-pub-9889547844187480/8148995014'; 
const androidInterstitial = 'ca-app-pub-9889547844187480/5841012986';
const iosBanner = 'ca-app-pub-9889547844187480/5522831677';
const iosInterstitial = 'ca-app-pub-9889547844187480/6279996688';

const windowWidth = Dimensions.get('window').width;

export default class IntroScreen extends React.Component {

    constructor() {
        super();
    
        this.state = {
            name: '',
            roomCode: '',
        };

        
        this.bannerAdId = Platform.OS === 'ios' ? iosBanner : androidBanner;
        // Interstitials not set up yet
        this.interstitialAdId = Platform.OS === 'ios' ? iosInterstitial : androidInterstitial;
    
    }

    continue = () => {
        if (_.isEmpty(this.state.name)) {
            console.log('setting default name');
            GLOBAL.name = '?';
        } else {
            GLOBAL.name = this.state.name;
        }
        if (_.isEmpty(this.state.roomCode)) {
            console.log('setting default room');
            GLOBAL.roomCode = 'general';
        } else {
            GLOBAL.roomCode = this.state.roomCode;
        }
        this.props.navigation.navigate("Chat", {})
    }

    settings = () => {
        this.props.navigation.navigate("Settings", {})
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
                <View style={styles.circle} />
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={this.settings}>
                        <Image
                            source={require('../assets/AppIcon3.png')}
                            style={{ width: 64, height: 64, alignSelf: 'center' }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 32 }}>
                    <Text style={styles.header}>Username</Text>
                    <TextInput style={styles.input}
                        placeholder="Dragonfire Messenger App"
                        onChangeText={name => {
                            this.setState({ name });
                        }}
                        value={this.state.name}
                    />

                    <Text style={styles.header}>Room Code</Text>
                    <TextInput style={styles.input}
                        placeholder="Dragonfire Messenger App"
                        onChangeText={roomCode => {
                            this.setState({ roomCode });
                        }}
                        value={this.state.roomCode}
                    />

                    <View style={{ alignItems: 'flex-end', marginTop: 64 }}>
                        <TouchableOpacity style={styles.continue}
                            onPress={this.continue}>
                            <Ionicons name='arrow-forward-outline' size={24} color='#FFF' />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{ width: windowWidth, flex: 1 }}>
                        <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID={this.bannerAdId} // Test ID, Replace with your-admob-unit-id
                            servePersonalizedAds={false} // true or false
                        />
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#F4F5F7' // '#1b2029' //1b2029  //  // F4F5F7
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 250,
        // borderColor: 'black',
        backgroundColor: '#FFF', // '#ededed', // #FFF //152136 // fcfced
        position: 'absolute',
        left: -120,
        top: -20
    },
    header: {
        fontWeight: '800',
        fontSize: 30,
        color: '#514E5A',
        marginTop: 32,
    },
    input: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black', // BAB7C3
        borderRadius: 30,
        paddingHorizontal: 16,
        color: '#514E5A',
        fontWeight: '600',
    },
    continue: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#d4973b',
        alignItems: 'center',
        justifyContent: 'center',

    }
});