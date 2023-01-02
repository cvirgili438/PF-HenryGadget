const express = require('express');
const router = express.Router();

const { Newsletter } = require('../../db.js');

const { sgMail } = require('../config/sendgrid-config.js');

const {
    EMAIL_FROM_NEWSLETTER,
    PERSONALIZATION_ID,
    SUBJECT_SUBSCRIBE,
    SUBJECT_CONFIRM,
    SUBJECT_UNSUBSCRIBE,
    SUBJECT_SENDMAIL,
    htmlSubscribe,
    HTML_UNSUBSCRIBE,
    HTML_CONFIRM
} = require('./constants/dataToSendMail.js');
const generatePersonalizations = require('./controllers/generatePersonalizations.js');

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ err: 'Email parameter missing.' });

    // Número que solo servirá de verificación.
    const code = Math.ceil(Math.random() * 1000000000000);
    // Parámetros para la URL de confirmación.
    const params = new URLSearchParams({ code, email });
    // Página del Front.
    const confirmationURL = req.headers.origin + '/NewsletterConfirm?' + params;
    // Datos para el mail que enviará la API SendGrid.
    const msg = {
        to: email,
        from: EMAIL_FROM_NEWSLETTER,
        subject: SUBJECT_SUBSCRIBE,
        html: htmlSubscribe(confirmationURL)
    }

    try {
        // Se agrega correo a la tabla newsletter
        await Newsletter.create({ email, code });
        // Se envía datos a SendGrid para que envíe el correo al destino.
        await sgMail.send(msg);
        res.json({ msg: `${email}, added successfully.` });
    }
    catch (error) {
        res.status(400).json({ err: 'Something went wrong whit the subscription to our newsletter.' });
    }
});

router.post('/confirm', async (req, res) => {
    const { email, code } = req.body;
    if (!email)
        return res.status(400).json({ err: 'Email parameter missing.' });
    if (!code)
        return res.status(400).json({ err: 'ConfirmNumber parameter missing.' });

    // Data para enviar mail SendGrid.
    const msg = {
        to: email,
        from: EMAIL_FROM_NEWSLETTER,
        subject: SUBJECT_CONFIRM,
        html: HTML_CONFIRM
    };

    try {
        const contact = await Newsletter.findOne({ where: { email } });
        if (!contact)
            return res.status(400).json({ err: 'Contact not found.' });

        if (contact.confirm)
            return res.status(400).json({ err: 'Contact already subscribed.' });

        // Se verifica que el código sea el mismo.
        if (contact.code === code) {
            await sgMail.send(msg); // Se envia mail.
            await Newsletter.update({ confirm: true }, { where: { email } });
            res.json({ msg: 'Added successfully.' });
        }
        else {
            return res.status(400).json({ err: 'Confirmation number does not match' });
        }
    }
    catch (error) {
        console.error(error.mesaage);
        res.json({ err: 'An error has occurred.' });
    }
});

router.post('/unsubscribe', async (req, res) => {
    const { email, code } = req.body;
    if (!email)
        return res.status(400).json({ err: 'Email parameter missing.' });
    if (!code)
        return res.status(400).json({ err: 'ConfirmNumber parameter missing.' });

    // Data para enviar mail SendGrid.
    const msg = {
        to: email,
        from: EMAIL_FROM_NEWSLETTER,
        subject: SUBJECT_UNSUBSCRIBE,
        html: HTML_UNSUBSCRIBE
    };

    try {
        const contact = await Newsletter.findOne({ where: { email } });
        if (!contact)
            return res.status(400).json({ err: 'Contact not found.' });

        // Se verifica que el código sea el mismo.
        if (contact.code === code) {
            await sgMail.send(msg); // Se envia mail.
            await contact.destroy();
            res.json({ msg: 'You have been successfully unsubscribed.' });
        }
        else
            return res.status(400).json({ err: 'Confirmation number does not match or contact is not subscribed' });
    }
    catch (error) {
        console.error(error)
        res.json({ err: 'An error has occurred.' });
    }
});

router.post('/sendmail', async (req, res) => {
    const { text, subject } = req.body;
    if (!text)
        return res.status(400).json({ err: 'Text parameter missing.' });
    if (!subject)
        return res.status(400).json({ err: 'Subject parameter missing.' });

    try {
        let contacs = await Newsletter.findAll(
            { where: { confirm: true }, attributes: ['email', 'code'] }
        );
        // Formato para enviar los mails.
        let personalizations = generatePersonalizations(contacs, req.headers.origin, text, SUBJECT_SENDMAIL + subject);

        const msg = {
            personalizations,
            template_id: PERSONALIZATION_ID,
            from: EMAIL_FROM_NEWSLETTER
        };

        await sgMail.send(msg); // Se envía el mail.

        res.json({ msg: 'Email send.' });
    }
    catch (error) {
        res.status(400).json({ err: 'Error to send mail.', error });
    }
});

module.exports = router;