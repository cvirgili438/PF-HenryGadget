const { Router } = require('express');
const router = Router();

//const { User, Address } = require('../db.js');

router.post('/subscribe', (req, res) => {
    res.json('subscribe');
});

router.post('/confirm', (req, res) => {
    res.json('confirm');
});

router.post('/unsubscribe', (req, res) => {
    res.json('unsubscribe');
});

module.exports = router;