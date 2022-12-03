import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const FILTER_BY_NAME = 'FILTER_BY_NAME'
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

export const paginated = (value)=>(dispatch)=>{
    // falta ponerse deacuerdo sobre cuatno en cuanto va a ir el paginado
}