const express = require('express');
const router = express.Router();

const { sgMail } = require('../config/sendgrid-config.js');

const {
    EMAIL_FROM_NEWSLETTER,
    SUBJECT_SENDMAIL
} = require('./constants/dataToSendMail.js');

router.post('/sendmail', async (req, res) => {
    const { to, subject, text } = req.body;
    if (!to)
        return res.status(400).json({ err: 'To parameter missing.' });
    if (!subject)
        return res.status(400).json({ err: 'Subject parameter missing.' });
    if (!text)
        return res.status(400).json({ err: 'Text parameter missing.' });

    try {
        const msg = {
            to: to,
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