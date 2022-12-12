//import axios from 'axios';

import {
  URL,
	SET_PAGE_VIEW,
	SET_LOADING
} from '../Constants/index.js';


export const setPageView = (page) => {
	return function(dispatch) {
		return dispatch({
			type: SET_PAGE_VIEW,
			payload: page
    })
  }
}

export const setIsLoading = ()=>{
	return async function(dispatch){
		return dispatch({
			type:SET_LOADING
		})
	}
}
