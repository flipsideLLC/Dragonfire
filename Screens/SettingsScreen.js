import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from 'lodash';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import { darkModeChanged, bubblesChanged } from '../actions';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

const androidBanner = 'ca-app-pub-9889547844187480/8148995014';
const androidInterstitial = 'ca-app-pub-9889547844187480/5841012986';
const iosBanner = 'ca-app-pub-9889547844187480/5522831677';
const iosInterstitial = 'ca-app-pub-9889547844187480/6279996688';

const windowWidth = Dimensions.get('window').width;

class SettingsScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            darkMode: GLOBAL.darkMode,
            bubbles: GLOBAL.bubbles,
        };

        this.bannerAdId = Platform.OS === 'ios' ? iosBanner : androidBanner;
        // Interstitials not set up yet
        this.interstitialAdId = Platform.OS === 'ios' ? iosInterstitial : androidInterstitial;

    }

    back = () => {
        this.props.navigation.goBack()
    }

    toggleDarkMode = () => {
        this.props.darkModeChanged();
    }

    toggleBubbles = () => {
        this.props.bubblesChanged();
    }

    render() {
        const { darkMode } = this.props;
        return (
            <View style={{ flex: 10 }}>
                <View style={darkMode ? styles.container_dark : styles.container}>
                    <StatusBar barStyle={'light-content'} />
                    <View style={darkMode ? styles.circle_dark : styles.circle} />
                    <View style={{ marginTop: 10 }}>
                        <Image
                            source={require('../assets/AppIcon3.png')}
                            style={{ width: 64, height: 64, alignSelf: 'center' }}
                        />
                    </View>

                    <View style={{ marginHorizontal: 32 }}>
                        <Text style={darkMode ? styles.header_dark : styles.header}>Dark Mode</Text>
                        <Switch
                            style={{ alignSelf: 'flex-start' }}
                            trackColor={{ false: "#73767B", true: "#d4973b" }}
                            thumbColor={"#FFFFFF"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleDarkMode}
                            value={this.props.darkMode}
                        />

                        <Text style={darkMode ? styles.header_dark : styles.header}>Show Bubbles</Text>
                        <Switch
                            style={{ alignSelf: 'flex-start' }}
                            trackColor={{ false: "#73767B", true: "#d4973b" }}
                            thumbColor={"#FFFFFF"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleBubbles}
                            value={this.props.bubbles}
                        />
                        <View style={{ alignItems: 'flex-start', marginTop: 64 }}>
                            <TouchableOpacity style={styles.continue}
                                onPress={this.back}>
                                <Ionicons name='arrow-back-outline' size={24} color='#FFF' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={darkMode ? styles.adBannerDark : styles.adBanner}>
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

const mapStateToProps = ({ chat }) => {
    const { darkMode, bubbles } = chat;

    console.log('darkMode: ', darkMode);
    console.log('bubbles: ', bubbles);

    return { darkMode, bubbles };
};

export default connect(mapStateToProps, { darkModeChanged, bubblesChanged })(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#F4F5F7' //1b2029  //  // F4F5F7
    },
    container_dark: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#2E3236' //1b2029  //  // F4F5F7
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 250,
        borderColor: 'black',
        backgroundColor: '#ededed', // #FFF //152136 // fcfced
        position: 'absolute',
        left: -120,
        top: -20
    },
    circle_dark: {
        width: 500,
        height: 500,
        borderRadius: 250,
        borderColor: '#363A3E',
        backgroundColor: 'grey', // #FFF //152136 // fcfced
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
    header_dark: {
        fontWeight: '800',
        fontSize: 30,
        color: '#FAFAFA',
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
    },
    adBanner: {
        width: windowWidth, 
        flex: .1,
        backgroundColor: '#F4F5F7'
    },
    adBannerDark: {
        width: windowWidth, 
        flex: .1,
        backgroundColor: '#2E3236'
    }
});