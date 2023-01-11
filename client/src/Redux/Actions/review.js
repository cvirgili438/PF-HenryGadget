import { ADD_REVIEW, URL } from '../Constants';

export const addReview = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(`${URL}/reviews`,{
                method: "POST",
                body: JSON.stringify(payload.info),
                headers:{
                    "Content-type": "application/json",
                    "Authorization":"Bearer " + payload.token
                },
                
            })
            const data = await response.json()
            return dispatch({
                            type:ADD_REVIEW,
                            payload: data
                        })
        }catch(e){
            return e.message
        }
    }
}




