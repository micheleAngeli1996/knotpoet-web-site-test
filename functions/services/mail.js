const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Invia una mail generica
 * @param {Object} options
 * @param {string} options.to - Email destinatario
 * @param {string} options.subject - Oggetto della mail
 * @param {string} options.html - Contenuto HTML della mail
 * @param {string} [options.from] - Email mittente (opzionale)
 */
async function sendMail({ to, subject, html, from }) {
  try {
    await transporter.sendMail({
      from: from || `"Knot Poet - Official Website" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email inviata a ${to}`);
  } catch (error) {
    console.error(`❌ Errore invio email a ${to}:`, error);
    throw error;
  }
}

module.exports = { sendMail };
