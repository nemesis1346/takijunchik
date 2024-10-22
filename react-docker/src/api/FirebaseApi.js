import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getDatabase, ref, get, set, query, orderByChild, equalTo } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { removeDuplicates2 } from '../utils/Utils';
import FirebaseConfig from './FirebaseConfig'; // Import your Firebase configuration

// Initialize Firebase
const app = initializeApp(FirebaseConfig);

// Global instances
const db = getDatabase(app);
const storage = getStorage(app);
const functions = getFunctions(app);

class FirebaseApi {
  static getFunction(methodName) {
    return httpsCallable(functions, methodName);
  }

  static async getValues(path) {
    const dbRef = ref(db, path);
    const snapshot = await get(dbRef);
    return snapshot.val();
  }

  static async getValueByKey(path, key) {
    const dbRef = ref(db, path);
    const q = query(dbRef, orderByChild('key'), equalTo(key));
    const snapshot = await get(q);
    return snapshot.val();
  }

  static async getValueByQuery(path, key) {
    const dbRef = ref(db, path);
    let resultList = [];

    const fields = ['mediaLenguaContent', 'spanishContent', 'kichwaContent', 'elicitSentenceContent', 'ipaContent'];

    for (const field of fields) {
      const q = query(dbRef, orderByChild(field));
      const snapshot = await get(q);
      const responseList = snapshot.val();
      
      if (responseList) {
        for (const id in responseList) {
          if (responseList[id][field] && responseList[id][field].includes(key)) {
            resultList.push(responseList[id]);
          }
        }
      }
    }

    let filteredResult = removeDuplicates2(resultList, 'objectId');
    console.log('FILTERED LIST', filteredResult);
    return filteredResult;
  }

  static async setValue(path, value) {
    const dbRef = ref(db, path);
    await set(dbRef, value);
  }

  static async getUrlHttp(fileName) {
    const fileRef = storageRef(storage, `soundFiles/${fileName}.mp3`);
    return await getDownloadURL(fileRef);
  }
}

export default FirebaseApi;