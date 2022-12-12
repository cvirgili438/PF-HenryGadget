const { Product, Type, Storage, Ram, Brand, User } = require('../db');
const products = require('./objectToAdd/products.js');
const iphones = require('./objectToAdd/iphoneProducts')
const review = require('./objectToAdd/reviews.js');
const brands = require('./objectToAdd/brands.js');
const storages = require('./objectToAdd/storages.js');
const types = require('./objectToAdd/types.js');
const rams = require('./objectToAdd/ram.js');
const userAdmin = { // proyectofinalhenrygadget@gmail.com
    uid: 'ZTAC4VigPiX2a2VWQM939zMdSaF2',
    rol: 'admin'
};


async function inicialProducts() {
    try {

        await User.create(userAdmin);

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

        for (let i = 0; i < iphones.length; i++) {
            let iphone = await Product.create(iphones[i]);

            for (let j = i; j < i + 1; j++)
                iphone.createReview(review[j]);

            const [brandOfDevice, brandCreated] = await Brand.findOrCreate({
                where: { name: "Apple" }
            });
            iphone.setBrand(brandOfDevice);
            iphone.setType(arrayTypes[1]);
            iphone.setStorage(arrayStorage[Math.floor(Math.random() * storages.length - 1) + 1]);
            iphone.setRam(arrayRams[Math.floor(Math.random() * rams.length - 1) + 1]);

        }
    } catch (error) {
        console.log(error, 'data not found')
    }
}


module.exports = { inicialProducts }