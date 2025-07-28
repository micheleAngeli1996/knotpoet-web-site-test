const express = require("express");
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

router.get("/", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send(`
      <h2>Errore</h2>
      <p>Token mancante. Il link di disiscrizione potrebbe essere non valido.</p>
    `);
  }

  try {
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

    await snapshot.docs[0].ref.update({ subscribed: false });

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

module.exports = router;
