import axios from "axios";

import { URL,SET_LOCAL_CART, GET_USER_CART, SET_USER_CART, DELETE_USER_CART, CLEAR_CARTS, REFRESH_CARTS } from "../Constants";



export const setLocalCart = (payload)=>(dispatch)=>{
        try{
            if (payload === null || payload === undefined){
                return
            }
            return dispatch({
                type: SET_LOCAL_CART,
                payload: payload
            })
        }
        catch(error){
            console.log(error)
        }
}
export const getUserCart = (userId)=> async(dispatch)=>{
    try{
        let json = await axios.get(`${URL}/carts`,{params:{idUser: 'NqfQiSDhpFaAzh9v7ULz6aW34x33'}})
        
        return dispatch({
            type: GET_USER_CART,
            payload: json.data
        })
    }
    catch(error){
        console.log(error)
    }
}

export const setUserCart = (payload, idUser)=> async (dispatch)=>{
    try{
      
        for (let x = 0; x < payload.length; x++) {
          // console.log(idUser, payload[x].idProduct, payload[x].quantity);
          await axios.post(`${URL}/carts`, {
                                            idUser: 'NqfQiSDhpFaAzh9v7ULz6aW34x33',
                                            idProduct: payload[x].idProduct,
                                            quantity: payload[x].quantity
          })
        }
        // let  json =  payload.map(async (e) => {
        //     let res =  axios.post(`${URL}/carts`,{
        //         idUser: idUser,
        //         idProduct: e.idProduct,
        //         quantity: e.quantity
        //       })
        //   })
        // console.log(json);
        // Promise.All(json).then(()=>setTimeout(console.log('done'),2000))
        
        return dispatch({
            type: SET_USER_CART,
            payload: payload })
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

export const clearCarts = () => {
	return function(dispatch) {
		return dispatch({
			type: CLEAR_CARTS,
			payload: []
    })
  }
}

export const refreshCarts = () => {
	return function(dispatch) {
		return dispatch({
			type: REFRESH_CARTS,
			payload: []
    })
  }
}
