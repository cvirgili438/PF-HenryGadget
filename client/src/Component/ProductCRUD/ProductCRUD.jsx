// US05: como ADMIN poder crear y editar productos, con nombre, descripción, precio y uno o más fotos,
// tal que los visitantes puedan ver la última información de lo que se vende

import React, { useState } from 'react';
import { useSelector } from 'react-redux';


import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './ProductCRUD.module.css';


const ProductCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const products = useSelector(state => state.filteredProducts);

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleInputProducts = e => {
    if (e.target.checked) {
      if (selected.indexOf(e.target.name) === -1) {
        setSelected([...selected, e.target.name]);
      }
    } else {
      setSelected(selected.filter(item => item !== e.target.name));
    }
  };

  return (
    <div className={ styles.container }>
      <div className={ styles.statistics }>
        <div className={ styles.statisticsCard}>
          <div className={ styles.statisticsCardTitle }>Total products</div>
          <div className={ styles.statisticsCardContent }>{ products.length }</div>
        </div>
        <div className={ styles.statisticsCard}>
          <div className={ styles.statisticsCardTitle }>In stock</div>
          <div className={ styles.statisticsCardContent }>{ products.length }</div>
        </div>
        <div className={ styles.statisticsCard}>
          <div className={ styles.statisticsCardTitle }>Total items</div>
          <div className={ styles.statisticsCardContent }>{ products.reduce((a, b) => { return a + b.stock}, 0) }</div>
        </div>
        <div className={ styles.statisticsCard}>
          <div className={ styles.statisticsCardTitle }>Suspended</div>
          <div className={ styles.statisticsCardContent }>0</div>
        </div>
      </div>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: { selected.length <= 3 ? <Button text='To landing' /> : null } <Button text='Suspend' /> <Button text='Delete' />
        </div>
        <div>
          Filter by name: <Input type='text' name='country' value={input} onChange={handleInputChange} />
        </div>
        <Button text='Add new product' /> <Button text='Back to admin' />
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>Select</th>
              <th>Image</th>
              <th>Name</th>
              <th>ID</th>
              <th>Availability</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Type</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Last updated</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              products
              .filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
              .map(p => (
                <tr key={ p.id }>
                  <td><Checkbox name={ p.id } onChange={handleInputProducts} defaultChecked={selected.includes(p.id) ? true : false}/></td>
                  <td><img src={ p.img[0] } alt={ p.name } className={ styles.productImage } /></td>
                  <td>{ p.name }</td>
                  <td>{ p.id }</td>
                  <td><span className={ `${ styles.available } ${ p.stock === 0 ? styles.textNO : p.stock < 10 ? styles.textLOW : styles.textYES} ` }>
                    { p.stock === 0 ? `NO` : p.stock < 10 ? `LOW` : `YES` }</span>
                    </td>
                  <td>{ p.brand }</td>
                  <td>{ p.model }</td>
                  <td>{ p.type }</td>
                  <td>$ { p.price.toLocaleString() }</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{ p.stock }</td>
                  <td>-</td>
                  <td><Button text='Edit' /></td>
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