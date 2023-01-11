module.exports = function generatePersonalizations(contacs, URL, text, subject) {
    return contacs.map(el => {
        // Parámetros para la URL de confirmación.
        const params = new URLSearchParams({ code: el.code, email: el.email });
        // Página del Front.
        const confirmationURL = URL + '/NewsletterUnsubscribe?' + params;
        return {
            to: [{ email: el.email }],
            dynamic_template_data: {
                subject,
                textBody: text,
                unsubscribeLink: confirmationURL
            }
        }
    });

};
