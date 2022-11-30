import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'


export const getAllProducts= ()=> async (dispatch)=>{   
      // Traemos en un futuro, un array de Productos con sus caracteristicas 
            try{
                var json = await axios('http://localhost3001/Products')
                return {
                    type:GET_PRODUCTS,
                    payload:json.data
                }
            }
            catch(err){console.log(err)}
}