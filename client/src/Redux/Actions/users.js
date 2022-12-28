import { async } from '@firebase/util'
import { SET_USER_LOGIN , GET_USERS, GET_USER_BY_ID, GET_REVIEWS, CHANGE_REVIEW_VISIBLE, CHANGE_REVIEW_ARCHIVE, URL} from '../Constants/index'

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

export const getUserById = (id) => {
    return async function(dispatch) {
        try {
            const response = await fetch(`${URL}/users/${id}`,{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer "
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_USER_BY_ID,
                payload: data.result
            })
        } catch (e) {
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

export const changeReviewVisible = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/reviews/visible/' + payload,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_REVIEW_VISIBLE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeReviewArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/reviews/archive/',
            {
                method: 'PUT',
                body: JSON.stringify({'ids': payload}) ,
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_REVIEW_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}