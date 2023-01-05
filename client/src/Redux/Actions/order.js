import axios from "axios"
import { SET_ORDER, GET_ORDERS, GET_ADMIN_ORDERS, CHANGE_ORDER_ARCHIVE, CHANGE_ORDER_STATUS, URL } from "../Constants"



export const setOrder = (payload)=> async (dispatch)=>{
    try{
        let json = await axios.post(`${URL}/orders`,{idUser: payload})
        return dispatch({
            type: SET_ORDER,
            payload: json
        })
    }
    catch(error){console.log(error)}
}

export const getOrders = (payload)=> async (dispatch)=>{
    try{
        let json = await axios.get(`${URL}/orders?idUser=${payload}`)
        return dispatch({
            type: GET_ORDERS,
            payload: json
        })
    }
    catch(error){console.log(error)}
}

export const getAdminOrders = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/orders/admin",{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_ADMIN_ORDERS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeOrderArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/orders/admin/archive/',
            {
                method: 'PUT',
                body: JSON.stringify({'ids': payload}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_ORDER_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeOrderStatus = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/orders/admin/status/' + payload,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_ORDER_STATUS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}