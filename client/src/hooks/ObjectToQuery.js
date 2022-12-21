export const objectToQuery = (query) =>{
    let arrayObjeto = Object.entries(query) // pongo el objeto en formato array tipo [[Propiedad1,valor propiedad1],[Propiedad2,Valor2]] etc            
    let stringToUrl = ''
    arrayObjeto.map((el)=>{
        if(arrayObjeto.length -1 === arrayObjeto.indexOf(el)) // si el index es el ultimo, no agrega & sino si
        {return stringToUrl = stringToUrl.concat(`${el[0]}=${el[1]}`)} 
        else {return stringToUrl = stringToUrl.concat(`${el[0]}=${el[1]}&`)}
    })
    return stringToUrl
}