import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const FILTER_BY_NAME = 'FILTER_BY_NAME'
export const GET_PRODUCTS_BY_QUERY= 'GET_PRODUCTS_BY_QUERY'


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

export const getProductsByQuery = (query)=> async (dispatch)=>{ // recibo un objeto query
    let arrayObjeto = Object.entries(query) // pongo el objeto en formato array tipo [[Propiedad1,valor propiedad1],[Propiedad2,Valor2]] etc
    let stringToUrl = ''
    arrayObjeto.map((el)=>{
        if(arrayObjeto.length -1 == arrayObjeto.indexOf(el)) // si el index es el ultimo, no agrega & sino si
        {stringToUrl = stringToUrl.concat(`${el[0]}=${el[1]}`)} 
        else {{stringToUrl = stringToUrl.concat(`${el[0]}=${el[1]}&`)}}
    })
    try{
        
        let json = await  axios(`http://localhost3001/Products?${stringToUrl}`)
        return dispatch({
            type:GET_PRODUCTS_BY_QUERY,
            payload:json.data
        })
    }
    catch(er){console.log(er.messege)}
}

export const paginated = (value)=>(dispatch)=>{
    // falta ponerse deacuerdo sobre cuatno en cuanto va a ir el paginado
}