import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


export default class LoginScreen extends React.Component {

    state = {
        name: ''
    }

    continue = () => {
        this.props.navigation.navigate("Chat", {name: this.state.name})
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.circle} />
                <View style={{marginTop: 64}}> 
                    <Image
                        source={require('')}
                        style={{ width: 100, height: 100, alignSelf: 'center'}}
                    />
                </View>
                <View style={{marginHorizontal: 32}}>
                    <Text style={styles.header}>Username</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F7'
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: '#FFF',
        position: 'absolute',
        left: -120,
        top: -20
    },
    header: {
        fontWeight: '800',
        fontSize: '30',
        color: '#514E5A',
        marginTop: 32,
    }
});