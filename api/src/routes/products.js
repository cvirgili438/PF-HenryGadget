const { Router } = require('express');
const router = Router();

const { Product, Review, Brand, Storage, Type } = require('../db.js');
const { Sequelize } = require("sequelize");

const getDifferencesArray = require('./controllers/getDifferencesArray.js');
const sortByPrice = require('./controllers/sortByPrice.js');
const sortByBrand = require('./controllers/sortByBrand.js');

router.get('/', async (req, res) => {

    const { name, brand, type, limit, offset, sortPrice, sortBrand } = req.query;
    const listQueries = ['name', 'brand', 'type', 'limit', 'offset', 'sortPrice', 'sortBrand'];

    if (getDifferencesArray(Object.getOwnPropertyNames(req.query), listQueries).length !== 0)
        return res.status(400).json('bad query');

    // Se chequea que se reciban solo opciones válidas
    if (sortPrice && !(sortPrice === 'up' || sortPrice === 'down'))
        return res.status(400).json('bad option in query sortPrice');

    if (sortBrand && !(sortBrand === 'up' || sortBrand === 'down'))
        return res.status(400).json('bad option in query sortBrand');

    try {
        const { name, brand, type, limit, offset } = req.query;
        let condition = {
            include: [
                {
                    model: Brand,
                    required: true
                },
                {
                    model: Type,
                    required: true
                },
                {
                    model: Storage,
                    required: true
                },
                {
                    model: Review,
                    required: true
                }]
        };

        let where = {};

        if (name) {
            where.name = { [Sequelize.Op.iLike]: `%${name}%` }
        }
        if (brand) {
            condition.include[0].where = { name: { [Sequelize.Op.iLike]: `%${brand}%` } }
        }
        if (type) {
            condition.include[1].where = { name: { [Sequelize.Op.iLike]: `%${type}%` } }
        }
        condition.where = where;

        if (limit && offset) {
            condition.limit = limit;
            condition.offset = offset;
        }

        let products = await Product.findAll(condition);
        // Convertir array en objetos sin metadata.
        products = products.map(el => el.get({ plain: true }))

        // SortPrice up o down
        if (sortPrice)
            products = sortByPrice(products, sortPrice);

        // sortBrand up o down
        if (sortBrand)
            products = sortByBrand(products, sortBrand);

        res.status(200).json(products);

    } catch (error) {
        res.status(400).json('product not found')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
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

router.post('/', async (req, res) => {
    const product = req.body;

    try {
        await Product.create(product);
        res.status(201).json({ msg: 'Product added correctly', product: product })
    } catch (error) {
        res.status(400).json({ err: error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
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