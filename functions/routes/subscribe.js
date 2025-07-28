const express = require("express");
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

router.get("/", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send(`
      <h2>Errore</h2>
      <p>Token mancante. Il link di iscrizione potrebbe essere non valido.</p>
    `);
  }

  try {
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

    await snapshot.docs[0].ref.update({ subscribed: true });

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

module.exports = router;
