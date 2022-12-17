import axios from 'axios';

import {
  URL,
  CREATE_PRODUCT,
  GET_PRODUCTS_NAMES,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  GET_TYPES,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from '../Constants/index.js';

export const getAllProducts= ()=> async (dispatch)=>{   
	// Traemos en un futuro, un array de Productos con sus caracteristicas 
	try {
		var json = await axios(URL + '/Products')
		return dispatch({
			type:GET_PRODUCTS,
			payload:json.data
		})
	}
	catch(err) {
		console.log(err)
	}
}

export const getProductsNames= ()=> async (dispatch)=>{   
	// Traemos en un futuro, un array de Productos con sus caracteristicas 
	try {
		var json = await axios(URL + '/Products')
		return dispatch({
			type:GET_PRODUCTS_NAMES,
			payload:json.data
		})
	}
	catch(err) {
		console.log(err)
	}
}

export const getProductsByQuery = (query) => async (dispatch)=>{ // recibo un objeto query      
	if (query === {} || !query) {
		try {        
			let json = await  axios(URL + '/Products')
			return dispatch({
				type:GET_PRODUCTS_BY_QUERY,
				payload:json.data,
				filter:false
			})
		}
		catch(er) {
			
			if (er.code === "ERR_NETWORK"){
				return alert('Please Refresh the page with F5')
			}
		}
	}
	try {        
		let json = await  axios(URL + `/Products${query}`)
		return dispatch({
			type:GET_PRODUCTS_BY_QUERY,
			payload:json.data,
			filter:true
		})
	}
	catch(er) {
		if (er.code === "ERR_NETWORK"){
			return alert('Please Refresh the page with F5')
		}
		if(er.message.includes('404')){
		return dispatch({
			type:GET_PRODUCTS_BY_QUERY,
			payload:er.response.data,
			filter:true
		})}
	}
}

export const getProductById =(id) => async (dispatch) => {
	try {
		let res = await axios.get(URL + `/Products/${id}`)
		return dispatch({
			type:GET_PRODUCT_BY_ID,
			payload:res.data.result
		})
	}
	catch(er) {
		console.log(er)
	}
} 

export  const getAllFilters= ()=> async (dispatch)=>{
	try {
    let type = await axios(URL + `/Products/type`)
    let brand = await axios(URL + `/Products/brand`)
    let storage = await axios(URL + `/Products/storage`)
    let ram = await axios(URL + `/Products/ram`)
    return dispatch({
			type:GET_TYPES,
			payload : {
					type: type.data.result,
					brand: brand.data.result,
					storage: storage.data.result,
					ram: ram.data.result
			}
    })
 	}
	catch(er) {
		console.log(er.messege)
	}
}

export function addProduct(payload) {
	return async function (dispatch) {
		const response = await axios.post(URL + `/Products`, payload)
		return {
			type: CREATE_PRODUCT,
			response
		}
	}
}

export function editProduct(payload) {
	return async function (dispatch) {
		const response = await axios.put(URL + `/Products/`+ payload.id, payload.data)
		return {
			type: EDIT_PRODUCT,
			response
		}
	}
}

export function deleteProduct(payload) {
  return async function (dispatch) {
		const response = await axios.delete(URL + `/Products/` + payload)
		return {
			type: DELETE_PRODUCT,
			response
		}
  }
}

