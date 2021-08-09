import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from 'lodash';
import GLOBAL from '../Global';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

export default class SettingsScreen extends React.Component {

    state = {
        darkMode: GLOBAL.darkMode,
        bubbles: GLOBAL.bubbles,
    };

    back = () => {
        this.props.navigation.goBack()
    }

    toggleDarkMode = () => {
        this.setState({ darkMode: !this.state.darkMode })
        GLOBAL.darkMode = !GLOBAL.darkMode;
    }

    toggleBubbles = () => {
        this.setState({ bubbles: !this.state.bubbles })
        GLOBAL.bubbles = !GLOBAL.bubbles;
    }

    render() {
        return (
            <View style={styles.container}>
                {console.log(GLOBAL.darkMode)}
                <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
                <View style={styles.circle} />
                <View style={{ marginTop: 10 }}>
                    <Image
                        source={require('../assets/AppIcon3.png')}
                        style={{ width: 64, height: 64, alignSelf: 'center' }}
                    />
                </View>

                <View style={{ marginHorizontal: 32 }}>
                    <Text style={styles.header}>Dark Mode</Text>
                    <Switch
                        style={{ alignSelf: 'flex-start' }}
                        trackColor={{ false: "#767577", true: "grey" }}
                        thumbColor={this.state.darkMode ? "#d4973b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleDarkMode}
                        value={this.state.darkMode}
                    />

                    <Text style={styles.header}>Show Bubbles</Text>
                    <Switch
                        style={{ alignSelf: 'flex-start' }}
                        trackColor={{ false: "#767577", true: "grey" }}
                        thumbColor={this.state.bubbles ? "#d4973b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleBubbles}
                        value={this.state.bubbles}
                    />

                    <View style={{ alignItems: 'flex-start', marginTop: 64 }}>
                        <TouchableOpacity style={styles.continue}
                            onPress={this.back}>
                            <Ionicons name='arrow-back-outline' size={24} color='#FFF' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#1b2029' //1b2029  //  // F4F5F7
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