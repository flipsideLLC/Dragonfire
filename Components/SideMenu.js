import { Text, TouchableOpacity, View, Dimensions, FlatList, Image } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SideMenu = ({ visible, CloseModal, shareCode, roomList }) => {
    return (
        <Modal
            animationType={"fade"}
            animationIn={"slideInLeft"}
            animationOut={"slideOutLeft"}
            windowWidth={windowWidth}
            isVisible={visible}
            style={{ marginLeft: -20, marginVertical: -20, height: windowHeight }}
        >
            <View style={{ flex: 1, width: windowWidth * 0.85, height: windowHeight, padding: 20, backgroundColor: '#f2f5f5', borderColor: 'silver', borderWidth: 1 }}>
                <View style={{ marginTop: Constants.statusBarHeight + 5, alignSelf: 'center' }}>
                    <Image
                        source={require('../assets/AppIcon3.png')}
                        style={{ width: 64, height: 64, alignSelf: 'center' }}
                    />
                </View>
                <View style={{ flex: 9, paddingBottom: 10, marginHorizontal: 15, marginTop: 30, marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Rooms:</Text>
                    <FlatList
                        data={roomList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => { shareCode(item) }}
                            >
                                <View style={{ padding: 5, width: windowWidth * 0.90, backgroundColor: 'grey', marginTop: 10 }}>
                                    <Text style={{ fontSize: 20 }}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ alignItems: 'flex-end', marginTop: 64, marginBottom: 20 }}>
                        <TouchableOpacity style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            backgroundColor: '#d4973b',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={() => { CloseModal() }}>
                            <Ionicons name='arrow-back-outline' size={24} color='#FFF' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export { SideMenu };
