'use-strict'

var admin = require("firebase-admin");

var serviceAccount = require("../credentials/media-lengua-firebase-adminsdk-y63jq-05ba265775.json");

var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://media-lengua.firebaseio.com"
});

var database = defaultApp.database();

database.ref('users/' + "users").set({
    username: "test",
    email: "test",
    profile_picture : "test"
  });