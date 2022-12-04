import React from 'react';
import Product from '../Product/Product';
import Filters from '../Filters/Filters';

import styles from './Products.module.css';

import testJSON from './testJSON.json';
import Paginated from '../Paginated/Paginated';

const Products = () => {

  return (
    <div className={ styles.container }>
      <Filters/>
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
      <Paginated />
    </div>
  );
};

export default Products;