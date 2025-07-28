const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { getFirestore } = require("firebase-admin/firestore");
const { sendMail } = require("../services/mail");
const crypto = require("crypto");

const db = getFirestore();

exports.sendMailToSubscribersForNews = onDocumentCreated(
    { region: "europe-west1", document: "news/{newsId}" },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) {
            console.log("No data associated with the event");
            return;
        }

        const newsData = snapshot.data();
        const newsId = event.params.newsId;
        const newsletterLink = `https://www.knotpoet.com/news/${newsId}`;

        try {
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

                if (!newsData[lang]) {
                    console.warn("Dati newsletter incompleti per:", lang, newsId);
                    return;
                }

                const unsubscribeToken = crypto.randomUUID();
                const title = newsData[lang].title;

                await doc.ref.update({ unsubscribeToken });

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
                    await sendMail({ to: email, subject: t.subject, html: htmlBody });

                    await db.collection("newsletter_logs").add({
                        email,
                        newsletterId: newsId,
                        status: "sent",
                        sentAt: new Date().toISOString(),
                    });
                } catch (error) {
                    console.error(`Errore invio a ${email}:`, error);
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
            console.error("Errore generale invio newsletter:", error);
        }
    }
);
