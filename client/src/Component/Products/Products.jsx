import React from 'react';
import Product from '../Product/Product';

import styles from './Products.module.css';

import testJSON from './testJSON.json';

const Products = () => {

  return (
    <div className={ styles.container }>
      {
        testJSON.length > 0
        ?
        (
          testJSON.map((p, i) => {
            return (
              <Product
              key={i}
              id={i}
              name={p.name}
              description={p.description}
              image={p.image}
              price={p.price}
              units_left={p.units_left}
              />
            )
          })
        )
        :
        <div className={ styles.noProducts }>No products available</div>
      }
    </div>
  );
};

export default Products;