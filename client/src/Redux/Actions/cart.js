import axios from "axios";

import { URL,SET_LOCAL_CART, GET_USER_CART, SET_USER_CART, DELETE_USER_CART } from "../Constants";



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
export const setUserCart = (payload,idUser)=> async (dispatch)=>{
    try{
       
        let  json = await payload.map(async (e) =>{
            let res = await axios.post(`${URL}/cart`,{
                idUser: idUser,
                idProduct:payload.idProduct,
                 quantity:payload.quantity })
            return res.data.cart
           
        })
        return dispatch({
            type: SET_USER_CART,
            payload:json        })
    }
    catch(error){
        console.log(error)
    }
}
export const deleteUserCart= (idUser) =>async(dispatch) =>{
    try{
        let deleted = await axios.delete(`${URL}/cart`,{idUser:idUser})
        return dispatch({
            type:DELETE_USER_CART
        })
    }
    catch(error){
        console.log(error)
    }
}