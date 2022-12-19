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

export function updateProductCart(idProduct, idUser, quantity){
    if (idUser) { // Logueado
        sendDB(idProduct, idUser, quantity)
            .catch(data => console.log('Error enviar producto: ', data));
    }
    else { // No logueado
        let storage = JSON.parse(localStorage.getItem('cart')) || []; // Vector de productos
        storage.find(el => el.idProduct === idProduct).quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(storage));
    }
}

export function deleteProductCart(idProduct, idUser, quantity){
    if (idUser) { // Logueado
        sendDB(idProduct, idUser, quantity)
            .catch(data => console.log('Error enviar producto: ', data));
    } 
    else { // No logueado
        let storage = JSON.parse(localStorage.getItem('cart')) || []; // Vector de productos
        let result = storage.filter(el => el.idProduct !== idProduct)
        localStorage.setItem('cart', JSON.stringify(result));
    }
}

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
                    model: product.data.result.model,
                    stock: product.data.result.stock,
                    discount: product.data.result.discount,
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

export async function getQuantityProductCart(idProduct, idUser) {
    try {
        if (idUser) {
            let cart = await getAllCartDB(idUser).then(result => result);
            let result = cart.data.products.filter(el => el.id === idProduct);
            return ((result && result[0].product_cart.quantity) || 0);
        }
        else {
            let storage = JSON.parse(localStorage.getItem('cart')) || [];
            let result = storage.find(el => el.idProduct === idProduct);
            return (result && result.quantity) || 0;
        }
    }
    catch (error) {
        return 0;
    }

};