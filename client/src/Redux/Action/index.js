import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_TYPES = 'GET_TYPES'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const GET_PRODUCTS_BY_QUERY= 'GET_PRODUCTS_BY_QUERY'


export const getAllProducts= ()=> async (dispatch)=>{   
      // Traemos en un futuro, un array de Productos con sus caracteristicas 
            try{
                var json = await axios('http://localhost:3001/Products')
                return dispatch({
                    type:GET_PRODUCTS,
                    payload:json.data
                })
            }
            catch(err){console.log(err)}
}

export const getProductsByQuery = (query)=> async (dispatch)=>{ // recibo un objeto query      
   if(query === {}){
    try{        
        let json = await  axios(`http://localhost:3001/Products`)
        return dispatch({
            type:GET_PRODUCTS_BY_QUERY,
            payload:json.data,
            filter:false
        })
    }
    catch(er){console.log(er.messege)}
   }
    let arrayObjeto = Object.entries(query) // pongo el objeto en formato array tipo [[Propiedad1,valor propiedad1],[Propiedad2,Valor2]] etc            
    let stringToUrl = ''
    arrayObjeto.map((el)=>{
        if(arrayObjeto.length -1 === arrayObjeto.indexOf(el)) // si el index es el ultimo, no agrega & sino si
        {return stringToUrl = stringToUrl.concat(`${el[0]}=${el[1]}`)} 
        else {return stringToUrl = stringToUrl.concat(`${el[0]}=${el[1]}&`)}
    })
    try{        
        let json = await  axios(`http://localhost:3001/Products?${stringToUrl}`)
        return dispatch({
            type:GET_PRODUCTS_BY_QUERY,
            payload:json.data,
            filter:true
        })
    }
    catch(er){console.log(er.messege)}
}

export const getProductById =(id) => async (dispatch) => {
    try {
        let res = await axios.get(`http://localhost:3001/Products/${id}`)
        return dispatch({
            type:GET_PRODUCT_BY_ID,
            payload:res.data
        })
    } catch (er) {
        console.log(er)
    }
} 
export  const getAllFilters= ()=> async (dispatch)=>{
 try {
    let type = await axios(`http://localhost:3001/Products/type`)
    let brand = await axios(`http://localhost:3001/Products/brand`)
    let storage = await axios("http://localhost:3001/Products/storage")
    return dispatch({
        type:GET_TYPES,
        payload : {
            type: type.data.result,
            brand: brand.data.result,
            storage: storage.data.result
        }
    })
 }
 catch(er){console.log(er.messege)}
}