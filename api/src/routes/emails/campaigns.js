const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('../middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Campaign, Newsletter } = require('../../db.js');

//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
//router.use(authWithoutAdm);

router.get('/', async (req,res)=> {                                                     

    try {                                        
        const result = await Campaign.findAll({
                                            where: {archived: false},
                                            order: [['created', 'DESC']],
                                            });  
        const mails = await Newsletter.count({where: {confirm: true}});
        result.length === 0                                                         
        ? res.status(404).json({err: "There are no campaigns available."})
        : res.status(200).json({msg: 'Campaigns obtained successfully.', result: result, mails: mails});
        return
        
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.post('/', async (req,res) => {    
    const campaign = req.body;                                                       // localhost:3001/reviews (post)
    const {title, content} = req.body;                                           // Information recibida por body, id de usuario y product y un objeto de review, que tendra *score y comment los nombres de las propiedades de reviewData deben ser extrictamente esos

    if(!title || !content) return res.status(400).json({err: 'Missing data.'});               // Si falta algun id devuelve un error.
    
    try {
        const campaignCreate = await Campaign.create(campaign);                                  // Crea una review con la data recibida por body en reviewData
        const result = await Campaign.findAll({
                                                where: {archived: false},
                                                order: [['created', 'DESC']],
                                                }); 
        res.status(201).json({msg: 'Campaign created succesfully.', result: result});
    } catch (error) {
        res.status(404).json({err: error.message});
    }
})

router.put('/', async (req,res) => {
    const {id, title, content} = req.body;
    try { 
        const campaign = await Campaign.findByPk(id);
        if(!campaign){
            res.status(404).json({err: `Campaign with id: ${id} doesn't exist.`});
            return;
        }
        const udpatedCampaign = await Campaign.update({
                                                        title: title,
                                                        content: content
                                                    },
                                                    {where: {id: id}});
        const result = await Campaign.findAll({
                                                where: {archived: false},
                                                order: [['created', 'DESC']],
                                                }); 
        res.status(200).json({msg: `Campaign with id: ${id} has been updated`, result: result})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

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
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `${campaign.length} campaign/s changed archived property to ${newCampaign}`, result: campaigns})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/publish/:id', async (req,res) => {
    const {id} = req.params;     
    
    try { 
        const campaign = await Campaign.findByPk(id);
        if(!campaign){
            res.status(404).json({err: `Campaign with id: ${id} doesn't exist.`});
            return;
        }
        if(campaign.published){
            res.status(404).json({err: `Campaign with id: ${id} was already published.`});
            return;
        }

        const campaignUpdated = await Campaign.update({published: true}, {where: {id: id}});
        const campaigns = await Campaign.findAll({
                                                where: {archived: false},
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `Campaign ${campaign.title} has been published`, result: campaigns})
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