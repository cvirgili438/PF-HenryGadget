import axios from 'axios';

import {GET_ADDRESSES, URL } from '../Constants';


export const getAddresses = (payload)=>(dispatch)=>{
    try{
        let json = axios({
            url : `${URL}/address`,
            method :'get',
            headers: {"Authorization":"Bearer " + payload.token},
            data: payload
        })
        return dispatch({
            type: GET_ADDRESSES,
            payload:json.data
        })
    }
    catch(error){console.log(error)}
}