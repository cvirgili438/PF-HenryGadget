module.exports = function generatePersonalizations(contacs, URL, text) {
    return contacs.map(el => {
        // Parámetros para la URL de confirmación.
        const params = new URLSearchParams({ code: el.code, email: el.email });
        // Página del Front.
        const confirmationURL = URL + '/NewsletterUnsubscribe?' + params;
        return {
            to: [{ email: el.email }],
            dynamic_template_data: {
                textBody: text,
                unsubscribeLink: confirmationURL
            }
        }
    });

};

// let personalizations = [
//     {
//         to: [
//             {
//                 email: "ferb@e.email"
//             }
//         ],
//         dynamic_template_data: {
//             textBody: text,
//             unsubscribeLink: "ttp://localhost:3001"
//         }
//     },
//     {
//         to: [
//             {
//                 email: "ferb@autistici.org"
//             }
//         ],
//         dynamic_template_data: {
//             textBody: text,
//             unsubscribeLink: "http://localhost:3000"
//         }
//     }
// ];