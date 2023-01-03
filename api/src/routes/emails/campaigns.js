const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('../middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Campaign } = require('../../db.js');

//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
//router.use(authWithoutAdm);

router.get('/', async (req,res)=> {                                                     // localhost:3001/reviews (get)
                                                   // Atributos requeridos para busqueda por body

    try {
        if(!Object.keys(req.body).length) {                                             // En caso de que no nos pasen ningun parametro devolver todas las reviews
            const result = await Campaign.findAll({
                                                where: {archived: false},
                                                order: [['id', 'ASC']],
                                                });  
            
            result.length === 0                                                         // Si no hay reviews disponibles devolvera un array vacio, se valida y muestra msg apropiado, misma logica aplica para todos los casos
            ? res.status(404).json({err: "There are no campaigns available."})
            : res.status(200).json({msg: 'Campaigns obtained successfully.', result: result});
            return
        }
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

// router.post('/', async (req,res) => {                                                           // localhost:3001/reviews (post)
//     const {idProduct, idUser, reviewData} = req.body;                                           // Information recibida por body, id de usuario y product y un objeto de review, que tendra *score y comment los nombres de las propiedades de reviewData deben ser extrictamente esos
//     const reviewDataValidate = reviewData || false;                                             // Validacion en caso de que reviewData sea null, evitar que rompa el servidor
//     let uidFire = req.user.uid;
//     if (idUser !== uidFire) {
//         return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
//     }

//     if(!idProduct || !idUser) return res.status(400).json({err: 'Missing data.'});               // Si falta algun id devuelve un error.
//     if(!reviewDataValidate) return res.status(400).json({err: 'Review data is missing.'});       // Revisa que si hayan pasado ReviewData
//     if(!reviewDataValidate.score) return res.status(400).json({err: 'Review score is missing.'});// Revisa que reviewData tenga la propiedad score, comments es opcional
    
//     try {
//         const product = await Product.findByPk(idProduct);                                       // Encuentra el product por ID
//         const user = await User.findByPk(idUser);                                                // Encuentra el usuario por ID
//         const review = await Review.create(reviewDataValidate);                                  // Crea una review con la data recibida por body en reviewData
        
//         await user.addReview(review);                                                            // Linkeamos tanto en usuario y product la nueva review
//         await product.addReview(review);

//         res.status(201).json({msg: 'Review created succesfully.', result: review});
//     } catch (error) {
//         res.status(404).json({err: error.message});
//     }
// })

// router.put('/visible/:idReview', async (req,res) => {
//     const {idReview} = req.params;
    
//     try { 
//         const review = await Review.findByPk(idReview);
//         if(!review){
//             res.status(404).json({err: `Review with id: ${idReview} doesn't exist.`});
//             return;
//         }
//         let newReview = false;
//         if (review.visible === false) newReview = true; 
//         const reviewUpdated = await Review.update({visible: newReview}, {where: {id: idReview}});
//         const reviews = await Review.findAll({
//                                             where: {archived: false},
//                                             order: [['id', 'ASC']],
//                                             include: [{
//                                                 model: Product
//                                             }]
//                                             });
//         res.status(200).json({msg: `Review with id: ${idReview} has changed visibility to ${newReview}`, result: reviews})
//     } catch (error) {
//         res.status(400).json({err: error})
//     }
// })

router.put('/archive/', async (req,res) => {
    const {ids} = req.body;     

    try { 
        const campaign = await Campaign.findAll({where: {id: {[Sequelize.Op.in]: ids}}});
        campaign.forEach(element => {
            if(!ids.includes(element.dataValues.id)){
                res.status(404).json({err: `Campaign with id: ${element.dataValues.id} doesn't exist. Cancelling operation.`});
                return;
            }
        });
        let newCampaign = true;
        if (campaign[0].archived === true) newCampaign = false; 
        const campaignUpdated = await Campaign.update({archived: newCampaign}, {where: {id: {[Sequelize.Op.in]: ids}}});
        const campaigns = await Campaign.findAll({
                                                where: {archived: false},
                                                order: [['id', 'ASC']],
                                                });
        res.status(200).json({msg: `${campaign.length} campaign/s changed archived property to ${newCampaign}`, result: campaigns})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

// router.put('/:idReview', async (req,res) => {                                                                                   //localhost:3001/id (put update)
//     const {idReview} = req.params;                                                                                              // Requerimos la information por body(data a actualizar) y params (id de la review)
//     const {reviewData, idUser} = req.body;
//     const reviewDataValidate = reviewData || false;                                                                             // pequeña validacion para evitar que null no nos rompa el codigo

//     let uidFire = req.user.uid;
//     if (idUser !== uidFire) { // Se verifica que coincidan los uid.
//         return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
//     }

//     if(!idReview) return res.status(400).json({err: 'Review id is missing.'});                                                   // Validaciones en caso de que algo falte
//     if(!reviewDataValidate.score && !reviewDataValidate.comment) return res.status(400).json({err: 'Review data is missing.'});  
    
//     try { 
//         const review = await Review.findByPk(idReview);
//         if(!review){
//             res.status(404).json({err: `Review with id: ${idReview} doesn't exist.`});
//             return;
//         }
//         const reviewUpdated = await Review.update(reviewData, {where: {id: idReview}});                                         // Se actualiza el comment
//         res.status(200).json({msg: `Review with id: ${idReview} was updated`, result: reviewUpdated})
//     } catch (error) {
//         res.status(400).json({err: error})
//     }
// })

module.exports = router;