const axios = require('axios');
const { Products } = require('../db');



async function inicialProducts(){
    try {
        let products = [
            {
                brand: 'Apple',
                name: 'Airpods',
                price: 100,
                model: 'Apple AirPods Pro',
                type: 'headphones',
                stock: 10,
                img: 'https://http2.mlstatic.com/D_NQ_NP_667877-MCO50292509021_062022-O.webp'
            },
            {
                brand: 'Lenovo',
                name: 'Lenovo LivePods',
                price: 70,
                model: 'LP40',
                type: 'headphones',
                stock: 10,
                img: 'https://http2.mlstatic.com/D_NQ_NP_958613-MLA46481706067_062021-O.webp'
            }
        ]
        const isSaved = await Products.findAll();
        if (isSaved.length === 0) {
            await Products.bulkCreate(products);
            console.log('productos agregados')
        }
    } catch (error) {
        console.log(error, 'data not found')
    }
}

module.exports = { inicialProducts }