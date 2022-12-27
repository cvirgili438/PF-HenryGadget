import axios from "axios"
import { SET_ORDER, URL } from "../Constants"



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