import axios from "axios";
import { URL } from '../../Redux/Constants/index.js';

export async function sendEmail(email) {
    try {
        return (await axios.post(`${URL}/newsletter/subscribe`, { email })).data.msg;
    } catch (error) {
        return error.response.data.err;
    }
};

export async function sendConfirm(email, code) {
    try {
        return (await axios.post(`${URL}/newsletter/confirm`, { email, code })).data.msg;
    } catch (error) {
        return error.response.data.err;
    }
};

export async function sendUnsubscribe(email, code) {
    try {
        return (await axios.post(`${URL}/newsletter/unsubscribe`, { email, code })).data.msg;
    } catch (error) {
        return error.response.data.err;
    }
};