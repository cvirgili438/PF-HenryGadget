const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const products = require('../routes/products');
const reviews = require('./reviews.js')
const users = require('../routes/users');
const address = require('../routes/address.js');
const carts = require('../routes/cart/cart');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', products);
router.use('/reviews', reviews);
router.use('/users', users);
router.use('/address', address);
router.use('/carts', carts)

router.get('/', (req, res) => {
    res.status(200).send("HenryGadget");
});

// Para cuando no coincide con ninguna de las rutas creadas
router.get('*', (req, res) => {
    res.status(400).send({err: 'The route does not match any of the established ones.'});
});

module.exports = router;
