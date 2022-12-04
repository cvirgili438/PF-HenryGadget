const { Router } = require('express');
const router = Router();

const { User, Review } = require('../db.js');
const { Sequelize } = require("sequelize");


router.get('/', async (req, res) => {
    try {
        const { email, rol, limit, offset } = req.query;
        const condition = {};
        let where = {};

        if (email) {
            where.email = {[Sequelize.Op.iLike]: `%${email}%`}
        }
        if (rol) {
            where.rol = {[Sequelize.Op.iLike]: `%${rol}%`}
        }
        condition.where = where;
        condition.include = Review;

        if (limit && offset) {
            condition.limit =  limit;
            condition.offset =  offset;
        }

        const users = await User.findAll(condition);
        res.status(200).json(users);

    } catch (error) {
        res.status(400).json('user not found')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id}});
        if (user === null) {
            return res.status(400).json(`The enter id does not exist`)
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(`The enter id does not exist`)
    }
})

router.post('/', async (req,res) => {
    try {
        const {dni, firstName, lastName, email, phone} = req.body;
        
        const user = req.body;
        await User.create(user);
        res.status(201).json({msg: 'User created correctly', user: user})
    } catch (error) {
        const {dni, firstName, lastName, email, phone} = req.body;
        if (!dni || !firstName || !lastName || !email || !phone) {
            return res.status(400).json(error.errors.map(e => e.message).join(', '));
        }
        res.status(400).json({err: error.errors})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const userToDelete = await User.findOne({where: {id}});
        console.log(userToDelete)
        if (userToDelete === null) {
            return res.json(`The user with id: ${id} does not exits`)
        }
        await User.destroy({
            where: {
                id: id
            }
        });
        res.json(`The user with the email ${userToDelete.email} has been deleted`)
    } catch (error) {
        res.status(400).json('The user does not exist')
    }
})



router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}});
        if (user === null) {
            return res.status(400).json(`Does not exist users with the enter id`)
        }
        const body = req.body;
        await user.update(body,{where: {id}})
        res.status(200).json('User has been updated')

    } catch (error) {
        if (error.parent.detail) {
            return res.status(400).json(error.parent.detail);
        }
        res.status(400).json(error);
    }
})

module.exports = router;