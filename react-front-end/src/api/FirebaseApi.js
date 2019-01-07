import firebase from '../api/FirebaseConfig' //this is mandatory, must come from the setup

class FirebaseApi {

    static getValues(path){
        return firebase
        .database()
        .ref(path)
        .once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              console.log(childKey);
              console.log(childData);
            });
          });
    }

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