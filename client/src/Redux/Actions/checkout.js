import axios from 'axios';

import { SET_LOCAL_ADRESS, SET_BUTTON_ACTIVE } from '../Constants';

export const setLocalAdress = (payload)=>(dispatch)=>{
    return dispatch({
        type:SET_LOCAL_ADRESS,
        payload
    })
}


export const setButtonActive = (boolean) => {
    return (dispatch) =>{

        return dispatch({
            type: SET_BUTTON_ACTIVE,
            payload: boolean
        })
        
    }
}