const express = require('express');
const router = express.Router();

const { sgMail, sgClient } = require('../config/sendgrid-config.js');

const { addEmail,
    getContactByEmail,
    getListID,
    addContactToList } = require('./controlers/controllersNewsletter.js');

// router.use(express.urlencoded({extended: true}));
// router.use(express.json());

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ err: 'Email parameter missing.' });

    // Número que solo servirá de verificación.
    const confirmNumber = Math.ceil(Math.random() * 1000000000000);
    // Parámetros para la URL de confirmación.
    const params = new URLSearchParams({ confirmNumber, email });
    // Página del Front.
    const confirmationURL = req.headers.origin + '/NewsletterConfirm?' + params;
    // Datos para el mail que enviará la API SendGrid.
    const msg = {
        to: email,
        from: 'proyectofinalhenrygadget@gmail.com',
        subject: `HenryGadget: Confirm your subscription to our newsletter`,
        html: `Hello subscripter, Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}"> clicking here</a>.`
    }

    try {
        // Se agrega correo a la lista global de contactos en SendGril
        // (temporal hasta que confirme código).
        await addEmail(email, confirmNumber);
        // Se envía datos a SendGrid para que envíe el correo al destino.
        await sgMail.send(msg);
        res.json({ msg: `${email}, added successfully.` });
    }
    catch (error) {
        res.status(400).json({ err: 'Something went wrong whit the subscription to our newsletter.' });
    }
});

router.post('/confirm', async (req, res) => {
    const { email, confirmNumber } = req.body;
    if (!email)
        return res.status(400).json({ err: 'Email parameter missing.' });
    if (!confirmNumber)
        return res.status(400).json({ err: 'ConfirmNumber parameter missing.' });

    try {
        const contact = await getContactByEmail(email);
        if (contact === null)
            return res.status(400).json({ err: 'Contact not found.' });

        if (contact.custom_fields.ConfirmNumber === req.query.confirmNumber) {
            const listID = await getListID('NewsLetter-HenryGadget');
            await addContactToList(email, listID);
        }
        else {
            res.status(400).json({ err: 'Confirmation number does not match' });
        }

        const msg = {
            to: email,
            from: 'proyectofinalhenrygadget@gmail.com',
            subject: `HenryGadget: Subscription succeed.`,
            html: `Thank you for subscribing to our newsletter.`
        }
        await sgMail.send(msg);

        res.json({ msg: 'Added successfully.' });
    }
    catch (error) {
        console.error(error.mesaage);
        res.json({ err: 'An error has occurred.' });
    }
});

router.post('/unsubscribe', (req, res) => {
    res.json('unsubscribe');
});

module.exports = router;