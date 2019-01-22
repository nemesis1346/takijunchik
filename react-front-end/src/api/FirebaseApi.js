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
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once("child_added");
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
