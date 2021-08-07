import React from "react";
import { SafeAreaView } from "react-native";
import Constants from 'expo-constants';
import { GiftedChat } from "react-native-gifted-chat";
import Fire from '../Fire';

export default class ChatScreen extends React.Component {

    state = {
        messages: []
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.props.navigation.state.params.name
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

    render() {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;


        // Removed this and it works just fine on android..?
        
        /*
        if(Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={30} enabled>
                   {chat}
                </KeyboardAvoidingView>
            );
        }
        */

        return <SafeAreaView style={{flex: 1, marginTop: Constants.statusBarHeight}}> 
            {chat}
         </SafeAreaView>
    }

}