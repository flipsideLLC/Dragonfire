import { Text, TouchableOpacity, TouchableWithoutFeedback, View, Dimensions, FlatList, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import _ from 'lodash';
import Dialog from "react-native-dialog";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SideMenu = ({ visible, CloseModal, shareCode, roomList, darkMode, changeRooms, currentRoom, removeRoom, pushRoom, goBack }) => {
    const [show, setShow] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [alert, setAlert] = useState(false);


    const confirmDelete = (roomCode) => {
        Alert.alert(
            "Delete " + roomCode + '?',
            _.isEqual(roomCode, currentRoom) ?
                'Are you sure you want to remove your current group?' :
                'Are you sure you want to remove this group?',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Delete",
                    onPress: () => deleteActions(roomCode)
                }
            ]
        );
    }

    // <Dialog.Container visible={showInput}>
    //     <Dialog.Title>Add a New Room</Dialog.Title>
    //     <Dialog.Description>
    //         Type in the name of the room you would like to add:
    //     </Dialog.Description>
    //     <Dialog.Input
    //         placeholder="Enter new room name"
    //         placeholderTextColor='silver'
    //         onChangeText={name => {
    //             updateRoomInput(name);
    //         }}
    //         value={newRoomName}
    //         maxLength={20}
    //     />
    //     {alert &&
    //         <Text style={{ marginLeft: 10, color: 'red' }}>The max room length is 15 characters!</Text>
    //     }
    //     <Dialog.Button label="Cancel" onPress={() => {
    //         console.log("Cancel Pressed")
    //         setNewRoomName('');
    //     }} />
    //     <Dialog.Button label="Add" onPress={() => {
    //         pushRoom(newRoomName.toLowerCase());
    //         setNewRoomName('');
    //     }} />

    const addRoom = (newRoomCode) => {
        Alert.prompt(
            'Add a New Room',
            'Type in the name of the room you would like to add:',
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed")
                    },
                },
                {
                    text: "Add", onPress: (name) => {
                        pushRoom(name.toLowerCase());
                    }
                }
            ],
        );
    }

    const deleteActions = (roomCode) => {
        removeRoom(roomCode);
        setShow(false);
        if (_.isEqual(roomCode, currentRoom)) {
            close();
            goBack();
        }
    }

    const close = () => {
        setShow(false);
        CloseModal();
    }

    const swapRooms = (roomCode) => {
        if (!_.isEqual(roomCode, currentRoom)) {
            changeRooms(roomCode);
            setShow(false);
            CloseModal();
        }
    }

    const updateRoomInput = (newRoomCode) => {
        if (newRoomCode.length >= 15) {
            setAlert(true);
            setNewRoomName(newRoomCode.slice(0, 15));
        } else {
            setAlert(false);
            setNewRoomName(newRoomCode);
        }
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => close()}
        >
            <Dialog.Container style={{ flex: 1 }} visible={showInput}>
                <Dialog.Title>Add a New Room</Dialog.Title>
                <Dialog.Description>
                    Type in the name of the room you would like to add:
                </Dialog.Description>
                <Dialog.Input
                    placeholder="Enter new room name"
                    placeholderTextColor='silver'
                    onChangeText={name => {
                        updateRoomInput(name);
                    }}
                    value={newRoomName}
                    maxLength={20}
                />
                {alert &&
                    <Text style={{ marginLeft: 10, color: 'red' }}>The max room length is 15 characters!</Text>
                }
                <Dialog.Button label="Cancel" onPress={() => {
                    setShowInput(false);
                    setNewRoomName('');
                    setAlert(false)
                }} />
                <Dialog.Button label="Add" onPress={() => {
                    if (!_.includes(roomList, newRoomName.toLowerCase())) {
                        pushRoom(newRoomName.toLowerCase());
                    }
                    setShowInput(false);
                    setNewRoomName('');
                    setAlert(false);
                }} />
            </Dialog.Container>
            <Modal
                animationType={"fade"}
                animationIn={"slideInLeft"}
                animationOut={"slideOutLeft"}
                windowWidth={windowWidth}
                isVisible={visible}
                style={{ marginLeft: -20, marginVertical: -20, height: windowHeight }}
            >
                <TouchableWithoutFeedback onPress={() => close()}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: -20,
                    }} />
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, width: windowWidth * 0.90, height: windowHeight, padding: 20, backgroundColor: darkMode ? '#2E3236' : '#f2f5f5', borderColor: 'silver', borderWidth: 1 }}>
                    <View style={{ marginTop: Constants.statusBarHeight + 5, alignSelf: 'center' }}>
                        <Image
                            source={require('../assets/AppIcon3.png')}
                            style={{ width: 64, height: 64, alignSelf: 'center' }}
                        />
                    </View>
                    <View style={{ flex: 9, paddingBottom: 10, marginHorizontal: 15, marginTop: 30, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={{ color: darkMode ? 'white' : 'black', fontWeight: 'bold', fontSize: 25, alignSelf: 'center' }}>Rooms:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {show &&
                                    <TouchableOpacity style={{
                                        borderRadius: 8,
                                        width: 40,
                                        height: 40,
                                        marginRight: 10,
                                        backgroundColor: 'green',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                        onPress={() => {
                                            setShowInput(true);
                                            console.log('onpress');
                                        }}>
                                        <MaterialIcons name={'add'} size={24} color={'#FFF'} />
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={{
                                    borderRadius: 8,
                                    width: 40,
                                    height: 40,
                                    backgroundColor: show ? 'red' : 'grey',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                    onPress={() => { setShow(!show) }}>
                                    <MaterialIcons name={show ? 'close' : 'edit'} size={24} color={'#FFF'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={roomList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'column' }} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                onPress={() => { swapRooms(item) }}
                                            >
                                                <View style={{ borderRadius: 8, borderColor: item === currentRoom ? '#d4973b' : 'silver', borderWidth: item === currentRoom ? 5 : 1, padding: 5, width: windowWidth * 0.7, backgroundColor: darkMode ? 'black' : 'white', marginTop: 10 }}>
                                                    <Text style={{ color: darkMode ? 'white' : 'black', paddingLeft: 10, paddingBottom: 5, fontSize: 20 }}>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        {show &&
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
                                                {!_.isEqual(item, 'general') && <TouchableOpacity style={{
                                                    marginLeft: 10,
                                                    marginTop: 10,
                                                    borderRadius: 8,
                                                    width: 40,
                                                    backgroundColor: 'red',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                    onPress={() => { confirmDelete(item) }}>
                                                    <Ionicons name='trash' size={24} color='#FFF' />
                                                </TouchableOpacity>
                                                }
                                                <TouchableOpacity style={{
                                                    marginLeft: 10,
                                                    marginTop: 10,
                                                    borderRadius: 8,
                                                    width: 40,
                                                    backgroundColor: 'blue',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                    onPress={() => { shareCode(item) }}>
                                                    <Ionicons name='share-social' size={24} color='#FFF' />
                                                </TouchableOpacity>
                                                {!_.isEqual(item, currentRoom) &&
                                                    <TouchableOpacity style={{
                                                        marginLeft: 10,
                                                        marginTop: 10,
                                                        borderRadius: 8,
                                                        width: 40,
                                                        backgroundColor: 'green',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                        onPress={() => { swapRooms(item) }}>
                                                        <Ionicons name='arrow-redo' size={24} color='#FFF' />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        }
                                    </View>
                                );
                            }}
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
                                onPress={() => { close() }}>
                                <Ionicons name='arrow-back-outline' size={24} color='#FFF' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </GestureRecognizer>
    );
};

export { SideMenu };
