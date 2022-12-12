import axios from "axios";

import { URL,SET_LOCAL_CART, GET_USER_CART, SET_USER_CART, DELETE_USER_CART } from "../Constants";



export const setLocalCart = (payload)=>(dispatch)=>{
        try{
            if (payload === null || payload === undefined){
                return
            }
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
        let json = await axios.get(`${URL}/carts`,{params:{idUser: userId}})
        console.log(json)
        return dispatch({
            type: GET_USER_CART,
            payload:json.data
        })
    }
    catch(error){
        console.log(error)
    }
}
export const setUserCart = (payload,idUser)=>  (dispatch)=>{
    try{
       
        let  json =  payload.map(async (e) =>{
            let res =  axios.post(`${URL}/carts`,{
                idUser: idUser,
                idProduct:e.idProduct,
                 quantity:e.quantity })
            
        })
        
        Promise.All(json).then(()=>setTimeout(console.log('done'),2000))
        console.log(json)
        return dispatch({
            type: SET_USER_CART,
            payload:json })
    }
    catch(error){
        console.log(error)
    }
}
export const deleteUserCart= (uid) =>async(dispatch) =>{
    try{
       
        let deleted = await axios.delete(`${URL}/carts`,{data:{idUser:uid}})
        return dispatch({
            type:DELETE_USER_CART
        })
    }
    catch(error){
        console.log(error)
    }
}