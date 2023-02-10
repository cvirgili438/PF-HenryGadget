import axios from "axios";
import { URL } from '../../../Redux/Constants/index.js';
import { sendAllCart } from "../cartCrud.js";

export async function sendDB(idProduct, idUser, quantity, set=false) {
    try {
        return await axios.post(`${URL}/carts/`, { idProduct, idUser, quantity, set });
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

export async function sendAllCartDB(storage, idUser) {
    try {
        return await axios.post(`${URL}/carts/all`, { products: storage, idUser });
    }
    catch (error) {
        return error;
    }
};