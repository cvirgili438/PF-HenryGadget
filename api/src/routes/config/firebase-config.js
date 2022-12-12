var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;