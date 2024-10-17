import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'
import 'firebase/functions';

//Just firebase
//TODO: find a wway to add configuration without security breaches.

firebase.initializeApp(FirebaseConfig);

export default firebase;