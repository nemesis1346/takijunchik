const firebase = require("firebase-admin");

const serviceAccount = require("./media-lengua-firebase-adminsdk-y63jq-05ba265775.json.js.js");

const config = ({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://media-lengua.firebaseio.com",
    storageBucket: "gs://media-lengua.appspot.com"
});

firebase.initializeApp(config);
module.exports= firebase;