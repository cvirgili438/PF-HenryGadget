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
        return res.status(400).json({err: 'Bad query.'});

    // Se chequea que se reciban solo opciones válidas
    if (sortPrice && !(sortPrice === 'up' || sortPrice === 'down'))
        return res.status(400).json({err: 'Bad option in query sortPrice.'});

    if (sortBrand && !(sortBrand === 'up' || sortBrand === 'down'))
        return res.status(400).json({err: 'Bad option in query sortBrand.'});

    try {
        const { name, brand, type, limit, offset } = req.query;
        let condition = {
            include: [
                { model: Brand },
                { model: Type },
                { model: Storage },
                { model: Review }
            ]
        };

        let where = {};

        if (name) {
            where.name = { [Sequelize.Op.iLike]: `%${name}%` }
        }
        if (brand) {
            condition.include[0].where = { name: { [Sequelize.Op.iLike]: `${brand}` } }
        }
        if (type) {
            condition.include[1].where = { name: { [Sequelize.Op.iLike]: `${type}` } }
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

        res.status(200).json({msg: 'Products obtained successfully.', result: products});

    } catch (error) {
        res.status(400).json({err: 'Product not found.'})
    }
})

router.get('/type', async(req, res) => {
    try {
        const types = await Type.findAll();
        res.status(200).json({msg: 'List of types.', result: types});
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.get('/brand', async(req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({msg: 'List of available brands', result: brands});
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.get('/storage', async(req, res) => {
    try {
        const storages = await Storage.findAll();
        res.status(200).json({msg: 'List of available storages', result: storages});
    } catch (error) {
        res.status(400).json({err: error})
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
            return res.status(400).json({err: `The enter id does not exist.`})
        }
        res.status(200).json({msg: 'Product obtained successfully.', result: product});
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.findByPk(id);
        if (productToDelete === null) {
            return res.status(400).json({err: `The product with id: ${id} does not exits.`});
        }
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.json({msg: `The product with the name ${productToDelete.name} has been deleted.`})
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

router.post('/', async (req, res) => {
    

    try {
        const product = req.body;
        const {type, brand, storage} = req.body;
        if (!type || !brand) {
            return res.status(400).json({err: "Important information is missing from product as type or brand."})
        }

        let productCreated = await Product.create(product);
        const [typeOfDevice, typeCreated] = await Type.findOrCreate({
            where: {name: type}
        });
        
        const [brandOfDevice, brandCreated] = await Brand.findOrCreate({
            where: {name: brand}
        });
        
        await productCreated.setBrand(brandOfDevice);
        await productCreated.setType(typeOfDevice);
        if (storage) {
            const [storageOfDevice, created] = await Storage.findOrCreate({
                where: {size: storage}
            })
            await productCreated.setStorage(storageOfDevice);
            return res.status(201).json({ msg: 'Product added correctly', result: product })
        }
        res.status(201).json({ msg: 'Product added correctly.', result: product })
    } catch (error) {
        res.status(400).json({err: error.message})
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
            return res.status(400).json({err: `The enter id does not exist.`})
        }
        const {type, brand, storage} = req.body;
        if (type) {
            const [typeOfDevice, typeCreated] = await Type.findOrCreate({
                where: {name: type}
            });
            await product.setType(typeOfDevice);
        }

        if (brand) {
            const [brandOfDevice, brandCreated] = await Brand.findOrCreate({
                where: {name: brand}
            });
            await product.setBrand(brandOfDevice);
        }
        
        if (storage) {
            const [storageOfDevice, created] = await Storage.findOrCreate({
                where: {size: storage}
            })
            await product.setStorage(storageOfDevice);
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
        res.status(200).json({msg: 'Updated.'})

    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

module.exports = router;