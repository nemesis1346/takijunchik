import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'
//Firestore
 export const FirestoreConfig ={
    "type": "service_account",
    "project_id": "media-lengua",
    "private_key_id": "05ba265775ce08584cb4eae6204d9adbea08e7f8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwbpJkaTiVKDwU\nDHPkTu+IGPX8c1oOChmkhUAmzD7+/plN3tNMTQvpOnmDbb4b2EeEJdf9XYjAx1rc\nreqevYnqy6cMGrIn1f3LoLao876iuEc1Yarl+JxtFGi48SRQmeWSV0rFJybyABbN\nPWG5ocgG0mHZo0RvCW+FHhmSajS0/CsfvJJKmI2RR6RbkeBbim0Gd/r26k0KOe6C\n9j4Kjqryg62T/xuytxHU81F0CTRvwvlAuxNbxGwVsm0jOdmH6rMWZ3wvbPw0ZcAk\ngcRSCkwUhhvdiYKA2gRzufDQJO8vuyAckXnrWVV/CE3+7I6rhP152A8C0rQdi2H/\n7q3/gw81AgMBAAECggEAIerv27vas9oLSrNmKDMAm4Jo78JhQqewbE9tmMfVKIJb\niHvY1SdOreSe7aRQUtwOS5pW3o93tc/daOVKYIABnpDOKWaMb1oVM2tPEkXhlTil\n/94p05IqyFGPHFbHa3NajfqYFjTDqOxZddViDyTJ5n3Vb9iSVGJU/RtfQSWHwm8S\nSJDr1E46Hi2LbyMkrTca4jbK3JgrMKxFRtS6iOpyZNJFj2cpYP3gGiDTvCOEugqP\nOAtKP2fM25k5i9qNEJEc6bB3DullcT7psepcVaTfMd1WacoEeqQA2Y4TILT83Bs8\nuLj+LDxrHx+LhNNiJrNa/W1R0BMhYeJ5gWjO7zciQQKBgQDUo1Tk/5ZxI9nKG1/9\nSTrwxvtq01Iyar0ziaOqh7nyk1ej5WYXcM23GmQCZru6xtuGmiT3Fpu3tz+PnB1z\nwjC6t39zJqjIdUNleXVRnEECRj5yxxSxVrIKRUn+33qb/f9f/CsXeuuK+60SpmZr\ns8yXMaI8ZjGj29w35vwVKCOZ8QKBgQDUaR43Jz7bQYbFiCIKuiFRgrA2bCcnlvwH\nxyeYDKfUPnxFJGnR4iSAVtsFO8RnzupOvBLX4eEIqifnxFnDR0HF7Cgq25uy84el\nXVO46ZNNxfqa3J6Wbd6tKSfmbHJgA4Fq/Y778fNxUlqB8nFkK3um3EoTcSXCEYfr\nnmBqJchlhQKBgET50pESI7ABzCUWajXUam0ubuIBOLmoDEXKkS/BJV191EETKeHS\nsriBtA1fW+hDl3R7TiBk0hBvPgwMvTUOuhXnbk1hLgEQoNMq6haWFDRzqtA6qgi4\nsbpJLa6iubgeVZfCSgws0HleGI9jMPgg8+3bqN/k2pdnu3Da2czXH21RAoGAZ72P\nTFCWmm8+a2s5dRPDAhRaC7p2xRcwsHvMEq7bqQV7nClUpXVVbnj9L2kpW6nrNdkV\nOurPBXRVWRTE4mMC9K+KTqRDPvtB3LngEgfCMdHnu4rUyZOPlfLr0dZVZh9QLfj4\nxIQ+6bHXEnBegRXbpnsgkq5ISqhVQfZwEGezoCECgYEAxAIfJXYm55TdyWThZJXR\n2c9FcLtvCIY+JZ8sColPhU1HdJ5S9Br8Urdm9vsoF5+IosCqQR/VRyqB2+zvevwG\nLWgAgY+YaIHw0LERUBzpGPVBD0zVJ35ljUEi+fVzRz7wfqfGo1Goz67d8CZNysAo\nfdwP0Jq2ylns1mHwb0zWCq0=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-y63jq@media-lengua.iam.gserviceaccount.com",
    "client_id": "117693562181536721763",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y63jq%40media-lengua.iam.gserviceaccount.com"
  }

  //Just firebase
  export const FirebaseConfig = {
    apiKey: "AIzaSyD5PNSGg7cBTpuCrZuqmieh6xqOT-iEDOw",
    authDomain: "media-lengua.firebaseapp.com",
    databaseURL: "https://media-lengua.firebaseio.com",
    projectId: "media-lengua",
    storageBucket: "media-lengua.appspot.com",
    messagingSenderId: "952281713521"
  };

  firebase.initializeApp(FirebaseConfig);
  //firebase.firestore().settings({timestampsInSnapshots:true});
  
  export default firebase;