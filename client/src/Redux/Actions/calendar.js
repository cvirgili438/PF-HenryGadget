import axios from "axios";

import {
  URL,
  GET_APPOINTMENTS,
  CREATE_OR_UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT
} from "../Constants"


export const getAppointments = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/calendar/" + payload.location + '?email=' + payload.email,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_APPOINTMENTS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const createOrUpdateAppointment = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/calendar/',
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
                type: CREATE_OR_UPDATE_APPOINTMENT,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const deleteAppointment = (payload) => {
	return async function (dispatch) {   
		try {
            const response = await fetch(URL + '/calendar/'+ payload,
            {
                    method: 'DELETE',
                    headers: {
                            "Content-Type": "application/json",
                            "authorization":"Bearer " + payload
                    }
            })
            const data = await response.json()
            return dispatch({
                type: DELETE_APPOINTMENT,
                payload: data
            })
		}catch(err) {
			console.log(err)
		}
	}
}