import {  CREATE_PRODUCT, GET_PRODUCTS,GET_PRODUCTS_BY_QUERY, GET_PRODUCT_BY_ID, GET_TYPES, SET_PAGE_VIEW, SET_USER } from "../Action"



const inicialtate = {
    products: [
    //     {brand: "Samsung", name :"Galaxy A13",price:"50.999,00",model:"SM-A135M",type:"smartphone", stock:"5",camera:"50", storage:"64",processor:"Octa-core",description:"saraza"},
    // {brand: "Samsung", name :"Galaxy A03",price:"41.999,00",model:"SM-A035M",type:"smartphone", stock:"6",camera:"48", storage:"128",processor:"Unisoc UMS9230 8 núcleos 1.6 Ghz",description:"saraza"},
    // {brand: "Samsung", name :"Galaxy A23",price:"79.999,00",model:"SM-A235M",type:"smartphone", stock:"4",camera:"50", storage:"128",processor:"Qualcomm SM6225 8 núcleos 2,4 Ghz",description:"saraza"},
    // {}
            ],
    filteredProducts: [],
    productDetail: [],
    filters:{},
    page: 1,
    totalProducts: 42,
    user:[]

}



export default function rootReducer(state = inicialtate,action){
        switch(action.type){
            case GET_PRODUCTS:
                return {
                    ...state,
                    products : action.payload
                }           
            case GET_PRODUCTS_BY_QUERY:
                if(action.filter === false){
                    let products = action.payload
                    let filtered = products.slice(0,9)
                return {
                    ...state,
                    products:products,
                    filteredProducts:filtered
                }
                }
                else return {
                        ...state,
                        filteredProducts:action.payload
                }
            case GET_PRODUCT_BY_ID:
                return{
                    ...state,
                    productDetail : action.payload
                }
            case GET_TYPES:
                let types = {}
                types.type = action.payload.type.map(el =>{return el.name})
                types.brand = action.payload.brand.map(el =>{return el.name})
                types.storage = action.payload.storage.map(el =>{return el.size})
                types.ram = action.payload.ram.map(el=>{return el.size})
                return{
                    ...state,
                    filters: types
                }
            case SET_PAGE_VIEW:
                return {
                    ...state,
                    page: Number(action.payload)
                }
            case CREATE_PRODUCT:
                return {
                    ...state,
                }
            case SET_USER:
                return {
                    ...state,
                    user:action.payload
                }
            default:
                return {...state}
        }
    
}