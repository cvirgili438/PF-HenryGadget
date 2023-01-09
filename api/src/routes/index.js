const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productsAdmin = require('../routes/products/productsAdmin');
const products = require('../routes/products/products');
const reviews = require('./reviews.js')
const usersAdmin = require('../routes/usersAdmin.js');
const users = require('../routes/users.js');
const address = require('../routes/address.js');
const carts = require('../routes/cart/cart');
const checkout = require('../routes/checkout/checkout.js')
const orderAdmin = require('../routes/order/orderAdmin');
const order = require('../routes/order/order')
const newsletter = require('./emails/newsletter.js');
const mail = require('./emails/sendMail.js');
const campaigns = require('./emails/campaigns.js')

const { route } = require('../routes/products/productsAdmin');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products/admin', productsAdmin);
router.use('/products', products);
router.use('/reviews', reviews);
router.use('/users/admin', usersAdmin);
router.use('/users', users);
router.use('/address', address);
router.use('/carts', carts)
router.use('/checkout',checkout)
router.use('/orders/admin', orderAdmin);
router.use('/orders', order);
router.use('/newsletter', newsletter);
router.use('/mail', mail);
router.use('/campaigns', campaigns);

router.get('/', (req, res) => {
    res.status(200).send("HenryGadget");
});

// Para cuando no coincide con ninguna de las rutas creadas
router.get('*', (req, res) => {
    res.status(400).send({err: 'The route does not match any of the established ones.'});
});

module.exports = router;
