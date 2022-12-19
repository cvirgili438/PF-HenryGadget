import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from '@mui/material/Switch';


import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getUsers } from '../../../Redux/Actions/users';

import styles from './UserCRUD.module.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const UserCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const users = useSelector(state => state.users);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleSubmitDelete = async e => {
    // await dispatch(deleteProduct(e.target.value));
    // await dispatch(getProductsByQuery(`?limit=20&offset=0`))
  };


  const handleInputUsers = e => {
    if (e.target.checked) {
      if (selected.indexOf(e.target.name) === -1) {
        setSelected([...selected, e.target.name]);
      }
    } else {
      setSelected(selected.filter(item => item !== e.target.name));
    }

  };

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);

  return (
    <div className={ styles.container }>
      
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: { selected.length <= 3 ?
            <>
              <Button text='Suspend' disabled={true} />
            </>
            :
            null }
        </div>
        <div>
          Filter by name: <Input type='text' name='user' value={input} onChange={handleInputChange} />
        </div>
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
              users
              .filter(p => p.uid.toLowerCase().includes(input.toLowerCase()))
              .map((p, i) => (
                <tr key={ p.uid }>
                  <td>{ i + 1 }</td>
                  <td><Checkbox name={ p.uid } onChange={ handleInputUsers } defaultChecked={selected.includes(p.uid) ? true : false}/></td>
                  <td><img src='https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png' alt={ p.uid } className={ styles.productImage } /></td>
                  <td>{ p.uid }</td>
                  <td>{ p.uid }</td>
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