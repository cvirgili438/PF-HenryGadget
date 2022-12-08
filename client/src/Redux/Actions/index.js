//import axios from 'axios';

import {
  URL,
	SET_PAGE_VIEW
} from '../Constants/index.js';


export const setPageView = (page) => {
	return function(dispatch) {
		return dispatch({
			type: SET_PAGE_VIEW,
			payload: page
    })
  }
}
