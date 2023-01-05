import axios from 'axios';

import { SET_LOCAL_ADRESS,SET_USER_ADDRESS,URL } from '../Constants';

export const setLocalAdress = (payload)=>(dispatch)=>{
    return dispatch({
        type:SET_LOCAL_ADRESS,
        payload
    })
}

export const setAddress = (payload)=>(dispatch)=>{
    try {
        //let json = axios.post(`${URL}/address`,payload)
        let json = axios({
            url : `${URL}/address`,
            method: 'post',
            headers: {"Authorization":"Bearer " + payload.token},
            data : payload
        })
        return dispatch({
            type:SET_USER_ADDRESS,
            payload:payload.data.result
        })
    }
    catch(error){console.log(error)}
}