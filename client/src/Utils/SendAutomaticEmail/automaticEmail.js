import axios from "axios";
import { URL } from '../../Redux/Constants/index.js';
const token = 'FALTA VER COMO OBTENERLO DESDE FIREBASE.';

export async function sendAutomatickEmail(uid, subject, text) {
    try {
        return await axios.post(`${URL}/mail/sendmail`,
            { uid, subject, text },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }
    catch (error) {
        return error;
    }
};