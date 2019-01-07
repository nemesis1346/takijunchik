import firebase from '../api/FirebaseConfig' //this is mandatory, must come from the setup

class FirebaseApi {

    static getValues(path) {
        return firebase
            .database()
            .ref(path)
            .once('value')

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

    static saveFile(path, name, file) {
        // let file =new File('/home/nemesis1346/Documents/UniversityProjects/takijunchik/react-front-end/data/audioFiles/audio.mp3');
        var blob = new Blob(['/home/nemesis1346/Documents/UniversityProjects/takijunchik/react-front-end/data/audioFiles/audio.mp3'], { type: 'audio/mp3' });

        let nameFile = name;//?
        let metadata = {
            contentType: 'audio/mp3'
        }
        return firebase
            .storage()
            .ref(path + '/' + name)
            .put(blob, metadata)
    }
}
export default FirebaseApi;