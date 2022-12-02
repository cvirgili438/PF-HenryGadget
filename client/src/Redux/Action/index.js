import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const FILTER_BY_NAME = 'FILTER_BY_NAME'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'


export const getAllProducts= ()=> async (dispatch)=>{   
      // Traemos en un futuro, un array de Productos con sus caracteristicas 
            try{
                var json = await axios('http://localhost3001/Products')
                return dispatch({
                    type:GET_PRODUCTS,
                    payload:json.data
                })
            }
            catch(err){console.log(err)}
}

export const getProductByName = (name)=> async (dispatch)=>{
    try{
        let json = await axios(`http://localhost3001/Products?name=${name}`)
        return dispatch({
            type:FILTER_BY_NAME,
            payload:json.data
        })
    }
    catch(er){console.log(er)}
}

export const getProductById =(id) => async (dispatch) => {
    try {
        let res = await axios.get(`http://localhost3001/Products/${id}`)
        return dispatch({
            type:GET_PRODUCT_BY_ID,
            payload:res.data
        })
    } catch (er) {
        console.log(er)
    }
} 