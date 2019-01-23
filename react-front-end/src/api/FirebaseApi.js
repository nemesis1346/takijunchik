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

  //TODO: In the future this method could be used
  static getValueByQuery(path, key, callback) {
    let reference = firebase.database().ref(path);
      reference.orderByChild("mediaLenguaContent").on("child_added", function(snapshot) {
        let currentObject = snapshot.val();
        if (currentObject.mediaLenguaContent.includes(key)) {
          console.log(currentObject.mediaLenguaContent);
          callback(currentObject);
        }
      });
    return;
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
