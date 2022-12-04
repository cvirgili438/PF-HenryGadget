// US05: como ADMIN poder crear y editar productos, con nombre, descripción, precio y uno o más fotos,
// tal que los visitantes puedan ver la última información de lo que se vende

import React, { useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './ProductCRUD.module.css';

let products = [
  {
      id: 1,
      brand: 'Apple',
      name: 'Airpods',
      price: 100,
      model: 'Apple AirPods Pro',
      type: 'headphones',
      stock: 10,
      img: ['https://http2.mlstatic.com/D_NQ_NP_667877-MCO50292509021_062022-O.webp']
  },
  {
    id: 2,
      brand: 'Lenovo',
      name: 'Lenovo LivePods',
      price: 70,
      model: 'LP40',
      type: 'headphones',
      stock: 10,
      img: ['https://http2.mlstatic.com/D_NQ_NP_958613-MLA46481706067_062021-O.webp']
  },
  {
    id: 3,
      brand: 'Motorola',
      name: 'Motorola Buds 120',
      price: 120,
      model: 'Buds 120',
      type: 'headphones',
      stock: 3,
      img: ['https://motorolaus.vtexassets.com/arquivos/ids/162201-800-auto',
          'https://motorolaus.vtexassets.com/arquivos/ids/162202-800-auto']
  },
  {
    id: 4,
      brand: 'Xiaomi Redmi',
      name: 'Xiaomi Redmi Note 12 Pro+',
      price: 500,
      model: 'Note 12 Pro+',
      type: 'smartphones',
      stock: 13,
      img: ['https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12-pro-plus-1.jpg',
          'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12-pro-plus-2.jpg']
  },
  {
    id: 5,
      brand: 'Xiaomi Poco',
      name: 'Xiaomi Poco X4 Pro 5G',
      price: 500,
      model: 'X4 Pro 5G',
      type: 'smartphones',
      stock: 4,
      img: ['https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x4-pro-1.jpg',
          'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x4-pro--.jpg']
  },
  {
    id: 6,
      brand: 'Asus',
      name: 'Asus ROG Phone 6',
      price: 500,
      model: 'ROG Phone 6',
      type: 'smartphones',
      stock: 4,
      img: ['https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone6-01.jpg',
          'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone6-02.jpg']
  },
  {
    id: 7,
      brand: 'Nokia',
      name: 'Nokia X30',
      price: 501,
      model: 'X30',
      type: 'smartphones',
      stock: 6,
      img: ['https://fdn2.gsmarena.com/vv/pics/nokia/nokia-x30-5g-1.jpg',
          'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-x30-5g-2.jpg']
  },
  {
    id: 8,
      brand: 'Cat',
      name: 'Cat S62',
      price: 501,
      model: 'S62',
      type: 'smartphones',
      stock: 2,
      img: ['https://fdn2.gsmarena.com/vv/pics/cat/cat-s62-1.jpg',
          'https://fdn2.gsmarena.com/vv/pics/cat/cat-s62-2.jpg']
  },
  {
    id: 9,
      brand: 'vivo',
      name: 'vivo X90',
      price: 501,
      model: 'x90',
      type: 'smartphones',
      stock: 0,
      img: ['https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-1.jpg',
          'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-2.jpg']
  },
  {
    id: 10,
      brand: 'ZTE',
      name: 'ZTE Axon 40 SE',
      price: 600,
      model: 'Axon 40 SE',
      type: 'smartphones',
      stock: 1,
      img: ['https://fdn2.gsmarena.com/vv/pics/zte/blade-v40s-00.jpg',
          'https://fdn2.gsmarena.com/vv/pics/zte/zte-axon-40-se-2.jpg']
  },
  {
    id: 11,
      brand: 'OnePlus',
      name: 'OnePlus Ace Pro',
      price: 600,
      model: 'Ace Pro',
      type: 'smartphones',
      stock: 16,
      img: ['https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10t-5g-1.jpg',
          'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10t-5g-2.jpg']
  },
]


const ProductCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

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