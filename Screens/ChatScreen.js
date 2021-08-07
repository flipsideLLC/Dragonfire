import React from "react";
import { SafeAreaView, View } from "react-native";
import Constants from 'expo-constants';
import { PulseIndicator } from 'react-native-indicators';
import { FontAwesome } from '@expo/vector-icons';
import { GiftedChat, Send } from "react-native-gifted-chat";
import Fire from '../Fire';
import GLOBAL from '../Global';

export default class ChatScreen extends React.Component {

    state = {
        messages: [],
        roomCode: GLOBAL.roomCode
    }

    get user() {
        return {
            _id: Fire.uid,
            name: GLOBAL.name
        };
    }

    componentDidMount() {
        Fire.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    }

    componentWillUnmount() {
        Fire.off();
    }

    loading = () => {
        return (
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                <PulseIndicator
                    animating
                    size={100}
                    color='#d4973b'
                />
            </View>
        )
    }

    sendButton = (props) => {
        return (
            <Send {...props}>
                <View style={{ marginRight: 15, marginBottom: 5 }}>
                    <FontAwesome size={35} color='#d4973b' name='send' />
                </View>
            </Send>
        );

    }

    render() {
        const chat = <GiftedChat
            messages={this.state.messages}
            onSend={Fire.send} user={this.user}
            renderLoading={this.loading}
            placeholder={'Type a message...'}
            showAvatarForEveryMessage={true}
            renderChatEmpty={this.loading}
            renderSend={this.sendButton}
            alwaysShowSend={true}
        />;
        return (
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight, backgroundColor: 'white' }}>
                {chat}
            </View>
        );
    }
}
