import axios from "axios";
import { URL } from '../../Redux/Constants/index.js';

export async function sendAutomatickEmail(uid, subject, text, token) {
    try {
        return await axios.post(`${URL}/mail/sendmail`,
            { uid, subject, text },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
    }
    catch (error) {
        return error;
    }
};
