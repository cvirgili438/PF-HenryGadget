import axios from "axios"
import {
    SET_ORDER,
    GET_ORDERS,
    DELETE_ORDER,
    GET_ADMIN_ORDERS,
    CHANGE_ORDER_ARCHIVE,
    CHANGE_ORDER_STATUS,
    URL
} from "../Constants"



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

export const getAdminOrders = (payload) => async (dispatch)=>{   
	try {
		const response = await fetch(URL + '/orders/admin/?archived=' + payload.archived,
					{
							method: 'GET',
							headers: {
									"Content-Type": "application/json",
									"authorization":"Bearer " + payload
							}
					})
					const data = await response.json()
					return dispatch({
							type: GET_ADMIN_ORDERS,
							payload: data
					})
	}
	catch(err) {
		console.log(err)
	}
}

export const changeOrderArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/orders/admin/archive/?archived=' + payload.archived,
            {
                method: 'PUT',
                body: JSON.stringify({'ids': payload.ids}),
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
            const response = await fetch(URL + '/orders/admin/status/' + payload.id + '?archived=' + payload.archived,
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

export const deleteOrder = (payload) => {
	return async function (dispatch) {   
		try {
				const response = await fetch(URL + '/orders/admin/'+ payload.id + '?archived=' + payload.archived,
				{
						method: 'DELETE',
						headers: {
								"Content-Type": "application/json",
								"authorization":"Bearer " + payload
						}
				})
				const data = await response.json()
				return dispatch({
					type: DELETE_ORDER,
					payload: data
				})
		}catch(err) {
			console.log(err)
		}
	}
}