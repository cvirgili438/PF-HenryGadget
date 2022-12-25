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
    deleteContactFromList } = require('./controlers/controllersNewsletter.js');

router.post('/', async (req, res) => { // POST /newsletter/sendmail
});

module.exports = router;