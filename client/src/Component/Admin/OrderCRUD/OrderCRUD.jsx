import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert2 from 'react-bootstrap/Alert';
import Alert from '@mui/material/Alert';

import IconButton from '@mui/material/IconButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Buttons/Button';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  getAdminOrders,
  changeOrderArchive,
  changeOrderStatus,
  deleteOrder,
  sendShippedToCustomer,
  changeOrderTrackingNumber
} from '../../../Redux/Actions/order.js';

import styles from './OrderCRUD.module.css';


const OrderCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState({archived: false});

  const [alert2, setAlert2] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [errorTrackNumber, setErrorTrackNumber] = useState(false);

  const user = useSelector(state => state.user)
  const [token, setToken] = useState('');
  const auth = getAuth();

  const orders = useSelector(state => state.orders);
  const responseServer = useSelector(state => state.lastMsg);

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

  const handleChangeTables = e => {
    if (mode.archived === true) {
      setMode({archived: false});
    } else {
      setMode({archived: true})
    }
    setSelected([]);
  };

  const handleChangeStatus = e => {
    dispatch(changeOrderStatus({id: e.target.value, archived: mode.archived, token: token}));
  };

  const handleChangeArchive = e => {
    dispatch(changeOrderArchive({ids: [e.target.value], archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeOrderArchive({ids: selected, archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handleSubmitDelete = e => {
    setDeleteId(e.target.value);
    setAlert2(true);
  };

  const handleConfirmDelete = (e) => {
    dispatch(deleteOrder({id: deleteId, archived: mode.archived, token: token}));
    setDeleteId(false);
    setAlert2(false);
    setSelected([]);
  }

  const handleCancelDelete = (e) => {
    setDeleteId(false);
    setAlert2(false);
  }

  const handleSendMail = e => {
    dispatch(sendShippedToCustomer({
      id: e.currentTarget.id,
      archived: mode.archived,
      token: token,
      subject: 'HenryGadget order shipped',
      text: `Hi ${
        orders.filter(p => p.id === e.currentTarget.id )[0].user.displayName
        }, your order ${
          e.currentTarget.id
        } has been shipped.`,
      email: orders.filter(p => p.id === e.currentTarget.id )[0].user.email
    }));
  }

  const saveTrackNumber = e => {
    dispatch(
      changeOrderTrackingNumber({ id: e.target.value, archived: mode.archived, trackingNumber: e.target.previousElementSibling.value, token: token })
      );
  };

  const handletrackNumber = (e, id) => {
    if (!e.target.value.match(/^[a-zA-Z0-9]*$/))
      setErrorTrackNumber({
        ...errorTrackNumber,
        [id]: true
      });
    else
      setErrorTrackNumber({
        ...errorTrackNumber,
        [id]: false
      });
  };

  useEffect(() => {
    dispatch(getAdminOrders(mode))

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
          You are about to delete order <i>'{deleteId ? orders.filter(p => p.id === deleteId )[0].trackingNumber : <></>}'</i>.<br />Do you want to proced? (this action <b>can not be undone</b>)
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button text="CANCEL" onClick={ handleCancelDelete } />
          <Button text="Ok, delete!" onClick={ handleConfirmDelete } />
        </div>
      </Alert2>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: <Button text='Archive' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
        </div>
        <div>
          Filter by tracking id: <Input type='text' name='order' value={input} onChange={ handleInputChange } />
        </div>
        Viewing {orders.filter(p => p.trackingNumber.toLowerCase().includes(input.toLowerCase())).length} orders
        <div>
          <Button text={ mode.archived ? 'View current' : 'View archived' } onClick={ handleChangeTables } /> 
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
                <th>Tracking Number</th>
                <th>To user</th>
                <th>Total</th>
                <th colSpan={3}>Status</th>
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
                orders
                .filter(p => p.trackingNumber.toLowerCase().includes(input.toLowerCase()))
                .map((p, i) => (
                  <tr key={ p.id }>
                    <td>{ i + 1 }</td>
                    <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                    <td>
                      <input defaultValue={p.trackingNumber} onChange={e => handletrackNumber(e, p.id)} size='5'/>
                      <Button text='Save' onClick={ saveTrackNumber } value={ p.id } disabled={errorTrackNumber[p.id]}/>
                    </td>
                    <td>{ p.user.displayName } - { p.user.email }</td>
                    <td>{ p.total }</td>
                    <td>
                      { p.status.toUpperCase() }&nbsp;
                      { p.status === 'shipped' ?
                          p.sentMailToCustomer === 0 ?
                          <IconButton onClick={ handleSendMail } id={ p.id } title='Send email to customer'>
                            <ContactMailIcon />
                          </IconButton>
                          :
                          <IconButton onClick={ handleSendMail } id={ p.id } title={`${p.sentMailToCustomer} email/s already sent to customer... click to send again`}>
                            <MarkEmailReadIcon />
                          </IconButton>
                        :
                        null }
                      </td>
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
                      <Button text='Change' onClick={ handleChangeStatus } value={ p.id } />
                    </td>
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
        <div className={ styles.emptyCrud }>No {mode.archived ? 'archived' : 'current'} active orders</div>
        }

      {responseServer.includes('succesfuly') ?
        <Alert severity="success" sx={{ alignItems: 'center' }}>
          <p className={`${styles.p}`}>The order was updated succesfuly.</p>
        </Alert> : null}
      {responseServer.includes('error') ?
        <Alert severity="error" sx={{ alignItems: 'center' }}>
          <p className={`${styles.p}`}>An error has occurred.</p>
        </Alert> : null}
    </div>
  );
};

export default OrderCRUD;