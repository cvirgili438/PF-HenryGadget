const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('../middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Campaign, Newsletter } = require('../../db.js');


router.get('/', async (req,res)=> {                                                     
    const { archived } = req.query; 
    try {                                        
        const result = await Campaign.findAll({
            where: {archived: archived},
            order: [['created', 'DESC']],
        });  
        const mails = await Newsletter.count({where: {confirm: true}});
        res.status(200).json({msg: 'Campaigns obtained successfully.', result: result, mails: mails});
        return
        
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
router.use(authWithoutAdm);

router.post('/', async (req,res) => {    
    const campaign = req.body;                                                       
    const {title, content} = req.body; 

    if(!title || !content) return res.status(400).json({err: 'Missing data.'});              
    
    try {
        const campaignCreate = await Campaign.create(campaign);                                
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
    const { archived } = req.query; 
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
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                }); 
        res.status(200).json({msg: `Campaign with id: ${id} has been updated`, result: result})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/archive/', async (req,res) => {
    const {ids} = req.body;     
    const { archived } = req.query; 

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
                                                where: {archived: archived},
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
        const mails = await Newsletter.count({where: {confirm: true}});
        const campaignUpdated = await Campaign.update({published: true, contacts: mails}, {where: {id: id}});
        const campaigns = await Campaign.findAll({
                                                where: {archived: false},
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `Campaign ${campaign.title} has been published`, result: campaigns})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/rating/', async (req,res) => {
    const {id, value} = req.body;     
    const { archived } = req.query; 
    
    try { 
        const campaign = await Campaign.findByPk(id);
        if(!campaign){
            res.status(404).json({err: `Campaign with id: ${id} doesn't exist.`});
            return;
        }
        
        const campaignUpdated = await Campaign.update({rating: value}, {where: {id: id}});
        const campaigns = await Campaign.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `Campaign ${campaign.title} changed rating value to ${value}`, result: campaigns})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.delete('/:id', async (req, res) => {
    const { archived } = req.query;

    try {
        const { id } = req.params;
        const campaignToDelete = await Campaign.findByPk(id);
        if (campaignToDelete === null) {
            return res.status(400).json({ err: `The campaign with id: ${id} does not exits.` });
        }
        await Campaign.destroy({
            where: {
                id: id
            }
        });
        const campaigns = await Campaign.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                            });
        res.json({msg: `Campaign ${campaignToDelete.name} has been deleted.`, result: campaigns})
    } catch (error) {
        res.status(400).json({ err: error })
    }
})

module.exports = router;