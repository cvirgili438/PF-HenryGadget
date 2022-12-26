const express = require('express');
const router = express.Router();

const { Newsletter } = require('../../db.js');

const { sgMail } = require('../config/sendgrid-config.js');

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

    const msg = {
        to: email,
        from: EMAIL_FROM_NEWSLETTER,
        subject: SUBJECT_CONFIRM,
        html: HTML_CONFIRM
    }

    try {
        const contact = await Newsletter.findOne({ where: { email } });
        if (!contact)
            return res.status(400).json({ err: 'Contact not found.' });

        if (contact.confirm)
            return res.status(400).json({ err: 'Contact already subscribed.' });

        if (contact.code === code) {
            await sgMail.send(msg);
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

    const msg = {
        to: email,
        from: EMAIL_FROM_NEWSLETTER,
        subject: SUBJECT_UNSUBSCRIBE,
        html: HTML_UNSUBSCRIBE
    }

    try {
        const contact = await Newsletter.findOne({ where: { email } });
        if (!contact)
            return res.status(400).json({ err: 'Contact not found.' });

        if (contact.code === code) {
            await sgMail.send(msg);
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
        let personalizations = [
            {
                to: [
                    {
                        email: "ferb@e.email"
                    }
                ],
                dynamic_template_data: {
                    textBody: text,
                    unsubscribeLink: "ttp://localhost:3001"
                }
            },
            {
                to: [
                    {
                        email: "ferb@autistici.org"
                    }
                ],
                dynamic_template_data: {
                    textBody: text,
                    unsubscribeLink: "http://localhost:3000"
                }
            }
        ];

        const msg = {
            personalizations,
            template_id: "d-6f40d484fddb4b98966a70d03ea3a122",
            from: { email: EMAIL_FROM_NEWSLETTER },
            subject: subject
        }

        await sgMail.send(msg);

        res.json({ msg: 'Email send.' });
    }
    catch (error) {
        res.status(400).json({ err: 'Error to send mail.', error });
    }
});

module.exports = router;