const { sgMail, sgClient } = require('../../config/sendgrid-config.js');

async function addEmail(email, confirmNumber) {
    const customFieldID = await getCustomFieldID(sgClient, 'confirmNumber');
    const data = {
        "contacts": [{
            "email": email,
            "custom_fields": {}
        }]
    };
    data.contacts[0].custom_fields[customFieldID] = confirmNumber;

    const request = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
    }

    return sgClient.request(request);
}
// Para obtener el Id del campo personalizado que hemos creado
// para verificación de código.
async function getCustomFieldID(sgClient, customFieldName) {
    const request = {
        url: `/v3/marketing/field_definitions`,
        method: 'GET',
    }
    const response = await sgClient.request(request);
    return response[1].custom_fields.find(x => x.name === customFieldName).id;
};

module.exports = { addEmail };