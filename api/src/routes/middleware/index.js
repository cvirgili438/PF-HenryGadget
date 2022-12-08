const axios = require('axios')
const admin = require('../config/firebase-config');

async function decodeToken(req, res, next) {
	let token = undefined
	if (req.headers.authorization) {
		token = req.headers.authorization.split(' ')[1];
	}
	try {
		const decodeValue = await admin.auth().verifyIdToken(token);
		let uid = decodeValue.uid;
		const res = await axios.get(`http://localhost:3001/users/${uid}`);
		let rol = res.data.result.rol;

		if (decodeValue && rol === 'admin') {
			req.user = decodeValue;
			return next();
		}
		return res.json({ message: 'Un authorize' });
	} catch (e) {
		return res.json({ message: 'What are you trying to do my friend? You are not worthy for this' });
	}
}


module.exports = decodeToken;