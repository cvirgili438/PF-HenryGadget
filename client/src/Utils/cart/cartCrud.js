import { addItem } from './controllers/addItem.js';
import { sendDB, getAllCartDB, getProductDB, deleteCart } from './controllers/conectDB.js';

export function addProductCart(idProduct, idUser, quantity) {
    if (idUser) { // Logueado
        sendDB(idProduct, idUser, quantity)
            .catch(data => console.log('Error enviar producto: ', data));
    }
    else { // No logueado
        let storage = JSON.parse(localStorage.getItem('cart')) || []; // Vector de productos
        storage = addItem(storage, { idProduct, quantity });
        localStorage.setItem('cart', JSON.stringify(storage));
    }
};

export async function getAllCart(idUser) {
    try {
        if (idUser) {
            let cart = await getAllCartDB(idUser);
            return cart.data.products.map(el => {
                return {
                    idProduct: el.id,
                    name: el.name,
                    price: el.price,
                    img: el.img[0],
                    quantity: el.product_cart.quantity
                }
            });
        }
        else {
            let storage = JSON.parse(localStorage.getItem('cart')) || [];
            let result = storage.map(async (el) => {
                let product = await getProductDB(el.idProduct);
                return {
                    idProduct: product.data.result.id,
                    name: product.data.result.name,
                    price: product.data.result.price,
                    img: product.data.result.img[0],
                    quantity: el.quantity
                };
            });
            return (await Promise.all(result));
        }
    }
    catch (e) {
        return [];
    }
};

export function sendAllCart(localCart, idUser) {
    try {
        localCart?.map(async (el) => {
            await sendDB(el.idProduct, idUser, el.quantity);
        });
        return true
    }
    catch (e) {
        console.log('error en catch', e)
        return false;
    }
};

export async function cleanCart(idUser) {
    if (idUser) {
        try {
            await deleteCart(idUser);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    else
        localStorage.removeItem('cart');
};

export function getQuantity(idProduct) {
    let storage = JSON.parse(localStorage.getItem('cart')) || [];
    let result = storage.find(el => {
        return el.idProduct === idProduct
    });
    return (result && result.quantity) || 0;
};