const { Router } = require('express');
const router = Router();
const decodeToken = require('../middleware/index')

const { Product, Review, Brand, Storage, Type, Ram } = require('../../db.js');
const { Sequelize } = require("sequelize");

router.use(decodeToken);

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.findByPk(id);
        if (productToDelete === null) {
            return res.status(400).json({ err: `The product with id: ${id} does not exits.` });
        }
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.json({ msg: `The product with the name ${productToDelete.name} has been deleted.` })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
})

router.post('/', async (req, res) => {


    try {
        const product = req.body;
        const { type, brand, storage, ram } = req.body;
        if (!type || !brand) {
            return res.status(400).json({ err: "Important information is missing from product as type or brand." })
        }

        let productCreated = await Product.create(product);
        const [typeOfDevice, typeCreated] = await Type.findOrCreate({
            where: { name: type }
        });

        const [brandOfDevice, brandCreated] = await Brand.findOrCreate({
            where: { name: brand }
        });

        

        await productCreated.setBrand(brandOfDevice);
        await productCreated.setType(typeOfDevice);
        

        if (ram) {
            const [ramOfDevice, ramCreated] = await Brand.findOrCreate({
                where: { name: ram }
            });
            await productCreated.setRam(ramOfDevice);
        }
        if (storage) {
            const [storageOfDevice, created] = await Storage.findOrCreate({
                where: { size: storage }
            })
            await productCreated.setStorage(storageOfDevice);
            return res.status(201).json({ msg: 'Product added correctly', result: product })
        }
        res.status(201).json({ msg: 'Product added correctly.', result: product })
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
            return res.status(400).json({ err: `The enter id does not exist.` })
        }
        const { type, brand, storage } = req.body;
        if (type) {
            const [typeOfDevice, typeCreated] = await Type.findOrCreate({
                where: { name: type }
            });
            await product.setType(typeOfDevice);
        }

        if (brand) {
            const [brandOfDevice, brandCreated] = await Brand.findOrCreate({
                where: { name: brand }
            });
            await product.setBrand(brandOfDevice);
        }

        if (storage) {
            const [storageOfDevice, created] = await Storage.findOrCreate({
                where: { size: storage }
            })
            await product.setStorage(storageOfDevice);
        }

        if (ram) {
            const [ramOfDevice, ramCreated] = await Brand.findOrCreate({
                where: { name: ram }
            });
            await product.setRam(ramOfDevice);
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
        res.status(200).json({ msg: 'Updated.' })

    } catch (error) {
        res.status(400).json({ err: error.message });
    }
})

module.exports = router;