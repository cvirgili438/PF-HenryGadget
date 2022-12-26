
export default function suma(array){
    let news = array.map(e => e.price*e.quantity)
let sum = 0
for(let i = 0; i< news.length;i++){
    sum = sum+news[i]
}
return sum
}
