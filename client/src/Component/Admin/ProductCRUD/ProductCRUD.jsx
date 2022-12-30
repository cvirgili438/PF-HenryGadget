import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import Switch from '@mui/material/Switch';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getAdminProducts, deleteProduct, changeProductActive } from '../../../Redux/Actions/products.js';


import styles from './ProductCRUD.module.css';


const ProductCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const products = useSelector(state => state.products);

  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleSubmitDelete = e => {
    dispatch(deleteProduct(e.target.value));
  };

  const handleChangeActive = e => {
    dispatch(changeProductActive([e.target.id]));
  };

  const handleSubmiteMultipleActive = e => {
    dispatch(changeProductActive(selected));
  };

  const handleCheckboxes = e => {
    if (e.target.checked) {
      if (selected.indexOf(e.target.name) === -1) {
        setSelected([...selected, e.target.name]);
      }
    } else {
      setSelected(selected.filter(item => item !== e.target.name));
    }

  };

  useEffect(() => {
    dispatch(getAdminProducts())
  }, [dispatch]);

  return (
    <div className={ styles.container }>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: <Button text='Active/suspend' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleActive }/>
        </div>
        <div>
          Filter by brand, name, model or price: <Input type='text' name='name' value={input} onChange={ handleInputChange } />
        </div>
        <Link to='/Create/Product' >
          <Button text='Create Product'  />
        </Link> 
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>N°</th>
              <th>Select</th>
              <th>Image</th>
              <th>Name</th>
              <th>Model</th>
              <th>Price</th>
              {/* <th>Discount</th> */}
              <th>Stock</th>
              <th>Availability</th>
              <th>Active</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              products
              .filter(p => p.name.toLowerCase().includes(input.toLowerCase())
                          ||
                          p.model.toLowerCase().includes(input.toLowerCase())
                          ||
                          p.price.toString().toLowerCase().includes(input.toLowerCase()))
              .map((p, i) => (
                <tr key={ p.id }>
                  <td>{ i + 1 }</td>
                  <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                  <td><img src={ p.img[0] } alt={ p.name } className={ styles.productImage } /></td>
                  <td>{ p.name }</td>
                  <td>{ p.model }</td>
                  <td>$ { p.price.toLocaleString() }</td>
                  <td>{ p.stock }</td>
                  <td><span className={ `${ styles.available } ${ p.stock === 0 ? styles.textNO : p.stock < 10 ? styles.textLOW : styles.textYES} ` }>
                    { p.stock === 0 ? `NO` : p.stock < 10 ? `LOW` : `YES` }</span>
                    </td>
                  <td><Switch checked={ p.active } onChange={ handleChangeActive } id={ p.id } /></td>
                  <td><Link to={`/edit/${p.id}`}><Button text='Edit' /></Link></td>
                  <td><Button text='Delete' onClick={ handleSubmitDelete } value={ p.id } /></td>
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCRUD;