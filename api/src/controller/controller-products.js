const { Product, Type, Storage } = require('../db');
const products = require('./products.js');
const review = require('./reviews.js');
const brands = require('./brands.js');
const storages = require('./storages.js');
const types = require('./types.js');

async function inicialProducts() {

   
    try {
        let arrayStorage = [
            await Storage.create(storages[0]),
            await Storage.create(storages[1]),
            await Storage.create(storages[2])
        ];
        

        const typeHead = await Type.create(types[0]);
        const typeSmart = await Type.create(types[1]);

        for (let i = 0; i < products.length; i++) {
            let produc = await Product.create(products[i]);

            for (let j = i * 3; j < i * 3 + 3; j++)
                produc.createReview(review[j]);

            produc.createBrand(brands[i]);

            if (i < 2)
                produc.setType(typeHead);
            else {
                produc.setType(typeSmart);
                produc.setStorage(arrayStorage[Math.floor(Math.random() * 2) + 1]);
            }
        }
    } catch (error) {
        console.log(error, 'data not found')
    }
}

module.exports = { inicialProducts }