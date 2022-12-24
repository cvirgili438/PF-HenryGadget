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

async function getContactByEmail(email) {
    const request = {
        url: `/v3/marketing/contacts/search/emails`,
        method: 'POST',
        body: { "emails": [email] }
    }
    const response = await sgClient.request(request);

    if (response[1].result[email]) return response[1].result[email].contact;
    else return null;
};

async function getListID(listName) {
    const request = {
        url: `/v3/marketing/lists`,
        method: 'GET',
    }
    const response = await sgClient.request(request);
    return response[1].result.find(x => x.name === listName).id;
}

async function addContactToList(email, listID) {
    const data = {
        "list_ids": [listID],
        "contacts": [{ "email": email }]
    };
    const request = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
    }
    return sgClient.request(request);
}

module.exports = { addEmail, getContactByEmail, getListID, addContactToList };