const express = require("express");
const router = express.Router();
const { firestore } = require("firebase-admin");

router.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const timestamp = firestore.Timestamp.now();

  res.status(200).json({
    timestamp: timestamp.toDate().toISOString(),
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds
  });
});

module.exports = router;
