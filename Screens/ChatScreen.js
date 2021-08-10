import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { PulseIndicator } from 'react-native-indicators';
import { FontAwesome } from '@expo/vector-icons';
import { GiftedChat, Send, InputToolbar, Bubble } from "react-native-gifted-chat";
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import Fire from '../Fire';

const androidInterstitial = 'ca-app-pub-9889547844187480/5841012986';
const iosInterstitial = 'ca-app-pub-9889547844187480/6279996688';

class ChatScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            messages: [],
            hasShownInterstitial: false,
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
        if(this.state.hasShownInterstitial === false){
            this.setState({hasShownInterstitial: true});
            this.showInterstitialAd();
        }
    }

    componentWillUnmount() {
        Fire.off();
    }

    loading = () => {
        return (
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
                <PulseIndicator
                    animating
                    size={100}
                    color='#d4973b'
                />
            </View>
        )
    }

    async showInterstitialAd() {
        console.log('HELLO');
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        console.log(randomNumber);
        if ( randomNumber === 3 ) {
            AdMobInterstitial.setAdUnitID(this.interstitialAdId);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
            await AdMobInterstitial.showAdAsync();
          }
       
      }

    sendButton = (props) => {
        return (
            <Send {...props}>
                <View style={{
                    marginRight: -15, marginBottom: -20, width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: '#d4973b', // 1b2029 // 
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
                {chat}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white' //1b2029  //  // F4F5F7
    },
    container_dark: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#2E3236' //1b2029  //  // F4F5F7
    },
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
