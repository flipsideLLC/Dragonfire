import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Share } from "react-native";
import Constants from 'expo-constants';
import { PulseIndicator } from 'react-native-indicators';
import { FontAwesome } from '@expo/vector-icons';
import { GiftedChat, Send, InputToolbar, Bubble } from "react-native-gifted-chat";
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import Fire from '../Fire';
import { FontAwesome5 } from '@expo/vector-icons';
import { SideMenu } from "./SideMenu";

const androidInterstitial = 'ca-app-pub-9889547844187480/5841012986';
const iosInterstitial = 'ca-app-pub-9889547844187480/6279996688';

class ChatScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            messages: [],
            hasShownInterstitial: false,
            showMenu: false,
            isMenuVisible: false,
        }
        this.interstitialAdId = Platform.OS === 'ios' ? iosInterstitial : androidInterstitial;
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.props.name
        };
    }

    componentDidMount() {
        Fire.setRoomCode(this.props.roomCode);
        Fire.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
        if (this.state.hasShownInterstitial === false) {
            this.setState({ hasShownInterstitial: true });
            this.showInterstitialAd();
        }
    }

    componentWillUnmount() {
        Fire.off();
    }

    loading = () => {
        return (
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
                <PulseIndicator
                    animating
                    size={100}
                    color='#d4973b'
                />
            </View>
        )
    }

    async showInterstitialAd() {
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        console.log(randomNumber);
        if (randomNumber === 13) {
            AdMobInterstitial.setAdUnitID(this.interstitialAdId);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
            await AdMobInterstitial.showAdAsync();
        }
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Join me on DragonChat! Room code is: ' + (this.props.roomCode) + ' \n Get the app on iOS: https://apps.apple.com/us/app/dragonchat/id1580447308 \n and android: ',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    //
                } else {
                    // 
                }
            } else if (result.action === Share.dismissedAction) {
                //
            }
        } catch (error) {
            alert(error.message);
        }
    };

    onShowMenu = () => {
        this.setState({ showMenu: true, isMenuVisible: true });
    }

    onCloseMenu = () => {
        this.setState({ showMenu: false, isMenuVisible: false });
    }

    sendButton = (props) => {
        return (
            <Send {...props}>
                <View style={{
                    marginRight: -15, marginBottom: -20, width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: '#d4973b', // 1b2029 
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <FontAwesome style={{ marginRight: 5, marginBottom: 5 }} size={30} color='white' name='send' />
                </View>
            </Send>
        );

    }

    customInputToolbar = props => {
        const { darkMode } = this.props;
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: darkMode ? '#41444A' : 'white',
                }}
                textInputStyle={{
                    color: darkMode ? '#BABBBE' : 'black',
                }}
            />
        );
    };

    customBubble = props => {
        const { darkMode } = this.props;
        return (
            <Bubble {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: darkMode ? '#ededed' : '#F0F0F0',
                    },
                    right: {
                        backgroundColor: darkMode ? 'black' : '#3585F7',
                    }
                }}
            />
        );
    };

    settings = () => {
        this.props.navigation.navigate('Settings', {})
    }

    render() {
        const { darkMode } = this.props;

        const chat = <GiftedChat
            messages={this.state.messages}
            onSend={Fire.send} user={this.user}
            placeholder={'Message the group'}
            showAvatarForEveryMessage={this.props.bubbles}
            renderChatEmpty={this.loading}
            renderSend={this.sendButton}
            alwaysShowSend={false}
            renderInputToolbar={this.customInputToolbar}
            renderBubble={this.customBubble}
            autoCorrect={false}
        />;

        return (
            <View style={darkMode ? styles.container_dark : styles.container}>
                <StatusBar barStyle={'light-content'} />
                <SideMenu
                    visible={this.state.isMenuVisible}
                    CloseModal={this.onCloseMenu.bind(this)}
                    shareCode={this.onShare.bind(this)}
                />
                <View style={darkMode ? styles.topMenuDark : styles.topMenu}>
                    <TouchableOpacity
                        style={{ marginTop: 10, marginBottom: -10 }}
                        onPress={this.onShowMenu}
                    >
                        <FontAwesome5 style={{ color: darkMode ? 'silver' : 'black', fontWeight: 'bold', fontSize: 20, paddingLeft: 10 }} size={24} color="black" name='bars' />
                    </TouchableOpacity>
                    <Text style={{ color: darkMode ? 'silver' : 'white', fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: -10 }}>{this.props.roomCode}</Text>
                    <TouchableOpacity
                        style={{ marginTop: 10, marginBottom: -10 }}
                        onPress={this.settings}
                    >
                        <FontAwesome5 style={{ color: darkMode ? 'silver' : 'black', fontWeight: 'bold', fontSize: 20, paddingRight: 10 }} size={24} color="black" name='cog' />
                    </TouchableOpacity>
                </View>
                <View style={darkMode ? styles.container_dark : styles.container}>
                    {chat}
                </View>
            </View>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white', //1b2029  //  // F4F5F7,
    },
    container_dark: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#2E3236', //1b2029  //  // F4F5F7
    },
    topMenu: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#d4973b',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topMenuDark: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#252933',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


const mapStateToProps = ({ chat }) => {
    const { name, roomCode, darkMode, bubbles } = chat;

    console.log('name: ', name);
    console.log('room: ', roomCode);
    console.log('darkMode: ', darkMode);
    console.log('bubbles: ', bubbles)

    return { name, roomCode, darkMode, bubbles };
};

export default connect(mapStateToProps)(ChatScreen);