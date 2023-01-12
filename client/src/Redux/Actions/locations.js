import axios from "axios";

import {
  URL,
  GET_LOCATIONS,
  GET_ADMIN_LOCATIONS,
  CREATE_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATION,
  CHANGE_LOCATION_ARCHIVE,
  CHANGE_LOCATION_VISIBLE
} from "../Constants"


export const getLocations = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/locations/",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_LOCATIONS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const getAdminLocations = (payload)=>{
  return async function(dispatch){
      try{
          const response = await fetch(URL + '/locations/admin/?archived=' + payload.archived,{
              method: "GET",
              headers:{
                  "Content-Type": "application/json",
                  "authorization":"Bearer " + payload.token
              }
          })
          const data = await response.json()
          return dispatch({
              type: GET_ADMIN_LOCATIONS,
              payload: data
          })
      }catch(e){
          return e.message
      }
  }
}

export const changeLocationArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/locations/admin/archive/?archived=' + payload.archived,
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
                type: CHANGE_LOCATION_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeLocationVisible = (payload) => {
  return async function(dispatch) {
      try {
          const response = await fetch(URL + '/locations/admin/visible/?archived=' + payload.archived,
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
              type: CHANGE_LOCATION_VISIBLE,
              payload: data
          })
      }catch(e){
          return e.message
      }
  }
}

export const createLocation = (payload) => {
    return async function(dispatch) {
        try {
            
            const response = await fetch(URL + '/locations/admin/',
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
                type: CREATE_LOCATION,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const updateLocation = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/locations/admin/?archived=' + payload.mode.archived,
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
                type: UPDATE_LOCATION,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const deleteLocation = (payload) => {
	return async function (dispatch) {   
		try {
				const response = await fetch(URL + '/locations/admin/'+ payload.id + '?archived=' + payload.archived,
				{
						method: 'DELETE',
						headers: {
								"Content-Type": "application/json",
								"authorization":"Bearer " + payload.token
						}
				})
				const data = await response.json()
				return dispatch({
					type: DELETE_LOCATION,
					payload: data
				})
		}catch(err) {
			console.log(err)
		}
	}
}

export const updateLocationAp = (payload) => {
    return async function(dispatch) {
        try {
            console.log(payload)
            const response = await fetch(URL + '/locations/admin/ap/?archived=' + payload.mode.archived,
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
                type: UPDATE_LOCATION,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

// export const changeLocationRaiting = (payload) => {
//     return async function(dispatch) {
//         try {
//             const response = await fetch(URL + '/locations/rating/?archived=' + payload.mode.archived,
//             {
//                 method: 'PUT',
//                 body: JSON.stringify(payload),
//                 headers: {
//                     "Content-Type": "application/json",
//                     "authorization":"Bearer " + payload.token
//                 }
//             })
//             const data = await response.json()
//             return dispatch({
//                 type: CHANGE_LOCATION_RATING,
//                 payload: data
//             })
//         }catch(e){
//             return e.message
//         }
//     }
// }