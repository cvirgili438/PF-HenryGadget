import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";


import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Button from '../Button/Button';

import { getProductsByQuery, deleteProduct } from '../../Redux/Action';


import styles from './ProductCRUD.module.css';


const ProductCRUD = () => {
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
      <div className={ styles.statistics }>
        <div className={ styles.statisticsCard}>
          <div className={ styles.statisticsCardTitle }>Total products</div>
          <div className={ styles.statisticsCardContent }>{ products.length }</div>
        </div>
        <div className={ styles.statisticsCard}>
          <div className={ styles.statisticsCardTitle }>In stock</div>
          <div className={ styles.statisticsCardContent }>{ products.reduce((a, b) => { if (b.stock > 0) { return a + 1 } return a; }, 0) }</div>
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
              <th>Select</th>
              <th>Image</th>
              <th>Name</th>
              <th>Availability</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Type</th>
              <th>Camera</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Last updated</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              products
              .filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
              .map(p => (
                <tr key={ p.id }>
                  <td><Checkbox name={ p.id } onChange={ handleInputProducts } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                  <td><img src={ p.img[0] } alt={ p.name } className={ styles.productImage } /></td>
                  <td>{ p.name }</td>
                  <td><span className={ `${ styles.available } ${ p.stock === 0 ? styles.textNO : p.stock < 10 ? styles.textLOW : styles.textYES} ` }>
                    { p.stock === 0 ? `NO` : p.stock < 10 ? `LOW` : `YES` }</span>
                    </td>
                  <td>{ p.brand.name }</td>
                  <td>{ p.model }</td>
                  <td>{ p.typeID }</td>
                  <td>{ p.camera }</td>
                  <td>{ p.description }</td>
                  <td>$ { p.price.toLocaleString() }</td>
                  <td>{ p.typeID }</td>
                  <td>-</td>
                  <td>{ p.stock }</td>
                  <td>-</td>
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