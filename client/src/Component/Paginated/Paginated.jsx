import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useQueryParams } from '../../hooks/useQueryParams'
import { getAllProducts, getProductsByQuery } from '../../Redux/Action'
import { objectToQuery } from '../../hooks/ObjectToQuery'
import style from './Paginated.module.css'

 const Paginated = () => {
    
    const dispatch=useDispatch()
    const product = useSelector((state)=>state.products)
    let history = useHistory()

    useEffect(()=>{
        dispatch(getAllProducts())
    },[dispatch])

    
    let produ = (product)=>{
        let maxLength = Math.ceil(product.length/9)
        let array=[]
        for (let i = 0; i < maxLength; i++) {
           array.push(i+1)
            
        }
        return array
    }
    let products = produ(product)
    let queries = useQueryParams()
    console.log(queries)
    let handlePaginated = (e)=>{
        queries.limit = 9
        queries.offset = e.target.id*9-9
        let string = objectToQuery(queries)
        history.push(`?${string}`)
        dispatch(getProductsByQuery(queries))
    }
   
    
   
  return (
    <nav>
    <ul className={style.paginated}>
        {
            products?.map((number,i) =>{
                return (
                    <li     className={style.number} key={i}>
                        <a id={i+1} onClick={e=>handlePaginated(e)}>
                            {products.indexOf(number)+1}
                        </a>
                    </li>
                )
            })
        }
    </ul>
</nav>
  )
}
export default Paginated