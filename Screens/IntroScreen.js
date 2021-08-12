import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from 'lodash';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { nameChanged, roomChanged, pushRoom, clearState } from '../actions';
import { StatusBar } from 'expo-status-bar';

import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

const androidBanner = 'ca-app-pub-9889547844187480/8148995014';
const androidInterstitial = 'ca-app-pub-9889547844187480/5841012986';
const iosBanner = 'ca-app-pub-9889547844187480/5522831677';
const iosInterstitial = 'ca-app-pub-9889547844187480/6279996688';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class IntroScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            nameAlert: false,
            roomAlert: false,
        };


        this.bannerAdId = Platform.OS === 'ios' ? iosBanner : androidBanner;
        // Interstitials not set up for IntroScreen
        this.interstitialAdId = Platform.OS === 'ios' ? iosInterstitial : androidInterstitial;

    }

    continue = () => {
        if (_.isEmpty(this.props.name)) {
            console.log('setting default name');
            this.props.nameChanged('?');
        }
        if (_.isEmpty(this.props.roomCode)) {
            console.log('setting default room');
            this.props.roomChanged('general');
        } else {
            if (!_.includes(this.props.roomArray, this.props.roomCode)) {
                this.props.pushRoom(this.props.roomCode);
            }
        }
        this.setState({ nameAlert: false, roomAlert: false });
        this.props.navigation.navigate('Chat', {});
    }

    clearState = () => {
        this.props.clearState();
    }

    settings = () => {
        this.setState({ nameAlert: false, roomAlert: false });
        this.props.navigation.navigate('Settings', {})
    }

    updateNameInput = (name) => {
        if (name.length == 20) {
            this.setState({ nameAlert: true })
        } else {
            this.setState({ nameAlert: false })
            this.props.nameChanged(name);
        }
    }

    updateRoomInput = (roomCode) => {
        if (roomCode.length == 15) {
            this.setState({ roomAlert: true })
        } else {
            this.setState({ roomAlert: false })
            this.props.roomChanged(roomCode.toLowerCase());
        }
    }

    render() {
        const { darkMode } = this.props;
        return (
            <View style={{ flex: 10, minHeight: Math.round(windowHeight) }}>
                <View style={darkMode ? styles.container_dark : styles.container}>
                    <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
                    <View style={darkMode ? styles.circle_dark : styles.circle} />
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
                        <Text style={darkMode ? styles.header_dark : styles.header}>Username</Text>
                        <TextInput style={darkMode ? styles.input_dark : styles.input}
                            placeholder="Enter your username"
                            placeholderTextColor='silver'
                            onChangeText={name => {
                                this.updateNameInput(name);
                            }}
                            value={this.props.name}
                            maxLength={20}
                        />
                        {this.state.nameAlert &&
                            <Text style={{ marginLeft: 10, marginTop: 10, color: 'red' }}>The max name length is 20 characters!</Text>
                        }

                        <Text style={darkMode ? styles.header_dark : styles.header}>Room Code</Text>
                        <TextInput style={darkMode ? styles.input_dark : styles.input}
                            placeholder="Enter the code for your room"
                            placeholderTextColor='silver'
                            onChangeText={roomCode => {
                                this.updateRoomInput(roomCode);
                            }}
                            value={this.props.roomCode}
                            maxLength={15}
                        />
                        {this.state.roomAlert &&
                            <Text style={{ marginLeft: 10, marginTop: 10, color: 'red' }}>The max room length is 15 characters!</Text>
                        }


                        <View style={{ alignItems: 'flex-end', marginTop: 64 }}>
                            <TouchableOpacity style={styles.continue}
                                onPress={this.continue}>
                                <Ionicons name='arrow-forward-outline' size={24} color='#FFF' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'flex-end', marginTop: 64 }}>
                            <TouchableOpacity style={styles.clearState}
                                onPress={this.clearState}>
                                <Ionicons name='trash' size={24} color='#FFF' />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                <View style={darkMode ? styles.adBannerDark : styles.adBanner}>
                    <AdMobBanner
                        style={{ justifyContent: 'flex-end' }}
                        bannerSize="smartBannerPortrait"
                        adUnitID={this.bannerAdId} // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds={false} // true or false
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ chat }) => {
    const { name, roomCode, roomArray, darkMode } = chat;

    console.log('name: ', name);
    console.log('room: ', roomCode);
    console.log('roomArray: ', roomArray);
    console.log('darkMode: ', darkMode);

    return { name, roomCode, roomArray, darkMode };
};

export default connect(mapStateToProps, { nameChanged, roomChanged, pushRoom, clearState })(IntroScreen);

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
        // borderColor: 'black',
        backgroundColor: '#FFF', // '#ededed', // #FFF //152136 // fcfced
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
        backgroundColor: 'white',
        color: '#514E5A',
        fontWeight: '600',
    },
    input_dark: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black', // BAB7C3
        borderRadius: 30,
        paddingHorizontal: 16,
        backgroundColor: '#41444A',
        color: '#BABBBE',
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
    clearState: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    adBanner: {
        backgroundColor: '#F4F5F7',
    },
    adBannerDark: {
        backgroundColor: '#2E3236',
    }
});