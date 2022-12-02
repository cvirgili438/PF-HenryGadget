const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const products = require('../routes/products');
const reviews = require('./reviews.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', products);
router.use('/reviews', reviews);

router.get('/', (req, res) => {
    res.status(200).send("HenryGadget");
});

module.exports = router;
