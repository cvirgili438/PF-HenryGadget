import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsByQuery } from '../../Redux/Action/index.js'

import Product from '../Product/Product';
import Filters from '../Filters/Filters';

import styles from './Products.module.css';

// import Paginated from '../Paginated/Paginated';
import Pagination from '../Pagination/Pagination.jsx';

const Products = ({ featured }) => {
  const products = useSelector(state => state.filteredProducts);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      // CUANDO TENGAMOS MUCHOS PRODUCTOS CAMBIAR EL 3 A 9
      dispatch(getProductsByQuery({limit: 3, offset: 0}));
    }
  }, [products, dispatch]);

  return (
    <div className={ styles.container }>
      <div className={ styles.filters }>
        <Filters />
      </div>
      <div className={ styles.paginated }>
        <Pagination />
        {/* <Paginated /> */}
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