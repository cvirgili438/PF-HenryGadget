import axios from "axios";

import { URL,SET_LOCAL_CART } from "../Constants";



export const setLocalCart = (payload)=>(dispatch)=>{
        try{
            return dispatch({
                type: SET_LOCAL_CART,
                payload:payload
            })
        }
        catch(error){
            console.log(error)
        }
}