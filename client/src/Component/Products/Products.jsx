import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts } from '../../Redux/Action/index.js'

import Product from '../Product/Product';
import Filters from '../Filters/Filters';

import styles from './Products.module.css';

import Paginated from '../Paginated/Paginated';

const Products = ({ featured }) => {
  const products = useSelector(state => state.products);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);

  return (
    <div className={ styles.container }>
      <div className={ styles.filters }>
        <Filters />
      </div>
      <div className={ styles.paginated }>
        <Paginated />
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
                image={p.img[0]}
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