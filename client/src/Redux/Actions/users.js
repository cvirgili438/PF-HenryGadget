import {SET_USER_LOGIN_THIRDPARTIES} from '../Constants/index'

export const loginWithThirdParties = (payload)=>{
    return async function(dispatch){
        return dispatch({
            type: SET_USER_LOGIN_THIRDPARTIES,
            payload
        })
    }
}