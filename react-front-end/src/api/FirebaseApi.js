import * as firebase from 'firebase';
import { FirebaseConfig } from './FirebaseConfig';
import { Ref } from 'semantic-ui-react';

class FirebaseApi {
    static getValueByKey(path, key) {
        return firebase
            .database()
            .ref(path)
            .orderByKey()
            .equalTo(key)
            .once('child_added');
    }
}
export default FirebaseApi;