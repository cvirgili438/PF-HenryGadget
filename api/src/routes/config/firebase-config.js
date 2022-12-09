var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;