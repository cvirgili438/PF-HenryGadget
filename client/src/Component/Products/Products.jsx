import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../Product/Product';
import Filters from '../Filters/Filters';
import SkeletonCards from '../SkeletonCards/SkeletonCards';
import Pagination from '../Pagination/Pagination.jsx';
import styles from './Products.module.css';
import { useState,useEffect } from 'react';
import NotFoundCards from '../SkeletonCards/NotFoundCards';


const Products = () => {
  const products = useSelector(state => state.filteredProducts);
  const message = useSelector(state => state.lastMsg)
  const [loading,setLoading]=useState(false)
 
  
  
  const array = [1,2,3,4,5,6,7,8,9]
  const test = ()=>{
    if(loading){return array.map(e=>{
      return (<SkeletonCards key={e} />) 
    })}
    if(!loading){
      return (<NotFoundCards />)
    }
  }
  useEffect(()=>{
    if(message === 'Products not found' ){
      setLoading(false)
      
    }
    if (message !=='Products not found' ){
      setLoading(true)
    }
  },[products])

  return (
    <div className={ styles.container }>
      <div className={ styles.filters }>
        <Filters />
      </div>
      <div className={ styles.paginated }>
        <Pagination />
        <div className={ styles.products }>
        {
          products.length > 0
          ?
          (
            products.map((p, i) => {
              return (
                <Product
                key={i}
                id={ p.id }
                name={p.name}
                description={p.description}
                image={p.img}
                price={p.price}
                units_left={p.stock}
                />
                )
              })
              )
              : test()
              
            }
        </div>
      </div>
    </div>
  );
};

export default Products;