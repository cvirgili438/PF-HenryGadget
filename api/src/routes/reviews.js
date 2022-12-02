const { Router } = require('express');
const router = Router();

const { Product, Review, User } = require('../db.js');

router.post('/', async (req,res) => {                                                       // localhost:3001/reviews
    const {idProduct, idUser, reviewData} = req.body;                                      // Information recibida por body, id de usuario y product y un objeto de review, que tendra *score y comment los nombres de las propiedades de reviewData deben ser extrictamente esos
    const reviewDataValidate = reviewData || false;

    if(!idProduct || !idUser) return res.status(400).json({err: 'Missing data'});          // Si falta algun id devuelve un error.
    if(!reviewDataValidate) return res.status(400).json({err: 'Review data is missing'});   // Revisa que reviewData tenga la probiedad score, comments es opcional
    if(!reviewDataValidate.score) return res.status(400).json({err: 'Review score is missing'});
    
    try {
        const product = await Product.findByPk(idProduct);                                 // Encuentra el product por ID
        const user = await User.findByPk(idUser);                                          // Encuentra el usuario por ID
        const review = await Review.creaxte(reviewDataValidate);                                    // Crea una review con la data recibida por body en reviewData
        
        await user.addReview(review);                                                      // Linkeamos tanto en usuario y product la nueva review
        await product.addReview(review);

        res.status(201).json({msg: 'Review created succesfully', review: review});
    } catch (error) {
        res.status(404).json({err: error});
    }
})

module.exports = router;