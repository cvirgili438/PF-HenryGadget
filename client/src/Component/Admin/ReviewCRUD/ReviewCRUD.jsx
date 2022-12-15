import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getProductsByQuery, deleteProduct } from '../../../Redux/Actions/products.js';


import styles from './ReviewCRUD.module.css';

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
              <th>From</th>
              <th>Location</th>
              <th>Product</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Suspend</th>
              
            </tr>
          </thead>
          <tbody>
            {
              // products
              // .filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
              [1,2,3,4,5].map(p => (
                <tr key={ p }>
                  <td>{ p }</td>
                  <td><Checkbox name={ p } onChange={ handleInputProducts } defaultChecked={selected.includes(p) ? true : false}/></td>
                  <td>{ ['Alex', 'Marty', 'Melman', 'Gloria'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['Argentina', 'Colombia', 'Chile', 'Ecuador'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['iPhone 12', 'Airpods', 'Tablet motomoto', 'Cargador'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['Espectacular', 'Una porqueria', 'Lo quiero', 'No compren en HenryGadget son estafadores'][Math.floor(Math.random() * 4)] }</td>
                  <td>
                    {/* <Stack spacing={1}> */}
                      <Rating name="rating" defaultValue={ p } precision={1} readOnly='true' />
                      {/* </Stack> */}
                      </td>
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