const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')

const { User, Address } = require('../db.js');

//protejo todas las rutas ya que no es de nuestro interes que las vean quienes no estan autentificados
// router.use(authWithoutAdm);

router.get('/', async(req,res) => {                                             // localhost:3001/address (get)
    const {idUser} = req.body;                                                  // Requiere user id para buscar las direcciones de un usuario en especifico

    if(!idUser) return res.status(400).json({err: 'No user id was provided.'});  // Muestra un mensaje apropiado en caso de que no pasen ningun ID

    // let uidFire = req.user.uid;
    // if (idUser !== uidFire) { // Se verifica que coincidan los uid.
    //     return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    // }

    try {
        const user = await User.findByPk(idUser, {include: Address});           // Buscamos el usuario por id incluyendo sus address.
        const address = user.addresses;                                         // desde la base de datos normalzia el nombre como addresses, nada mas una pequeña correcion para darle el nombre correct

        res.status(200).send({msg: "Address obtained successfully.", result: address});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.post('/', async(req,res) => {                                                                                                // localhost:3001/address (post)
    const {idUser, address} = req.body;                                                                                             // Requerimos usuario y la direccion como objeto por body
    if(!idUser) return res.status(404).json({err: "User id is missing."});                                                           // Validaciones en caso de que falte algun dato y devuelve un msg apropiado

    // let uidFire = req.user.uid;
    // if (idUser !== uidFire) { // Se verifica que coincidan los uid.
    //     return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    // }
    
    const addressValidate = address || false;                                                                                       // Pequeño short circuit para evitar que si no pasan el address rompa el servidor

    if(!addressValidate.name || !addressValidate.street || !addressValidate.city || !addressValidate.region || !addressValidate.postalCode || !addressValidate.type){
        return res.status(404).json({err: "Important information is missing from address as name, street, city, region or postal code."});
    };

    try {
        const user = await User.findByPk(idUser);                                                                                   // Encontramos el usuario por id al cual le queremos agregar la direccion

        if(!user){                                                                                                                  // Si el usuario no existe no creamos nada y devolvemos msg de error apropiado
            return res.status(404).json({err: `The user ${idUser} provided doesn't exist.`})
        }

        const newAddress = await Address.create(addressValidate);                                                                   // Vinculacion de address con el usuario.
        const result = await user.addAddress(newAddress);
        
        res.status(201).json({msg: "Address created successfully.", result: result});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.put('/', async(req,res) => {                                                                                     // localhost:3001/address (put)
    const {idAddress, address, idUser} = req.body;                                                                              // Requerimos tanto el id de la direccion y la nueva direccion por body.

    if(!idAddress) return res.status(404).json({err: 'Address id is missing.'});                                         // Pequeñas validaciones para verificar que todos los datos fueron enviados
    if(!address) return res.status(404).json({err: "New address data is missing."});

    // let uidFire = req.user.uid;
    // if (idUser !== uidFire) { // Se verifica que coincidan los uid.
    //     return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    // }

    try {
        const addressToUpdate = await Address.findByPk(idAddress);                                                      // Buscamos la direccion a actualizar por id

        if(!addressToUpdate){                                                                                           // Validamos que exista, sino mostramos msg apropiado
            return res.status(404).json({err: `Address with id: ${idAddress} was not found.`});
        }

        const addressUpdated = await Address.update(address, {where: {id: idAddress}});                                 // Una vez encontrada actualizamos la informacion y devolvemos msg apropiado
        res.status(201).json({msg: `Address with the id: ${idAddress} was updated succesfully.`, result: addressUpdated})
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

router.delete('/:idAddress', async(req,res) => {                                                                        // localhost:3001/address (delete)
    const {idAddress} = req.params;                                                                                     // Requerimos el id de la address a eliminar por params

    const {idUser} = req.body;
    let uidFire = req.user.uid;
    if (idUser !== uidFire) { // Se verifica que coincidan los uid.
        return res.status(400).json({err: 'The idUser from the body and firebase does not match.'})
    }

    try {
        const addressToDelete = await Address.findByPk(idAddress);                                                      // Buscamos que la address exista
        if(idAddress && addressToDelete){                                                                               // Verificamos que exista tanto la direccion como un id previsto
            await Address.destroy({where: {id: idAddress}})                                                             // Si pasa la verificacion procedemos a eliminar la direccion y devolvemos msg apropiado
            res.status(200).json({msg: `Address deleted correctly.`, result: idAddress})
            return;
        };

        res.status(400).json({msg: `Address with id: ${idAddress} was already deleted or doesn't exist.`});              // En caso de que no pase devolvemos error con msg apropiado
    } catch (error) {
        res.status(400).json({err: error});
    }
})

module.exports = router