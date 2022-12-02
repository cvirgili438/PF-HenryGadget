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

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findOne({
            where: {
                id: id
            }
        });
        if (product === null) {
            return res.status(400).json(`The enter id does not exist`)
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(`The enter id does not exist`)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.findByPk(id);
        if (productToDelete === null) {
            return res.json(`The product with id: ${id} does not exits`)
        }
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.json(`The product with the name ${productToDelete.name} has been deleted`)
    } catch (error) {
        res.status(400).json('An error has occurred')
    }
})

router.post('/', async (req,res) => {
    const product = req.body;
    
    try {
        await Product.create(product);
        res.status(201).json({msg: 'Product added correctly', product: product})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findOne({
            where: {
                id: id
            }
        });
        if (product === null) {
            return res.status(400).json(`The enter id does not exist`)
        }
        const body = req.body;
        await Product.update(
            body,
            {
                where: {
                    id
                }
            }
        )
        res.status(200).json('Updated')

    } catch (error) {
        res.status(400).json('An error has occurred');
    }
})

module.exports = router;