import React from 'react';
import { useSelector } from 'react-redux';

import Product from '../Product/Product';
import Filters from '../Filters/Filters';

import styles from './Products.module.css';

import Pagination from '../Pagination/Pagination.jsx';
// import Paginated from '../Paginated/Paginated';

const Products = () => {
  const products = useSelector(state => state.filteredProducts);

  return (
    <div className={ styles.container }>
      <div className={ styles.filters }>
        <Filters />
      </div>
      <div className={ styles.paginated }>
        <Pagination />
        <div className={ styles.products }>
        {
          products
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
              <div className={ styles.noProducts }>No products available</div>
            }
        </div>
      </div>
    </div>
  );
};

export default Products;