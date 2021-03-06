import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Share, Dimensions } from "react-native";
import Constants from 'expo-constants';
import { PulseIndicator } from 'react-native-indicators';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { GiftedChat, Send, InputToolbar, Bubble } from "react-native-gifted-chat";
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobInterstitial } from 'expo-ads-admob';
import Fire from '../Fire';
import { SideMenu } from "../Components/SideMenu";
import { roomChanged, removeRoom } from '../actions';

const windowWidth = Dimensions.get('window').width;

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
        if (randomNumber === 3) {
            AdMobInterstitial.setAdUnitID(this.interstitialAdId);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
            await AdMobInterstitial.showAdAsync();
        }
    }

    onShare = async (code) => {
        try {
            const result = await Share.share({
                message:
                    'Join me on DragonChat! Room code is: ' + (code) + ' \n Get the app on iOS: https://apps.apple.com/us/app/dragonchat/id1580447308 \n and android: https://play.google.com/store/apps/details?id=com.dntgames.dragonfire',
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

    changeRoom = (roomCode) => {
        if (roomCode != this.props.roomCode) {
            Fire.off();
            Fire.setRoomCode(roomCode);
            this.props.roomChanged(roomCode)
            this.setState({ messages: [] })
            Fire.get(message =>
                this.setState(previous => ({
                    messages: GiftedChat.append(previous.messages, message)
                }))
            );
        }
    }

    render() {
        const { darkMode, roomArray } = this.props;

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
                { /* this view is required because statusbar background color is only for android, and we have to pad the content down for android */ }
                <View style={{ backgroundColor: 'black', height: Platform.OS === 'ios' ? Constants.statusBarHeight - 8 : Constants.statusBarHeight, width: windowWidth }} />
                <StatusBar
                    animated={true}
                    backgroundColor="black" // android only
                    style={'light'} // icon colors
                />
                <SideMenu
                    visible={this.state.isMenuVisible}
                    CloseModal={this.onCloseMenu.bind(this)}
                    shareCode={this.onShare.bind(this)}
                    roomList={roomArray}
                    darkMode={darkMode}
                    changeRooms={this.changeRoom.bind(this)}
                    currentRoom={this.props.roomCode}
                    removeRoom={this.props.removeRoom.bind(this)}
                    goBack={() => this.props.navigation.goBack()}
                />
                <View style={darkMode ? styles.topMenuDark : styles.topMenu}>
                    <TouchableOpacity
                        style={{ }}
                        onPress={this.onShowMenu}
                    >
                        <FontAwesome5 style={{ color: darkMode ? 'silver' : 'black', fontWeight: 'bold', fontSize: 30, paddingLeft: 15 }} color="black" name='bars' />
                    </TouchableOpacity>
                    <Text style={{ color: darkMode ? 'silver' : 'black', fontWeight: 'bold', fontSize: 20, paddingTop: 5 }}>{this.props.roomCode}</Text>
                    <TouchableOpacity
                        style={{ }}
                        onPress={this.settings}
                    >
                        <FontAwesome5 style={{ color: darkMode ? 'silver' : 'black', fontWeight: 'bold', fontSize: 30, paddingRight: 15 }} color="black" name='cog' />
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
        backgroundColor: 'white', //1b2029  //  // F4F5F7,
    },
    container_dark: {
        flex: 1,
        backgroundColor: '#2E3236', //1b2029  //  // F4F5F7
    },
    topMenu: {
        paddingVertical: 5,
        backgroundColor: '#d4973b',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topMenuDark: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: '#252933',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


const mapStateToProps = ({ chat }) => {
    const { name, roomCode, roomArray, darkMode, bubbles } = chat;
    return { name, roomCode, roomArray, darkMode, bubbles };
};

export default connect(mapStateToProps, { roomChanged, removeRoom })(ChatScreen);