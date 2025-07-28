const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");

// Routers
const sendMailRouter = require("./routes/sendMail");
const subscribeRouter = require("./routes/subscribe");
const unsubscribeRouter = require("./routes/unsubscribe");
const timestampRouter = require("./routes/timestamp");

// Triggers
const { sendMailToSubscribersForNews } = require("./triggers/newsNotification");

initializeApp();

// HTTP Endpoints
exports.sendMail = onRequest({ region: "europe-west1", cors: true }, sendMailRouter);
exports.sendMailToNewSubscriber = onRequest({ region: "europe-west1", cors: true }, subscribeRouter);
exports.unsubscribe = onRequest({ region: "europe-west1", cors: true }, unsubscribeRouter);
exports.timestamp = onRequest({ region: "europe-west1", cors: true }, timestampRouter);

// Firestore Trigger
exports.sendMailToSubscribersForNews = sendMailToSubscribersForNews;
