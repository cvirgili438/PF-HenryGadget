import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '@mui/material/Rating';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { changeCampaignArchive, getCampaigns, publishCampaign } from '../../../Redux/Actions/mailing.js';

import styles from './MailingCRUD.module.css';


const MailingCRUD = () => {
  const [input, setInput] = useState({
    filter: '',
    campaignTitle: '',
    campaignContent: ''
  });
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(null);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const campaigns = useSelector(state => state.campaigns);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeArchive = e => {
    dispatch(changeCampaignArchive([e.target.value]));
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeCampaignArchive(selected));
  };

  const handlePublish = e => {
    dispatch(publishCampaign(e.target.value));
  };

  const handleNew = e => {
    if (e.target.value === 0) {
      console.log('nueva desde cero')
    } else {
      console.log('nueva desde una copia')
      // dispatch(publishCampaign(e.target.value));
    }
  };

  const handleEdit = e => {
    console.log(e.target.value)
    // dispatch(publishCampaign(e.target.value));
  };

  
  const handleSubmitAllCampaigns = e => {
    setScore(null);
  };
  
  const handleSubmitFilterScore = e => {
    setScore(e.target.value);
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
    dispatch(getCampaigns())
  }, [dispatch]);


  return (
    <div className={ styles.container }>
      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="* required *" autoFocus name='campaignTitle' value={ input.campaignTitle } onChange={ handleInputChange } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} name='campaignContent' value={ input.campaignContent } onChange={ handleInputChange } />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Discard" onClick={ handleClose } />
          <Button text="Save/Create" onClick={ handleClose } />
        </Modal.Footer>
      </Modal>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: <Button text='Archive' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
        </div>
        <div>
          <Button text='New campaign' onClick={ handleShow } value='0' /> 
        </div>
        <div>
          Filter by title or content: <Input type='text' name='filter' value={ input.filter } onChange={ handleInputChange } />
        </div>
        <div>
          Filter by rating: <Rating name="rating" defaultValue='0' value={score === null ? 0 : score} precision={1} onChange={ handleSubmitFilterScore }/>
          <Button text='All' onClick={ handleSubmitAllCampaigns } />
        </div>
      </div>
      { 
        campaigns.length > 0 ?
          <div className={ styles.tableContainer }>
            <table className={ styles.table }>
            <thead>
              <tr>
                <th>N°</th>
                <th>Select</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created</th>
                <th>Size</th>
                <th>Success</th>
                <th>Sent</th>
                <th>Send</th>
                <th>Edit</th>
                <th>Archive</th>
              </tr>
            </thead>
            <tbody>
            {
              campaigns
              .filter(p => p.title.toLowerCase().includes(input.filter.toLowerCase())
                          ||
                          p.content.toLowerCase().includes(input.filter.toLowerCase()))
              .filter(p => score === null ? p : +p.rating === +score)
              .map((p, i) => (
                <tr key={ p.id }>
                  <td>{ i + 1 }</td>
                  <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                  <td>{ p.title }</td>
                  <td>{ p.content.substring(0, 150) }{ p.content.length > 150 ? `...` : <></> }</td>
                  <td>{ new Date(p.created).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }</td>
                  <td>{ p.contacts > 0 ? p.contacts : `n/a` }</td>
                  <td><Rating name="rating" defaultValue={ +p.rating } precision={1} readOnly='true' /></td>
                  <td>{ p.published ? `Sent` : `Not sent` }</td>
                  <td>{ p.published ? <></> : <Button text='Publish' onClick={ handlePublish } value={ p.id } /> }</td>
                  <td>{ p.published ? <Button text='New copy' onClick={ handleNew } value={ p.id } /> : <Button text='Edit' onClick={ handleEdit } value={ p.id } /> }</td>
                  <td><Button text='Archive' onClick={ handleChangeArchive } value={ p.id } /></td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      :
        <div className={ styles.emptyCrud }>No active campaigns</div>
      }  
    </div>
  );
};

export default MailingCRUD;