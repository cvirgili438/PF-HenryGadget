import axios from 'axios';

import { SET_LOCAL_ADRESS,SET_USER_ADDRESS, SET_BUTTON_ACTIVE, URL } from '../Constants';

export const setLocalAdress = (payload)=>(dispatch)=>{
    return dispatch({
        type:SET_LOCAL_ADRESS,
        payload
    })
}

export const setAddress = (payload)=>async (dispatch)=>{
    try {
        //let json = axios.post(`${URL}/address`,payload)
        let json = await axios({
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

export const setButtonActive = (boolean) => {
    return (dispatch) =>{

        return dispatch({
            type: SET_BUTTON_ACTIVE,
            payload: boolean
        })
        
    }
}