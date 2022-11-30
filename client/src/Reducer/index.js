import { GET_PRODUCTS } from "../Action"



const inicialtate = {
    products: [{brand: "Samsung", name :"Galaxy A13",price:"50.999,00",model:"SM-A135M",type:"smartphone", stock:"5",camera:"50", storage:"64",processor:"Octa-core",description:"saraza"},
    {brand: "Samsung", name :"Galaxy A03",price:"41.999,00",model:"SM-A035M",type:"smartphone", stock:"6",camera:"48", storage:"128",processor:"Unisoc UMS9230 8 núcleos 1.6 Ghz",description:"saraza"},
    {brand: "Samsung", name :"Galaxy A23",price:"79.999,00",model:"SM-A235M",type:"smartphone", stock:"4",camera:"50", storage:"128",processor:"Qualcomm SM6225 8 núcleos 2,4 Ghz",description:"saraza"},
    {}
]
}


// 	$ 				 MP	 GB		saraza
// Samsung	Galaxy S22 Ultra	$ 362.999,00	SM-S908E	smartphone	2	108 MP	256 GB	Qualcomm SM8450 2,99GHz	saraza
// Motorola	Moto G41	$ 49.999,00	XT2167-1	smartphone	4	48MP	128 GB	Mediatek Helio G85	saraza
// Motorola	Moto E40	$ 41.999,00	XT2159-1	smartphone	3	48 MP	64 GB	Octa Core 1.8	saraza

export default function rootReducer(state = inicialtate,action){
        switch(action.type){
            case GET_PRODUCTS:
                return {
                    ...state,
                    products : action.payload
                }
            default:
                return {...state}
        }
    
}