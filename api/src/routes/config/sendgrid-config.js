// SendGrid
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');

// Para enviar el correo al cliente.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Para consigurar datos en la API de SendGrid.
sgClient.setApiKey(process.env.SENDGRID_API_KEY);
// Para formato base de los newsletters.
const perzonalitationId = process.env.SENDGRID_PERSONALIZATION_ID;

module.exports = { sgMail, sgClient, perzonalitationId }