const { Product, Type, Storage, Ram } = require('../db');
const products = require('./objectToAdd/products.js');
const review = require('./objectToAdd/reviews.js');
const brands = require('./objectToAdd/brands.js');
const storages = require('./objectToAdd/storages.js');
const types = require('./objectToAdd/types.js');
const rams = require('./objectToAdd/ram.js');

async function inicialProducts() {
    try {
        const arrayStorage = [
            await Storage.create(storages[0]),
            await Storage.create(storages[1]),
            await Storage.create(storages[2])
        ];

        const arrayRams = [
            await Ram.create(rams[0]),
            await Ram.create(rams[1]),
            await Ram.create(rams[2])
        ];

        const arrayTypes = [
            await Type.create(types[0]), // Headphone
            await Type.create(types[1]) // Smartphone
        ];

        for (let i = 0; i < products.length; i++) {
            let produc = await Product.create(products[i]);

            for (let j = i * 3; j < i * 3 + 3; j++)
                produc.createReview(review[j]);

            produc.createBrand(brands[i]);

            if (i < 2)
                produc.setType(arrayTypes[0]);
            else {
                produc.setType(arrayTypes[1]);
                produc.setStorage(arrayStorage[Math.floor(Math.random() * storages.length - 1) + 1]);
                produc.setRam(arrayRams[Math.floor(Math.random() * rams.length - 1) + 1]);
            }
        }
    } catch (error) {
        console.log(error, 'data not found')
    }
}

module.exports = { inicialProducts }