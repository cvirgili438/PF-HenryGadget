import axios from 'axios';

import {GET_ADDRESSES, URL } from '../Constants';


export const getAddresses =  (payload)=>async(dispatch)=>{
    try{
        let json = await axios({
            url : `${URL}/address`,
            method :'get',
            headers: {"Authorization":"Bearer " + payload.token},
            params: {idUser:payload.idUser}
        })        
        return dispatch({
            type: GET_ADDRESSES,
            payload:json.data
        })
    }
    catch(error){console.log(error)}
}