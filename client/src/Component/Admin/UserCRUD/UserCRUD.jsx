import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import Switch from '@mui/material/Switch';


import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getProductsByQuery, deleteProduct } from '../../../Redux/Actions/products.js';


import styles from './UserCRUD.module.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const UserCRUD = () => {
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
          <Button text='Create Product'  />
        </Link> 
        <Button text='Back to admin' />
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>ID</th>
              <th>Select</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Suspend</th>
              
            </tr>
          </thead>
          <tbody>
            {
              // products
              // .filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
              [1,2,3,4,5,6,7,8,9].map(p => (
                <tr key={ p }>
                  <td>{ p }</td>
                  <td><Checkbox name={ p } onChange={ handleInputProducts } defaultChecked={selected.includes(p) ? true : false}/></td>
                  <td><img src='https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png' alt={ p } className={ styles.productImage } /></td>
                  <td>{ p }</td>
                  <td>{ p }</td>
                  <td>Argentina</td>
                  <td>{ Math.floor(Math.random() * 5) }</td>
                  <td><Switch {...label} defaultChecked /></td>
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCRUD;