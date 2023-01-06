import axios from 'axios';

import {GET_ADDRESSES, URL,PUT_ADDRESSES } from '../Constants';


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

export const putAddresses= (payload)=>async (dispatch)=>{
    try {
        let json = await axios({
            url : `${URL}/address`,
            method: 'put',
            headers: {"Authorization":"Bearer " + payload.token},
            data :{idAddress:payload.idAddress,address:payload.address,idUser:payload.idUser}
        })
        console.log(json)
        return dispatch({
            type:PUT_ADDRESSES,
            payload:json.data
        })
    } catch (error) {
        console.log(error)
    }
}