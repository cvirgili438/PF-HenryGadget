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

// export const getAdminLocations = (payload)=>{
//   return async function(dispatch){
//       try{
//           const response = await fetch(URL + '/locations/admin/?archived=' + payload.archived,{
//               method: "GET",
//               headers:{
//                   "Content-Type": "application/json",
//                   "authorization":"Bearer " + payload.token
//               }
//           })
//           const data = await response.json()
//           return dispatch({
//               type: GET_ADMIN_LOCATIONS,
//               payload: data
//           })
//       }catch(e){
//           return e.message
//       }
//   }
// }

// export const changeLocationArchive = (payload) => {
//     return async function(dispatch) {
//         try {
//             const response = await fetch(URL + '/locations/admin/archive/?archived=' + payload.archived,
//             {
//                 method: 'PUT',
//                 body: JSON.stringify({'ids': payload.ids}),
//                 headers: {
//                     "Content-Type": "application/json",
//                     "authorization":"Bearer " + payload.token
//                 }
//             })
//             const data = await response.json()
//             return dispatch({
//                 type: CHANGE_LOCATION_ARCHIVE,
//                 payload: data
//             })
//         }catch(e){
//             return e.message
//         }
//     }
// }

// export const changeLocationVisible = (payload) => {
//   return async function(dispatch) {
//       try {
//           const response = await fetch(URL + '/locations/admin/visible/?archived=' + payload.archived,
//           {
//               method: 'PUT',
//               body: JSON.stringify({'ids': payload.ids}),
//               headers: {
//                   "Content-Type": "application/json",
//                   "authorization":"Bearer " + payload.token
//               }
//           })
//           const data = await response.json()
//           return dispatch({
//               type: CHANGE_LOCATION_VISIBLE,
//               payload: data
//           })
//       }catch(e){
//           return e.message
//       }
//   }
// }

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
                console.log(payload)
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