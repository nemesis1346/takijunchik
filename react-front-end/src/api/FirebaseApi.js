import firebase from "../api/FirebaseConfig"; //this is mandatory, must come from the setup
import {removeDuplicates2} from '../utils/Utils';
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

  static async getValueByQuery(path, key, callback) {
    let reference = firebase.database().ref(path);
    let resultList = [];
    //We do this for mediaLengua Content
    let snapshotMediaLengua = await reference.orderByChild("mediaLenguaContent").once('value');
    let responseListMediaLengua = snapshotMediaLengua.val();
    for (var i in responseListMediaLengua) {
      if (responseListMediaLengua[i].mediaLenguaContent.includes(key)) {
        resultList.push(responseListMediaLengua[i]);
      }
    }
    //we do this for spanish
    const snapshotSpanish = await reference.orderByChild('spanishContent').once('value');
    let responseListSpanish = snapshotSpanish.val();
    for (var i in responseListSpanish) {
      if (responseListSpanish[i].spanishContent.includes(key)) {
        resultList.push(responseListSpanish[i]);
      }
    }
    //we do this for kichwa content
    const snapshotKichwa = await reference.orderByChild('kichwaContent').once('value');
    let responseListKichwa = snapshotKichwa.val();
    for (var i in responseListKichwa) {
      if (responseListKichwa[i].kichwaContent.includes(key)) {
        resultList.push(responseListKichwa[i]);
      }
    }
    //we do this for elicit sentences
    const snapshotElicitSentence = await reference.orderByChild('elicitSentenceContent').once('value');
    let responseListElicitSentence = snapshotElicitSentence.val();
    for (var i in responseListElicitSentence) {
      if (
        responseListElicitSentence[i].elicitSentenceContent.includes(key)
      ) {
        resultList.push(responseListElicitSentence[i]);
      }
    }
    //We do this for ipa
    const snapshotIpa = await reference.orderByChild('ipaContent').once('value');
    let responseListIpa = snapshotIpa.val();
    for (var i in responseListIpa) {
      if (responseListIpa[i].ipaContent.includes(key)) {
        resultList.push(responseListIpa[i]);
      }
    }
    let filteredResult = removeDuplicates2(resultList, 'objectId');
    console.log('FILTERED LIST');
    console.log(filteredResult);
    return filteredResult;
  }
  //TODO: Must work with on child added because filtering is gonna be costly on real time
  // firebase.database().ref(path).on("child_added", function(snapshot) {
  //   let currentObject = snapshot.val();
  //  // console.log('DATA SNAPSHOT');
  //   //console.log(snapshot.numChildren.length);
  //   if (currentObject.mediaLenguaContent.includes(key)) {
  //     console.log(currentObject.mediaLenguaContent);
  //     //callback(currentObject);
  //   }
  // });

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
