const express = require('express');
const router = express.Router();

const authWithoutAdm = require('../middleware/authWithoutAdm.js');
const admin = require('../config/firebase-config.js');

const { sgMail } = require('../config/sendgrid-config.js');

const {
    EMAIL_FROM_NEWSLETTER,
    SUBJECT_SENDMAIL
} = require('./constants/dataToSendMail.js');

router.use(authWithoutAdm);

router.post('/sendmail', async (req, res) => {
    const { uid, subject, text } = req.body;
    if (!uid)
        return res.status(400).json({ err: 'Uid parameter missing.' });
    if (!subject)
        return res.status(400).json({ err: 'Subject parameter missing.' });
    if (!text)
        return res.status(400).json({ err: 'Text parameter missing.' });

    try {
        // Se busca email desde Firebase.
        const userData = await admin.auth().getUser(uid);
        const email = userData.toJSON().email;
        const msg = {
            to: email,
            subject: SUBJECT_SENDMAIL + subject,
            from: EMAIL_FROM_NEWSLETTER,
            html: text
        };
        await sgMail.send(msg); // Se envía el mail.

        res.json({ msg: 'Email send.' });
    }
    catch (error) {
        res.status(400).json({ err: 'Error to send mail.', error });
    }
});

module.exports = router;