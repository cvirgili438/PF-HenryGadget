const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
DOMAIN_FRONT = process.env.DOMAIN_FRONT || 'localhost';

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', DOMAIN_FRONT); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// AQUI VAN LOS MIDDLEWIRES
const products = require('./routes/products.js');
const reviews = require('./routes/reviews.js')
const users = require('./routes/users');
const address = require('./routes/address.js')

// Configurar los routers
// Ejemplo: server.use('/auth', authRouter);
server.use('/products', products);
server.use('/reviews', reviews);
server.use('/users', users);
server.use('/address', address)

server.get('/', (req, res) => {
    res.status(200).send("HenryGadget");
});
//////////////////////

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
