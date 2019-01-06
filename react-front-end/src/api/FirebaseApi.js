import firebase from '../api/FirebaseConfig' //this is mandatory, must come from the setup

class FirebaseApi {
    static getValueByKey(path, key) {
        return firebase
            .database()
            .ref(path)
            .orderByKey()
            .equalTo(key)
            .once('child_added');
    }

    static setValue(path, value) {
        return firebase
          .database()
          .ref(path)
          .set(value);
      }
}
export default FirebaseApi;