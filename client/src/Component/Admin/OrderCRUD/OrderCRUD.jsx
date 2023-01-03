import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Tooltip } from '@mui/material';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getAdminOrders, changeOrderArchive, changeOrderStatus } from '../../../Redux/Actions/order.js';

import styles from './OrderCRUD.module.css';


const OrderCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const orders = useSelector(state => state.orders);

  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
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

  const handleChangeStatus = e => {
    dispatch(changeOrderStatus(e.target.value));
  };

  const handleChangeArchive = e => {
    dispatch(changeOrderArchive([e.target.value]));
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeOrderArchive(selected));
  };

  useEffect(() => {
    dispatch(getAdminOrders())
  }, [dispatch]);

  return (
    <div className={ styles.container }>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: <Button text='Archive' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
        </div>
        <div>
          Filter by tracking id: <Input type='text' name='order' value={input} onChange={ handleInputChange } />
        </div>
      </div>
      {
        orders.length > 0 ?
        <div className={ styles.tableContainer }>
          <table className={ styles.table }>
            <thead>
              <tr>
                <th>N°</th>
                <th>Select</th>
                <th>Order</th>
                <th>To user</th>
                <th>Total</th>
                <th colSpan={3}>Status</th>
                <th>Archive</th>
              </tr>
            </thead>
            <tbody>
              {
                orders
                .filter(p => p.trackingNumber.toLowerCase().includes(input.toLowerCase()))
                .map((p, i) => (
                  <tr key={ p.id }>
                    <td>{ i + 1 }</td>
                    <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                    <td>{ p.trackingNumber }</td>
                    <td>{ p.user.uid }</td>
                    <td>{ p.total }</td>
                    <td>{ p.status.toUpperCase() }</td>
                    <td>
                      {
                        p.status === 'processing' ? <LockOpenIcon /> :
                        p.status === 'packed' ? <LockIcon /> :
                        p.status === 'delayed' ? <MoreTimeIcon /> :
                        p.status === 'shipped' ? <LocalShippingIcon /> :
                        p.status === 'canceled' ? <CancelIcon /> : <DoneIcon />
                      }
                      </td>
                    <td>
                    {/* <Tooltip title="Change order status">
                      <IconButton component="button" onClick={ handleChangeStatus } value={ p.id } >
                        <PhotoCamera />
                      </IconButton>
                    </Tooltip> */}
                    <Button text='Change' onClick={ handleChangeStatus } value={ p.id } />
                    </td>
                    <td><Button text='Archive' onClick={ handleChangeArchive } value={ p.id } /></td>
                  </tr>
                ))
              }
              </tbody>
          </table>
        </div>
        :
        <div className={ styles.emptyCrud }>No active orders</div>
        }
    </div>
  );
};

export default OrderCRUD;