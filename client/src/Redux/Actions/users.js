import { SET_USER_LOGIN , GET_USERS, GET_REVIEWS, URL} from '../Constants/index'

export const setUserInFrontState = (payload)=>{
    return async function(dispatch){
        return dispatch({
            type: SET_USER_LOGIN,
            payload
        })
    }
}

export const loginApp = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/users/log",{
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return data
        }catch(e){
            return e.message
        }
    }
}

export const getUsers = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/users",{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_USERS,
                payload: data.result
            })
        }catch(e){
            return e.message
        }
    }
}

export const getReviews = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/reviews",{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_REVIEWS,
                payload: data.result
            })
        }catch(e){
            return e.message
        }
    }
}