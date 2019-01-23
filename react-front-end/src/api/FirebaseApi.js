import firebase from "../api/FirebaseConfig"; //this is mandatory, must come from the setup

class FirebaseApi {
  static getFunction(methodName) {
    return firebase.functions().httpsCallable(methodName);
  }

  static getValues(path) {
    return firebase
      .database()
      .ref(path)
      .once("value");
  }

  static getValueByKey(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once("child_added");
  }

  static getValueByQuery(path, key) {
    console.log('HERE FIREBASE API');

   return firebase
      .database()
      .ref(path)
    //  .orderByChild("segmentedContentArray")
      //.orderByChild("mediaLenguaContent")
      .orderByKey()
      .startAt(key)
      .endAt(key+"\uf8ff")
      .once("value", function(snapshot) {
        console.log(snapshot.val());
        //console.log(snapshot.key());
      });

  }

  static setValue(path, value) {
    return firebase
      .database()
      .ref(path)
      .set(value);
  }
  static getUrlHttp(fileName) {
    return firebase
      .storage()
      .ref("soundFiles/" + fileName + ".mp3")
      .getDownloadURL();
  }


}
export default FirebaseApi;
