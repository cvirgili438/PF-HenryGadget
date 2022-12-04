const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const products = require('../routes/products');
const users = require('../routes/users');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', products);
router.use('/users', users);

router.get('/', (req, res) => {
    res.status(200).send("HenryGadget");
});

module.exports = router;
