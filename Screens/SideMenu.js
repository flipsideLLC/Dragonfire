import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SideMenu = ({ visible, CloseModal, shareCode}) => {
	return (
        <Modal 
            animationType={"fade"}
            animationIn={"slideInLeft"}
            animationOut={"slideOutLeft"}
            windowWidth = {windowWidth}
            isVisible={visible}
            style={{marginLeft: -20, marginVertical: -20, height: windowHeight}}
        >
            <View style={{ flex: 1, width: windowWidth * 0.85, height: windowHeight, padding: 20, backgroundColor: '#f2f5f5', borderColor: 'silver', borderWidth: 1 }}>
                <Text style={{marginTop: Constants.statusBarHeight +5, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', color: 'black'}}>D r a g o n C h a t</Text>
               
                <TouchableOpacity 
                    onPress={() => { shareCode()} }
                    style={{justifyContent: 'center', marginVertical: 20, paddingVertical: 5, borderRadius: 8, borderColor: 'silver', borderWidth: 1, backgroundColor: '#152650'}}
                >
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 14, color: 'white'}}> Share Room Code </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {CloseModal()} }
                    style={{justifyContent: 'center', marginVertical: 20, paddingVertical: 5, borderRadius: 8, borderColor: 'silver', borderWidth: 1, backgroundColor: '#152650'}}
                >
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 14, color: 'white'}}> Close </Text>
                </TouchableOpacity>
               
            </View>
        </Modal>
	);
};

export { SideMenu };
