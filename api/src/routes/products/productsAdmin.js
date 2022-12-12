const { Router } = require('express');
const router = Router();
const decodeToken = require('../middleware/index')

const { Product, Review, Brand, Storage, Type, Ram } = require('../../db.js');

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
        res.status(400).json({ err: error })
    }
})

router.post('/', async (req, res) => {
    const product = req.body;
    const { name, price, model, stock, type, brand, storage, img, ram } = req.body;
    if (!name || !model || !price || !stock || !type || !brand || !img)
        return res.status(400).json({ err: "Important information is missing from product." })

    try {
        let productCreated = await Product.create(product);

        const [typeOfDevice, typeCreated] = await Type.findOrCreate({
            where: { name: type }
        });
        await productCreated.setType(typeOfDevice);

        const [brandOfDevice, brandCreated] = await Brand.findOrCreate({
            where: { name: brand }
        });
        await productCreated.setBrand(brandOfDevice);

        if (storage) {
            const [storageOfDevice, storageCreated] = await Storage.findOrCreate({
                where: { size: storage }
            })
            await productCreated.setStorage(storageOfDevice);
        }
        if (ram) {
            const [ramOfDevice, ramCreated] = await Ram.findOrCreate({
                where: { size: ram }
            })
            await productCreated.setRam(ramOfDevice);
        }

        res.status(201).json({ msg: 'Product added correctly.', result: productCreated })
    } catch (error) {
        res.status(400).json({ err: error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });

        if (product === null)
            return res.status(400).json({ err: `The enter id does not exist.` })

        const { type, brand, storage, ram } = req.body;
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
            const [storageOfDevice, storageCreated] = await Storage.findOrCreate({
                where: { size: storage }
            })
            await product.setStorage(storageOfDevice);
        }
        if (ram) {
            const [ramOfDevice] = await Ram.findOrCreate({
                where: { size: ram }
            })
            await product.setRam(ramOfDevice);
        }

        await Product.update(req.body, { where: { id } })
        res.status(200).json({ msg: 'Updated.' })

    } catch (error) {
        res.status(400).json({ err: error });
    }
})

module.exports = router;
