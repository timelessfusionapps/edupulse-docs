const admin = require("firebase-admin");
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
admin.initializeApp({ projectId: "edupulse-dev" });
admin.auth().listUsers().then((list) => {
  console.log("Users:", list.users.map(u => u.email));
}).catch(console.error);
