// SendGrid
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');

// Para enviar el correo al cliente.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Para consigurar datos en la API de SendGrid.
sgClient.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = { sgMail, sgClient }