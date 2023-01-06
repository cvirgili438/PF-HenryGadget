import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import Switch from '@mui/material/Switch';

import Alert2 from 'react-bootstrap/Alert';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  getAdminProducts,
  deleteProduct,
  changeProductActive,
  changeProductArchive
} from '../../../Redux/Actions/products.js';

import styles from './ProductCRUD.module.css';


const ProductCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState({archived: false});
  const low = 10; // esto podria venir de la DB configuracion del sitio

  const [alert2, setAlert2] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const user = useSelector(state => state.user)
  const [token, setToken] = useState('');
  const auth = getAuth();

  const products = useSelector(state => state.products);

  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleSubmitDelete = e => {
    setDeleteId(e.target.value);
    setAlert2(true);
  };

  const handleConfirmDelete = (e) => {
    dispatch(deleteProduct({id: deleteId, archived: mode.archived, token: token}));
    setDeleteId(false);
    setAlert2(false);
    setSelected([]);
  }

  const handleCancelDelete = (e) => {
    setDeleteId(false);
    setAlert2(false);
  }

  const handleChangeArchive = e => {
    dispatch(changeProductArchive({ids: [e.target.value], archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeProductArchive({ids: selected, archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handleChangeActive = e => {
    dispatch(changeProductActive({ids: [e.target.id], archived: mode.archived, token: token}));
  };

  const handleSubmiteMultipleActive = e => {
    dispatch(changeProductActive({ids: selected, archived: mode.archived, token: token}));
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

  const handleChangeTables = e => {
    if (mode.archived === true) {
      setMode({archived: false});
    } else {
      setMode({archived: true})
    }
    setSelected([]);
  };

  useEffect(() => {
    dispatch(getAdminProducts(mode))

    onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((result) => {
					setToken(result);
				});
			}
		});

  }, [dispatch, mode, auth]);

  return (
    <div className={ styles.container }>
      <Alert2 show={alert2} variant="danger">
        <Alert2.Heading>Danger</Alert2.Heading>
        <p>
          You are about to delete product <i>'{deleteId ? products.filter(p => p.id === deleteId )[0].name : <></>}'</i>.<br />Do you want to proced? (this action <b>can not be undone</b>)
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button text="CANCEL" onClick={ handleCancelDelete } />
          <Button text="Ok, delete!" onClick={ handleConfirmDelete } />
        </div>
      </Alert2>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected:
          <Button text={ mode.archived ? 'Restore' : 'Archive' } disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
          {
            !mode.archived ?
            <Button text='Active/suspend' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleActive }/>
            :
            <></>
          }
        </div>
        <div>
          Filter by brand, name, model or price: <Input type='text' name='name' value={input} onChange={ handleInputChange } />
        </div>
        Viewing {products
          .filter(p => p.name.toLowerCase().includes(input.toLowerCase())
                      ||
                      p.model.toLowerCase().includes(input.toLowerCase())
                      ||
                      p.price.toString().toLowerCase().includes(input.toLowerCase()))
          .length} products
        {
          !mode.archived ?
          <Link to='/admin/createproduct' >
            < Button text='Create Product'  />
          </Link> 
          :
          <></>
        }
        <div>
          <Button text={ mode.archived ? 'View current' : 'View archived' } onClick={ handleChangeTables } /> 
        </div>
      </div>
      {
        products.length > 0 ?
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
                {
                  !mode.archived ?
                  <th>Active</th>
                  :
                  <></>
                }
                <th>Edit</th>
                <th>{ !mode.archived ? 'Archive' : 'Restore' }</th>
                {
                  mode.archived ?
                  <th>Delete</th>
                  :
                  <></>
                }
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
                      { p.stock === 0 ? `NO` : p.stock < low ? `LOW` : `YES` }</span>
                      </td>
                    {
                      !mode.archived ?
                      <td><Switch checked={ p.active } onChange={ handleChangeActive } id={ p.id } /></td>
                      :
                      <></>
                    }
                    <td><Link to={`/edit/${p.id}`}><Button text='Edit' /></Link></td>
                    <td><Button text={mode.archived ? 'Restore' : 'Archive'} onClick={ handleChangeArchive } value={ p.id } /></td>
                    {
                      mode.archived ?
                      <td><Button text='Delete' onClick={ handleSubmitDelete } value={ p.id } /></td>
                      :
                      <></>
                    }
                  </tr>
                ))
              }
              </tbody>
          </table>
        </div>
        :
        <div className={ styles.emptyCrud }>No {mode.archived ? 'archived' : 'current'} products</div>
      } 
    </div>
  );
};

export default ProductCRUD;