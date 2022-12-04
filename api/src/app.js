const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
DOMAIN_FRONT = process.env.DOMAIN_FRONT || 'localhost';

const server = express();

server.name = 'API';
// AQUI VAN LOS MIDDLEWIRES

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

// AQUI VAN LAS RUTAS
const products = require('./routes/products.js');
server.use('/products', products);

const reviews = require('./routes/reviews.js');
server.use('/reviews', reviews);

const users = require('./routes/users');
server.use('/users', users);

const address = require('./routes/address.js');
server.use('/address', address);

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
