const admin = require('../config/firebase-config');
const { User } = require('../../db.js')

async function decodeToken(req, res, next) {
	let token = undefined
	if (req.headers.authorization) {
		token = req.headers.authorization.split(' ')[1];
	}
	console.log(token)
	try {
		const decodeValue = await admin.auth().verifyIdToken(token);

		let uid = decodeValue.uid;
		const user = await User.findOne({where: {uid}});
		let rol = user.rol

		if (decodeValue && rol === 'admin') {
			req.user = decodeValue;
			return next();
		}
		return res.json({ msg: 'Not authorized' });
	} catch (e) {
		return res.json({ msg: 'Not authorized' });
	}
}




module.exports = decodeToken;