const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp, firestore} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {onRequest} = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");
 const express = require("express");
require("dotenv").config();

initializeApp();
const db = getFirestore();
const unsubscribeApp = express();
const subscribeApp = express();
const timestampApp = express();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//Send mail to all subscribers for new newsletter
exports.sendMailToSubscribersForNews = onDocumentCreated({region: "europe-west1", document: "news/{newsId}"}, async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }
  const newsData = snapshot.data();
  const newsId = event.params.newsId;

  const newsletterLink = `https://www.knotpoet.com/news/${newsId}`;

  try {
    // 🔍 Prendi tutti gli iscritti attivi
    const subscribersSnapshot = await db
      .collection("subscribers")
      .where("subscribed", "==", true)
      .get();

    if (subscribersSnapshot.empty) {
      console.log("Nessun iscritto trovato.");
      return;
    }

    const sendPromises = subscribersSnapshot.docs.map(async (doc) => {
      const subscriber = doc.data();
      const email = subscriber.email;
      const name = subscriber.name || "lettore";
      const lang = subscriber.lang || "it-IT";
      const unsubscribeToken = crypto.randomUUID();
      const title = newsData[lang].title;

      if (!newsData[lang]) {
        console.warn("Dati newsletter incompleti:", newsId);
        return;
      }

      // Salva unsubscribeToken per futuro uso
      await doc.ref.update({unsubscribeToken});

      const unsubscribeLink = `https://www.knotpoet.com/api/unsubscribe?token=${unsubscribeToken}`;

      const content = {
        "it-IT": {
          subject: `Nuova newsletter: ${title}`,
          greeting: `Ciao ${name} 👋`,
          intro: `Grazie per seguire la newsletter di <strong>Knot Poet</strong>!`,
          newsletter: `📬 Ecco la nostra ultima novità:`,
          read: `👉 <a href="${newsletterLink}" style="color: #007BFF;">Leggi la newsletter completa</a>`,
          unsubscribe: `Se non vuoi più ricevere le nostre email, puoi <a href="${unsubscribeLink}">disiscriverti qui</a>.`
        },
        "en-EN": {
          subject: `New newsletter: ${title}`,
          greeting: `Hi ${name} 👋`,
          intro: `Thanks for following the <strong>Knot Poet</strong> newsletter!`,
          newsletter: `📬 Here's our latest update:`,
          read: `👉 <a href="${newsletterLink}" style="color: #007BFF;">Read the full newsletter</a>`,
          unsubscribe: `If you no longer wish to receive our emails, you can <a href="${unsubscribeLink}">unsubscribe here</a>.`
        }
      };

      const t = content[lang];

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>${t.greeting}</h2>
          <p>${t.intro}</p>
          <p>${t.newsletter}</p>
          <h3>${title}</h3>
          <p>${t.read}</p>
          <hr>
          <p style="font-size: 0.9em; color: #666;">${t.unsubscribe}</p>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"Knot Poet - Official Website" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: t.subject,
          html: htmlBody,
        });

        await db.collection("newsletter_logs").add({
          email,
          newsletterId: newsId,
          status: "sent",
          sentAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`❌ Errore invio email a ${email}:`, error);

        await db.collection("newsletter_logs").add({
          email,
          newsletterId: newsId,
          status: "error",
          error: error.message,
          sentAt: new Date().toISOString(),
        });
      }
    });

    await Promise.all(sendPromises);
  } catch (error) {
    console.error("Errore generale nell'invio newsletter:", error);
  }
});

//Send mail to new subscriber
subscribeApp.get("/", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send(`
      <h2>Errore</h2>
      <p>Token mancante. Il link di iscrizione potrebbe essere non valido.</p>
    `);
  }

  try {
    // 🔍 Cerca il documento con quel token
    const snapshot = await db.collection("subscribers")
      .where("subscribeToken", "==", token)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).send(`
        <h2>Non trovato</h2>
        <p>Il token fornito non è valido o è già stato usato.</p>
      `);
    }

    // Attiva iscrizione
    await snapshot.docs[0].ref.update({subscribed: true});

    return res.status(200).send(`
      <h2>Iscrizione completata ✅</h2>
      <p>Benvenuto! Hai attivato con successo la ricezione delle newsletter di Knot Poet.</p>
    `);
  } catch (error) {
    console.error("Errore durante l'iscrizione:", error);
    return res.status(500).send(`
      <h2>Errore interno</h2>
      <p>Qualcosa è andato storto. Riprova più tardi.</p>
    `);
  }
});

// Endpoint HTTPS Firebase
exports.sendMailToNewSubscriber = onRequest(
  {region: "europe-west1", cors: true},
  subscribeApp
);

//Unsubscribe
unsubscribeApp.get("/", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send(`
      <h2>Errore</h2>
      <p>Token mancante. Il link di disiscrizione potrebbe essere non valido.</p>
    `);
  }

  try {
    // 🔍 Cerca il documento con quel token
    const snapshot = await db.collection("subscribers")
      .where("unsubscribeToken", "==", token)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).send(`
        <h2>Non trovato</h2>
        <p>Il token fornito non è valido o è già stato usato.</p>
      `);
    }

    // Disattiva iscrizione
    await snapshot.docs[0].ref.update({subscribed: false});

    return res.status(200).send(`
      <h2>Disiscrizione completata ✅</h2>
      <p>Ci dispiace vederti andare. Hai disattivato con successo la ricezione delle newsletter di Knot Poet.</p>
    `);
  } catch (error) {
    console.error("Errore durante la disiscrizione:", error);
    return res.status(500).send(`
      <h2>Errore interno</h2>
      <p>Qualcosa è andato storto. Riprova più tardi.</p>
    `);
  }
});

// Endpoint HTTPS Firebase
exports.unsubscribe = onRequest(
  {region: "europe-west1", cors: true},
  unsubscribeApp
);

//Timestamp
timestampApp.get("/", async (req, res) => {
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

// Endpoint HTTPS Firebase
exports.timestamp = onRequest(
  {region: "europe-west1", cors: true},
  timestampApp
);
