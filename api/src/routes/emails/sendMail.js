const express = require('express');
const router = express.Router();

const { sgMail, sgClient } = require('../config/sendgrid-config.js');

const {
    EMAIL_FROM_NEWSLETTER,
    NAME_NEWSLETTER,
    SUBJECT_SUBSCRIBE,
    SUBJECT_CONFIRM,
    SUBJECT_UNSUBSCRIBE,
    htmlSubscribe,
    HTML_CONFIRM,
    HTML_UNSUBSCRIBE
} = require('./constants/dataToSendMail.js');

const { addEmail,
    getContactByEmail,
    getListID,
    addContactToList,
    deleteContactFromList,
    getContactsFromList } = require('./controlers/controllersNewsletter.js');

router.post('/', async (req, res) => { // POST /newsletter/sendmail
    const { html, subject } = req.body;
    if (!html)
        return res.status(400).json({ err: 'Html parameter missing.' });
    if (!subject)
        return res.status(400).json({ err: 'Subject parameter missing.' });

    try {
        const listId = await getListID(NAME_NEWSLETTER);
        const listConstacs = await getContactsFromList(listId);
 
        const msg = {
            personalizations: listConstacs,
            from: EMAIL_FROM_NEWSLETTER,
            subject: subject,
            html: html
        }
        await sgMail.send(msg);

        res.json({ msg: 'Email send.' });
    }
    catch (error) {
        res.status(400).json({ err: 'Error to send mail.', error });
    }

});

module.exports = router;