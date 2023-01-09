import axios from 'axios';

import { SET_LOCAL_ADRESS,SET_USER_ADDRESS,URL } from '../Constants';

export const setLocalAdress = (payload)=>(dispatch)=>{
    return dispatch({
        type:SET_LOCAL_ADRESS,
        payload
    })
}

export const setAddress = (payload)=>(dispatch)=>{

    axios.post( `${URL}/address`, payload.address)




    // try {
        
    //     axios({
    //         url : `${URL}/address`,
    //         method: 'post',
    //         // headers: {"Authorization":"Bearer " + payload.token},
    //         data : payload.address
    //         })
    //     .then
    // }
    // catch(error){console.log(error)}
}