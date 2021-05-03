import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBz6cJvKcgAleAv5as9iPuQmAwvZPM2x1Y',
	authDomain: 'react-pharmacy-crud.firebaseapp.com',
	projectId: 'react-pharmacy-crud',
	storageBucket: 'react-pharmacy-crud.appspot.com',
	messagingSenderId: '833356088860',
	appId: '1:833356088860:web:44cec580462a96cd9081d9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
