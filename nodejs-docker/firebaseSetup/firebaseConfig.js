const firebase = require("firebase-admin");

//TODO: change this to .env configurations
// const serviceAccount = require("./media-lengua-firebase-adminsdk-y63jq-05ba265775.json");

const config = ({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://media-lengua.firebaseio.com",
    storageBucket: "gs://media-lengua.appspot.com"
});

firebase.initializeApp(config);
module.exports= firebase;