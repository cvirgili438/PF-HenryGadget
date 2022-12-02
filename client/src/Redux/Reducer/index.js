import { FILTER_BY_NAME, GET_PRODUCTS, GET_PRODUCT_BY_ID } from "../Action"



const inicialtate = {
    products: [
    //     {brand: "Samsung", name :"Galaxy A13",price:"50.999,00",model:"SM-A135M",type:"smartphone", stock:"5",camera:"50", storage:"64",processor:"Octa-core",description:"saraza"},
    // {brand: "Samsung", name :"Galaxy A03",price:"41.999,00",model:"SM-A035M",type:"smartphone", stock:"6",camera:"48", storage:"128",processor:"Unisoc UMS9230 8 núcleos 1.6 Ghz",description:"saraza"},
    // {brand: "Samsung", name :"Galaxy A23",price:"79.999,00",model:"SM-A235M",type:"smartphone", stock:"4",camera:"50", storage:"128",processor:"Qualcomm SM6225 8 núcleos 2,4 Ghz",description:"saraza"},
    // {}
            ],
    filteredProducts: [],
    productDetail: []
}



export default function rootReducer(state = inicialtate,action){
        switch(action.type){
            case GET_PRODUCTS:
                return {
                    ...state,
                    products : action.payload
                }
            case FILTER_BY_NAME:
                return{
                    ...state,
                    filteredProducts:action.payload

                }
            case GET_PRODUCT_BY_ID:
                return{
                    ...state,
                    productDetail : action.payload
                }
            default:
                return {...state}
        }
    
}