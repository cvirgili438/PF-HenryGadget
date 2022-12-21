import axios from "axios";
import { URL } from '../../../Redux/Constants/index.js';

export async function sendDB(idProduct, idUser, quantity) {
    try {
        return await axios.post(`${URL}/carts`, { idProduct, idUser, quantity });
    }
    catch (error) {
        return error;
    }
};

export async function getAllCartDB(idUser) {
    try {
        return await axios.get(`${URL}/carts?idUser=${idUser}`);
    }
    catch (error) {
        return null;
    }
};

export async function getProductDB(idProduct) {
    try {
        return await axios.get(`${URL}/products/${idProduct}`);
    }
    catch (error) {
        return null;
    }
};

export async function deleteCart(idUser) {
    try {
        await axios.delete(`${URL}/carts`, { idUser });
    } catch (error) {
        console.log('Error al borrar carrito.')
    }
};
