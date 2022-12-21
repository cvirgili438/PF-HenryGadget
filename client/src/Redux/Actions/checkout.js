import axios from 'axios';

import { SET_ADRESS,URL } from '../Constants';

export const setLocalAdress = (payload)=>(dispatch)=>{
    return dispatch({
        type:SET_ADRESS,
        payload
    })
}