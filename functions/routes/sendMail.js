const express = require("express");
const router = express.Router();
const { sendMail } = require("../services/mail");

router.use(express.json());

router.post("/", async (req, res) => {
  const { to, subject, html, from } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: "to, subject e html sono obbligatori" });
  }

  try {
    await sendMail({ to, subject, html, from });
    res.status(200).send("✅ Email inviata con successo.");
  } catch (error) {
    res.status(500).send(`❌ Errore: ${error.message}`);
  }
});

module.exports = router;
