import firebase from "firebase";
import { connect } from 'react-redux';

class Fire {

    roomCode = ''

    constructor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCLL8UBSqNod7V9SdJlKQa35zsLRW9JRHQ",
                authDomain: "dragonfire-880ff.firebaseapp.com",
                projectId: "dragonfire-880ff",
                databaseURL: "https://dragonfire-880ff-default-rtdb.firebaseio.com/",
                storageBucket: "dragonfire-880ff.appspot.com",
                messagingSenderId: "564052172190",
                appId: "1:564052172190:web:8a573d6a6d8d41b33b8a8f",
                measurementId: "G-62GNCZRLM2"
            });

        } else {
            firebase.app();
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message)
        });
    };

    // How to send a message to certain group

    parse = message => {
        const { user, text, timestamp } = message.val()
        const { key: _id } = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    setRoomCode = code =>
        roomCode = code;

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref(roomCode.toLowerCase());
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

}

export default new Fire();
