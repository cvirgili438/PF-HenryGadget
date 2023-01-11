import axios from "axios";

import {
    URL,
    CHANGE_CAMPAIGN_ARCHIVE,
    PUBLISH_CAMPAIGN,
    GET_CAMPAIGNS,
    CREATE_CAMPAIGN,
    UPDATE_CAMPAIGN,
    DELETE_CAMPAIGN,
    CHANGE_CAMPAIGN_RATING
} from "../Constants"



export const getCampaigns = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/campaigns/?archived=" + payload.archived,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
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
            console.log(payload)
            const response = await fetch(URL + '/campaigns/archive/?archived=' + payload.archived,
            {
                method: 'PUT',
                body: JSON.stringify({'ids': payload.ids}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload.token
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
            const response = await fetch(URL + '/campaigns/publish/' + payload.id,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json();

            const response2 = await fetch(URL + '/newsletter/sendmail/',
            {
                method: 'POST',
                body: JSON.stringify({'subject': payload.subject, 'text': payload.text}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data2 = await response2.json();
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
                    "authorization":"Bearer " + payload.token
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
            const response = await fetch(URL + '/campaigns/?archived=' + payload.mode.archived,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload.token
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

export const deleteCampaign = (payload) => {
	return async function (dispatch) {   
		try {
				const response = await fetch(URL + '/campaigns/'+ payload.id + '?archived=' + payload.archived,
				{
						method: 'DELETE',
						headers: {
								"Content-Type": "application/json",
								"authorization":"Bearer " + payload.token
						}
				})
				const data = await response.json()
				return dispatch({
					type: DELETE_CAMPAIGN,
					payload: data
				})
		}catch(err) {
			console.log(err)
		}
	}
}

export const changeCampaignRaiting = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/campaigns/rating/?archived=' + payload.mode.archived,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_CAMPAIGN_RATING,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}