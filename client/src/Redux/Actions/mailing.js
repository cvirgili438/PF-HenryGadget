import axios from "axios"
import { CHANGE_CAMPAIGN_ARCHIVE, PUBLISH_CAMPAIGN, URL, GET_CAMPAIGNS, CREATE_CAMPAIGN, UPDATE_CAMPAIGN } from "../Constants"



export const getCampaigns = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/campaigns/",{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_CAMPAIGNS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeCampaignArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/campaigns/archive/',
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
                type: CHANGE_CAMPAIGN_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const publishCampaign = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/campaigns/publish/' + payload,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: PUBLISH_CAMPAIGN,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const createCampaign = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/campaigns/',
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: CREATE_CAMPAIGN,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const updateCampaign = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/campaigns/',
            {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: UPDATE_CAMPAIGN,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}