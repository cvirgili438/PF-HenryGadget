import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";


import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getProductsByQuery } from '../../../Redux/Actions/products.js';
import { changeMailingArchive, getAdminMailng, publishMailing } from '../../../Redux/Actions/mailing.js';

import styles from './MailingCRUD.module.css';


const MailingCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);

  const mailing = useSelector(state => state.mailing);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleChangeArchive = e => {
    dispatch(changeMailingArchive([e.target.value]));
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeMailingArchive(selected));
  };

  const handlePublish = e => {
    dispatch(publishMailing(e.target.value));
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
    dispatch(getAdminMailng())
  }, [dispatch]);


  return (
    <div className={ styles.container }>
      <div className={ styles.managebar }>
      <div>
          With {selected.length} selected: <Button text='Archive' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
        </div>
        <div>
          Filter by title: <Input type='text' name='mailing' value={input} onChange={ handleInputChange } />
        </div>
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>N°</th>
              <th>Select</th>
              <th>Title</th>
              <th>Content</th>
              <th>Created</th>
              <th>Published</th>
              <th>Publish</th>
              <th>Archive</th>
            </tr>
          </thead>
          <tbody>
          {
              mailing
              .filter(p => p.title.toLowerCase().includes(input.toLowerCase()))
              .map((p, i) => (
                <tr key={ p.id }>
                  <td>{ i + 1 }</td>
                  <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                  <td>{ p.title }</td>
                  <td>{ p.content }</td>
                  <td>{ p.created }</td>
                  <td>{ p.published }</td>
                  <td><Button text='Publish' onClick={ handlePublish } value={ p.id } /></td>
                  <td><Button text='Archive' onClick={ handleChangeArchive } value={ p.id } /></td>
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default MailingCRUD;