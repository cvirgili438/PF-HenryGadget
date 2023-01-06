import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from '@mui/material/Switch';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import {
  getUsers,
  changeUserActive,
  changeUserAdmin
} from '../../../Redux/Actions/users';

import styles from './UserCRUD.module.css';

const UserCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const users = useSelector(state => state.users);
  console.log(users)
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleChangeActive = e => {
    dispatch(changeUserActive([e.target.id]));
  };

  const handleSubmiteMultipleActive = e => {
    dispatch(changeUserActive(selected));
  };

  const handleChangeAdmin = e => {
    dispatch(changeUserAdmin(e.target.id));
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
          With {selected.length} selected: <Button text='Active/suspend' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleActive }/>
        </div>
        <div>
          Filter by name or locations: <Input type='text' name='user' value={input} onChange={ handleInputChange } />
        </div>
        Viewing {users.filter(p => p.displayName.toLowerCase().includes(input.toLowerCase())
                            ||
                            p.email.toLowerCase().includes(input.toLowerCase())).length} users
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>N°</th>
              <th>Select</th>
              <th>uid</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Active</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {
              users
              .filter(p => p.displayName.toLowerCase().includes(input.toLowerCase())
                            ||
                            p.email.toLowerCase().includes(input.toLowerCase()))
              .map((p, i) => (
                <tr key={ p.uid }>
                  <td>{ i + 1 }</td>
                  <td><Checkbox name={ p.uid } onChange={ handleInputUsers } defaultChecked={selected.includes(p.uid) ? true : false}/></td>
                  <td>{ p.uid }</td>
                  <td><img src={ p.photoURL } alt={ p.displayName } className={ styles.productImage } /></td>
                  <td>{ p.displayName }</td>
                  <td>{ p.email }</td>
                  <td><Switch checked={ p.active } onChange={ handleChangeActive } id={ p.uid } /></td>
                  <td><Switch checked={ p.rol === 'admin' ? true : false } onChange={ handleChangeAdmin } id={ p.uid } /></td>
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