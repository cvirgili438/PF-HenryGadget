import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";


import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getProductsByQuery, deleteProduct } from '../../../Redux/Actions/products.js';


import styles from './OrderCRUD.module.css';


const MailingCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const products = useSelector(state => state.filteredProducts);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleSubmitDelete = async e => {
    await dispatch(deleteProduct(e.target.value));
    await dispatch(getProductsByQuery(`?limit=20&offset=0`))
  };

  // const handleInputChange = (e) => {
  //   dispatch(setPageView(e.target.value));
  //   queryNew.limit = productsPerPage;
  //   queryNew.offset = e.target.value * productsPerPage - productsPerPage;
  //   let string = objectToQuery(queryNew);
  //   dispatch(getProductsByQuery(`?${string}`));
  //   history.push(`?${string}`);
  // }

  const handleInputProducts = e => {
    if (e.target.checked) {
      if (selected.indexOf(e.target.name) === -1) {
        setSelected([...selected, e.target.name]);
      }
    } else {
      setSelected(selected.filter(item => item !== e.target.name));
    }

  };

  useEffect(() => {
    dispatch(getProductsByQuery(`?limit=20&offset=0`))
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(setPageView((offset / productsPerPage) + 1))
  //   if(totalProducts < productsPerPage) {
  //     dispatch(setPageView(1))
  //   }
  //   if (page > pages) {
  //     dispatch(setPageView(pages))
  //   }
  //   setShownPages(stripedPagination(pages, page, maxPages))
  // }, [products, page, totalProducts, pages, limit, offset, dispatch]);

  return (
    <div className={ styles.container }>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: { selected.length <= 3 ?
            <>
              <Button text='To landing' disabled={true} />
              {/* <Button text='Suspend' /> */}
              <Button text='Delete' disabled={true} />
            </>
            :
            null }
        </div>
        <div>
          Filter by name: <Input type='text' name='country' value={input} onChange={handleInputChange} />
        </div>
        <Link to='/Create/Product' >
          <Button text='Create Package'  />
        </Link> 
        <Button text='Back to admin' />
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>Select</th>
              <th>Order nro</th>
              <th>Cost</th>
              <th>Deliver to</th>
              <th>State</th>
              <th>Deliver</th>
            </tr>
          </thead>
          <tbody>
            {
              // products
              // .filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
              [1,2,3,4,5].map(p => (
                <tr key={ p }>
                  <td><Checkbox name={ p } onChange={ handleInputProducts } defaultChecked={selected.includes(p) ? true : false}/></td>
                  <td>{ p }</td>
                  <td>{ ['$ 540.00', '$ 200.00', '$ 600.00', '$ 25.00'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['Pasaje Rey Julien 333, CABA', 'Av. Maurice 123, Cordoba', 'La Luna', 'Av. Siempreviva 742, Springfield'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['Opened', 'For Payment', 'Payed'][Math.floor(Math.random() * 3)] }</td>
                  <td><Button text='Deliver' onClick={ handleSubmitDelete } value={ p } /></td>
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default MailingCRUD;