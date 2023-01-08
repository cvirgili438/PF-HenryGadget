const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Product, Review, User } = require('../db.js');

router.get('/', async (req,res)=> {                                                     // localhost:3001/reviews (get)
    const {idProduct, idUser} = req.body;                                               // Atributos requeridos para busqueda por body
    
    try {
        if(!Object.keys(req.body).length) {                                             // En caso de que no nos pasen ningun parametro devolver todas las reviews
            const result = await Review.findAll({
                                                where: {archived: false},
                                                order: [['id', 'ASC']],
                                                include: [{
                                                    model: Product
                                                }]
                                                });  
            
            result.length === 0                                                         // Si no hay reviews disponibles devolvera un array vacio, se valida y muestra msg apropiado, misma logica aplica para todos los casos
            ? res.status(404).json({err: "There are no reviews available."})
            : res.status(200).json({msg: 'Reviews obtained successfully.', result: result});
            return
        }

        if(!idUser) {                                                                   // Si no hay idUser habra idProduct si llego hasta aca, en ese caso devolver reviews filtradas por producto.
            const result = await Review.findAll({where:{productId: idProduct}});
            
            result.length === 0
            ? res.status(404).json({err: "There are no reviews available for this product or the product doesn't exist."})
            : res.status(200).json({msg: 'Reviews obtained successfully.', result: result});
            return
        }

        const result = await Review.findAll({where: {userId: idUser}});                 // Ya la ultima situacion posible es el idUser, en ese caso devolver reviews filtradas por usuario.
        result.length === 0
        ? res.status(404).json({err: "There are no reviews available for this user or the user doesn't exist."})
        : res.status(200).json({msg: 'Reviews obtained successfully.', result: result});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.get('/admin/', async (req, res) => {
    const { archived } = req.query;
    try {
        const reviews = await Review.findAll({
                                                where: {archived: archived},
                                                order: [['id', 'ASC']],
                                                include: [{
                                                    model: Product
                                                }]
                                            });
        res.status(200).json({msg: `${reviews.length} review/s loaded`, result: reviews})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

<<<<<<< HEAD
//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
router.use(authWithoutAdm);

router.post('/', async (req,res) => {                                                           // localhost:3001/reviews (post)
=======
router.post('/', authWithoutAdm, async (req,res) => {                                                           // localhost:3001/reviews (post)
>>>>>>> 4c419da099cea76455f7faed810e609ef6aa033e
    const {idProduct, idUser, reviewData} = req.body;                                           // Information recibida por body, id de usuario y product y un objeto de review, que tendra *score, titleComment y comment los nombres de las propiedades de reviewData deben ser extrictamente esos
    const reviewDataValidate = reviewData || false;                                             // Validacion en caso de que reviewData sea null, evitar que rompa el servidor
    let uidFire = req.user.uid;
    if (idUser !== uidFire) {
        return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    }

    if(!idProduct || !idUser) return res.status(400).json({err: 'Missing data.'});               // Si falta algun id devuelve un error.
    if(!reviewDataValidate) return res.status(400).json({err: 'Review data is missing.'});       // Revisa que si hayan pasado ReviewData
    if(!reviewDataValidate.score) return res.status(400).json({err: 'Review score is missing.'});// Revisa que reviewData tenga la propiedad score, titleComment y comments es opcional
    
    try {
        const product = await Product.findByPk(idProduct);                                       // Encuentra el product por ID
        const user = await User.findByPk(idUser);                                                // Encuentra el usuario por ID
        const review = await Review.create(reviewDataValidate);                                  // Crea una review con la data recibida por body en reviewData
        
        await user.addReview(review);                                                            // Linkeamos tanto en usuario y product la nueva review
        await product.addReview(review);

        res.status(201).json({msg: 'Review created succesfully.', result: review});
    } catch (error) {
        res.status(404).json({err: error.message});
    }
})

router.delete('/:idReview', async (req,res) => {                                                              // Localhost:3001/admin/id (soft delete) 
    const {idReview} = req.params;                                                                                  // Solicitamos id por params                           
    const {idUser} = req.body;
    let uidFire = req.user.uid;
    if (idUser !== uidFire) { // Se verifica que coincidan los uid.
        return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    }

    try {
        const reviewToDelete = await Review.findByPk(idReview);                                                     // Buscamos la review por id para verificar luego

        if(idReview && reviewToDelete){                                                                             // Validamos que nos hayan pasado tanto id por params y que si exista en la db
            await Review.destroy({where: {id: idReview}})                                                           // Si si existe eliminamos y devolvemos mensaje apropiado
            res.status(200).json({msg: 'Review deleted correctly.', result: idReview})
            return;
        }
        res.status(400).json({err: `Review with id: ${idReview} was already deleted or doesn't exist.`});            // En caso de que falle la validacion, devolveremos mensaje apropiado
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/visible/:idReview', async (req,res) => {
    const {idReview} = req.params;
    const { archived } = req.query;
    try { 
        const review = await Review.findByPk(idReview);
        if(!review){
            res.status(404).json({err: `Review with id: ${idReview} doesn't exist.`});
            return;
        }
        let newReview = false;
        if (review.visible === false) newReview = true; 
        const reviewUpdated = await Review.update({visible: newReview}, {where: {id: idReview}});
        const reviews = await Review.findAll({
                                            where: {archived: archived},
                                            order: [['id', 'ASC']],
                                            include: [{
                                                model: Product
                                            }]
                                            });
        res.status(200).json({msg: `Review with id: ${idReview} has changed visibility to ${newReview}`, result: reviews})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/archive/', async (req,res) => {
    const {ids} = req.body;     
    const { archived } = req.query;
    try { 
        const review = await Review.findAll({where: {id: {[Sequelize.Op.in]: ids}}});
        review.forEach(element => {
            if(!ids.includes(element.dataValues.id)){
                res.status(404).json({err: `Review with id: ${element.dataValues.id} doesn't exist. Cancelling operation.`});
                return;
            }
        });
        let newReview = true;
        if (review[0].archived === true) newReview = false; 
        const reviewUpdated = await Review.update({archived: newReview}, {where: {id: {[Sequelize.Op.in]: ids}}});
        const reviews = await Review.findAll({
                                                where: {archived: archived},
                                                order: [['id', 'ASC']],
                                                include: [{
                                                    model: Product
                                                }]
                                                });
        res.status(200).json({msg: `${review.length} review/s changed archived property to ${newReview}`, result: reviews})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/:idReview', async (req,res) => {                                                                                   //localhost:3001/id (put update)
    const {idReview} = req.params;                                                                                              // Requerimos la information por body(data a actualizar) y params (id de la review)
    const {reviewData, idUser} = req.body;
    const reviewDataValidate = reviewData || false;                                                                             // pequeña validacion para evitar que null no nos rompa el codigo

    let uidFire = req.user.uid;
    if (idUser !== uidFire) { // Se verifica que coincidan los uid.
        return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    }

    if(!idReview) return res.status(400).json({err: 'Review id is missing.'});                                                   // Validaciones en caso de que algo falte
    if(!reviewDataValidate.score && !reviewDataValidate.titleComment && !reviewDataValidate.comment) return res.status(400).json({err: 'Review data is missing.'});  
    
    try { 
        const review = await Review.findByPk(idReview);
        if(!review){
            res.status(404).json({err: `Review with id: ${idReview} doesn't exist.`});
            return;
        }
        const reviewUpdated = await Review.update(reviewData, {where: {id: idReview}});                                         // Se actualiza el titleComment y el comment
        res.status(200).json({msg: `Review with id: ${idReview} was updated`, result: reviewUpdated})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

module.exports = router;