const { Router } = require('express');
const router = Router();

const { Product, Review, User } = require('../db.js');

router.get('/', async (req,res)=> {                                                     // localhost:3001/reviews (get)
    const {idProduct, idUser} = req.body;                                               // Atributos requeridos para busqueda por body

    try {
        if(!Object.keys(req.body).length) {                                             // En caso de que no nos pasen ningun parametro devolver todas las reviews
            const result = await Review.findAll();  
            
            result.length === 0                                                         // Si no hay reviews disponibles devolvera un array vacio, se valida y muestra msg apropiado, misma logica aplica para todos los casos
            ? res.status(404).json({msg: "There are no reviews available"})
            : res.status(200).json(result);
            return
        }

        if(!idUser) {                                                                   // Si no hay idUser habra idProduct si llego hasta aca, en ese caso devolver reviews filtradas por producto.
            const result = await Review.findAll({where:{productId: idProduct}});
            
            result.length === 0
            ? res.status(404).json({msg: "There are no reviews available for this product or the product doesn't exist"})
            : res.status(200).json(result);
            return
        }

        const result = await Review.findAll({where: {userId: idUser}});                 // Ya la ultima situacion posible es el idUser, en ese caso devolver reviews filtradas por usuario.
        result.length === 0
        ? res.status(404).json({msg: "There are no reviews available for this user or the user doesn't exist"})
        : res.status(200).json(result);
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.post('/', async (req,res) => {                                                           // localhost:3001/reviews (post)
    const {idProduct, idUser, reviewData} = req.body;                                           // Information recibida por body, id de usuario y product y un objeto de review, que tendra *score y comment los nombres de las propiedades de reviewData deben ser extrictamente esos
    const reviewDataValidate = reviewData || false;                                             // Validacion en caso de que reviewData sea null, evitar que rompa el servidor

    if(!idProduct || !idUser) return res.status(400).json({err: 'Missing data'});               // Si falta algun id devuelve un error.
    if(!reviewDataValidate) return res.status(400).json({err: 'Review data is missing'});       // Revisa que si hayan pasado ReviewData
    if(!reviewDataValidate.score) return res.status(400).json({err: 'Review score is missing'});// Revisa que reviewData tenga la propiedad score, comments es opcional
    
    try {
        const product = await Product.findByPk(idProduct);                                       // Encuentra el product por ID
        const user = await User.findByPk(idUser);                                                // Encuentra el usuario por ID
        const review = await Review.create(reviewDataValidate);                                  // Crea una review con la data recibida por body en reviewData
        
        await user.addReview(review);                                                            // Linkeamos tanto en usuario y product la nueva review
        await product.addReview(review);

        res.status(201).json({msg: 'review created succesfully', review: review});
    } catch (error) {
        res.status(404).json({err: "user or product doesn't exist"});
    }
})

router.delete('/admin/:idReview', async (req,res) => {                                                              // Localhost:3001/admin/id (soft delete) 
    const {idReview} = req.params;                                                                                  // Solicitamos id por params                           

    try {
        const reviewToDelete = await Review.findByPk(idReview);                                                     // Buscamos la review por id para verificar luego
        if(idReview && reviewToDelete){                                                                             // Validamos que nos hayan pasado tanto id por params y que si exista en la db
            await Review.destroy({where: {id: idReview}})                                                           // Si si existe eliminamos y devolvemos mensaje apropiado
            res.status(200).json({msg: 'Review deleted correctly', idReview})
            return;
        }
        res.status(400).json({msg: `Review with id: ${idReview} was already deleted or doesn't exist`});            // En caso de que falle la validacion, devolveremos mensaje apropiado
    } catch (error) {
        res.status(400).json({msg: `Review with id: ${idReview} was already deleted or doesn't exist`, err: error})
    }
})

router.put('/:idReview', async (req,res) => {                                                                                   //localhost:3001/id (put update)
    const {idReview} = req.params;                                                                                              // Requerimos la information por body(data a actualizar) y params (id de la review)
    const {reviewData} = req.body;
    const reviewDataValidate = reviewData || false;                                                                             // pequeña validacion para evitar que null no nos rompa el codigo

    if(!idReview) return res.status(400).json({err: 'Review id is missing'});                                                   // Validaciones en caso de que algo falte
    if(!reviewDataValidate.score && !reviewDataValidate.comment) return res.status(400).json({err: 'Review data is missing'});  
    
    try { 
        const review = await Review.findByPk(idReview);
        if(!review){
            res.status(404).json({err: `Review with id: ${idReview} doesn't exist`})
        }
        const reviewUpdated = await Review.update(reviewData, {where: {id: idReview}});                                         // Se actualiza el comment
        res.status(200).json({msg: `Review with id: ${idReview} was updated`, reviewUpdated})
    } catch (error) {
        res.status(400).json({err: error})
    }
})


module.exports = router;