const admin = require('../config/firebase-config');

async function decodeTokenNotAdmin(req, res, next) {
	let token = undefined
	if (req.headers.authorization) {
		token = req.headers.authorization.split(' ')[1];
	}
	try {
		const decodeValue = await admin.auth().verifyIdToken(token);

		if (decodeValue) {
			req.user = decodeValue;
			return next();
		}
		return res.json({ msg: 'Not authorized' });
	} catch (e) {
		return res.json({ msg: 'Not authorized' });
	}
}

module.exports = decodeTokenNotAdmin;
