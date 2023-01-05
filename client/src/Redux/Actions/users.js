import { SET_USER_LOGIN , GET_USERS, GET_REVIEWS, CHANGE_REVIEW_VISIBLE, CHANGE_REVIEW_ARCHIVE, CHANGE_USER_ACTIVE, CHANGE_USER_ADMIN, URL} from '../Constants/index'

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
            const response = await fetch(URL + '/reviews/admin/?archived=' + payload.archived,{
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
            const response = await fetch(URL + '/reviews/visible/' + payload.id + '?archived=' + payload.archived,{
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
            const response = await fetch(URL + '/reviews/archive/?archived=' + payload.archived,
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
                type: CHANGE_REVIEW_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeUserActive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/users/active/',
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
                type: CHANGE_USER_ACTIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeUserAdmin = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/users/admin/' + payload,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_USER_ADMIN,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

