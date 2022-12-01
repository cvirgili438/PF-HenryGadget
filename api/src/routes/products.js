const { Router } = require('express');
const router = Router();

const { Product } = require('../db.js');
const { Sequelize } = require("sequelize");


router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        var condition = {};

        if (name) {
            condition = {
                where: {
                    name: {
                        [Sequelize.Op.iLike]: '%' + name + '%'
                    }
                }
            };
        }

        const products = await Product.findAll(condition);
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json('product not found')
    }
})

module.exports = router;