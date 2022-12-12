import { SET_USER_LOGIN } from '../Constants/index'

export const loginApp = (payload)=>{
    return async function(dispatch){
        return dispatch({
            type: SET_USER_LOGIN,
            payload
        })
    }
}