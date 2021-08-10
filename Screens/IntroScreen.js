import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from 'lodash';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import { nameChanged, roomChanged } from '../actions';
import { withOrientation } from "react-navigation";

class IntroScreen extends React.Component {

    continue = () => {
        if (_.isEmpty(this.props.name)) {
            console.log('setting default name');
            this.props.nameChanged('?');
        }
        if (_.isEmpty(this.props.roomCode)) {
            console.log('setting default room');
            this.props.roomChanged('general');
        }
        this.props.navigation.navigate('Chat', {});
    }

    settings = () => {
        this.props.navigation.navigate('Settings', {})
    }

    render() {
        const { darkMode } = this.props;
        return (
            <View style={darkMode ? styles.container_dark : styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
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
                    <Text style={styles.header}>Username</Text>
                    <TextInput style={styles.input}
                        placeholder="Dragonfire Messenger App"
                        onChangeText={name => {
                            this.props.nameChanged(name);
                        }}
                        value={this.props.name}
                    />

                    <Text style={styles.header}>Room Code</Text>
                    <TextInput style={styles.input}
                        placeholder="Dragonfire Messenger App"
                        onChangeText={roomCode => {
                            this.props.roomChanged(roomCode);
                        }}
                        value={this.props.roomCode}
                    />

                    <View style={{ alignItems: 'flex-end', marginTop: 64 }}>
                        <TouchableOpacity style={styles.continue}
                            onPress={this.continue}>
                            <Ionicons name='arrow-forward-outline' size={24} color='#FFF' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ chat }) => {
    const { name, roomCode, darkMode } = chat;

    console.log('name: ', name);
    console.log('room: ', roomCode);
    console.log('darkMode: ', darkMode);

    return { name, roomCode, darkMode };
}; 

export default connect(mapStateToProps, { nameChanged, roomChanged })(IntroScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#F4F5F7' //1b2029  //  // F4F5F7
    },
    container_dark: {
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
    circle_dark: {
        width: 500,
        height: 500,
        borderRadius: 250,
        borderColor: 'black',
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
    continue: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#d4973b',
        alignItems: 'center',
        justifyContent: 'center',

    }
});