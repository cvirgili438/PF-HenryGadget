import axios from "axios"
import { GET_ADMIN_MAILING, CHANGE_MAILING_ARCHIVE, PUBLISH_MAILING, URL } from "../Constants"



export const getAdminMailng = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/mailing/admin",{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_ADMIN_MAILING,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeMailingArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/mailing/admin/archive/',
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
                type: CHANGE_MAILING_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const publishMailing = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/mailing/admin/publish/' + payload,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: PUBLISH_MAILING,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}