import axios from "axios";

import { URL,SET_LOCAL_CART, GET_USER_CART } from "../Constants";



export const setLocalCart = (payload)=>(dispatch)=>{
        try{
            return dispatch({
                type: SET_LOCAL_CART,
                payload:payload
            })
        }
        catch(error){
            console.log(error)
        }
}
export const getUserCart = (userId)=> async(dispatch)=>{
    try{
        let json = await axios.get(`${URL}/cart`,{idUser: userId})
        return dispatch({
            type: GET_USER_CART,
            payload:json.data
        })
    }
    catch(error){
        console.log(error)
    }
}