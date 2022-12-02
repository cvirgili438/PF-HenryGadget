const { Product } = require('../db');
const products = require('./products.js');
const review = require('./reviews.js');

async function inicialProducts() {
    try {
        for (let i = 0; i < products.length; i++) {
            let produc = await Product.create(products[i]);
            for (let j = i*3; j < i*3+3; j++) {
                produc.createReview(review[j]);
                
            }
        }
        // const isSaved = await Product.findAll();
        // if (isSaved.length === 0) {
        //     await Product.bulkCreate(products);
        //     console.log('productos agregados')
        // }
    } catch (error) {
        console.log(error, 'data not found')
    }
}

module.exports = { inicialProducts }