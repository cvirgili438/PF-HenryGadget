const axios = require('axios')
const admin = require('../config/firebase-config');

async function decodeToken(req, res, next) {
	let token = undefined
	if (req.headers.authorization) {
		token = req.headers.authorization.split(' ')[1];
	}
	try {
		const decodeValue = await admin.auth().verifyIdToken(token);
		console.log(decodeValue)
		console.log(decodeValue.email)
		let email = decodeValue.email;
		const res = await axios.get(`http://localhost:3001/users?${email}`);
		let rol = res.data.result[0].rol;
		console.log(res.data.result[0].rol);

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