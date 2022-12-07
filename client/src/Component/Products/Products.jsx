import React from 'react';
import { useSelector } from 'react-redux';

import Product from '../Product/Product';
import Filters from '../Filters/Filters';
import SkeletonCards from '../SkeletonCards/SkeletonCards';

import styles from './Products.module.css';

import Pagination from '../Pagination/Pagination.jsx';
// import Paginated from '../Paginated/Paginated';

const Products = () => {
  const products = useSelector(state => state.filteredProducts);
  const array = [1,2,3,4,5,6,7,8,9]

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
              :
              array.map(e=>{
                return (<SkeletonCards key={e} />)
              })
            }
        </div>
      </div>
    </div>
  );
};

export default Products;