import { addItem } from './controllers/addItem.js';
import { sendDB, getAllCartDB, getProductDB, deleteCart, sendAllCartDB } from './controllers/conectDB.js';
// Sirve solo para dar aviso a los componentes de que el carrito fue editado.
import { REFRESH_CART } from '../../Redux/Constants/index.js';
import { store } from '../../Redux/Store/index.js'; // Para dispach.

export async function addProductCart(idProduct, idUser, quantity) {
    if (idUser) { // Logueado
        try {
            let response = await sendDB(idProduct, idUser, quantity);
            store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
            return response;
        }
        catch (error) {
            console.log('Error enviar producto: ', error.mesagge)
        }
    }
    else { // No logueado
        let storage = JSON.parse(localStorage.getItem('cart')) || []; // Vector de productos
        storage = addItem(storage, { idProduct, quantity });
        localStorage.setItem('cart', JSON.stringify(storage));
        store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
    }
};

export function updateProductCart(idProduct, idUser, quantity){
    if (idUser) { // Logueado
        sendDB(idProduct, idUser, quantity, true)
        .then(() => store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)}))
            .catch(data => console.log('Error enviar producto: ', data));
    }
    else { // No logueado
        let storage = JSON.parse(localStorage.getItem('cart')) || []; // Vector de productos
        if(quantity === 0) { // Cuando la cantidad es cero se debe eliminar producto de la lista.
            storage = storage.filter(el => el.idProduct !== idProduct);
            localStorage.setItem('cart', JSON.stringify(storage));
            store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
            return;
        }

        let result = storage.find(el => el.idProduct === idProduct);
        if (result)
            result.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(storage));
        store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
    }
}

export function deleteProductCart(idProduct, idUser, quantity){
    if (idUser) { // Logueado
        sendDB(idProduct, idUser, quantity, true)
        .then(() => store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)}))
            .catch(data => console.log('Error enviar producto: ', data));
    } 
    else { // No logueado
        let storage = JSON.parse(localStorage.getItem('cart')) || []; // Vector de productos
        let result = storage.filter(el => el.idProduct !== idProduct)
        localStorage.setItem('cart', JSON.stringify(result));
        store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
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
                    discount: el.discount,
                    stock: el.stock,
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

export async function getAllItemCart(idUser) {
    let count = 0
    let carts = await getAllCart(idUser)
    for (let i = 0; i < carts.length; i++) {
        count += carts[i].quantity;        
    }    
    return count
}

// Función que solo se llama cuando el cliente se logueado
// teniendo un carrito en el localstorage.
export async function sendAllCart(storage, idUser) {
    try {
        if(localStorage.getItem('cart')){
            let response = await sendAllCartDB(storage, idUser);
            store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
            return response;
        }
        
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
            store.dispatch({type: REFRESH_CART, payload: Math.ceil(Math.random() * 1000000000000)});
            return (result && result.quantity) || 0;
        }
    }
    catch (error) {
        return 0;
    }

};