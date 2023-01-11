import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '@mui/material/Rating';
import { Editor } from "@tinymce/tinymce-react";

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Alert2 from 'react-bootstrap/Alert';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Buttons/Button';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  changeCampaignArchive,
  getCampaigns,
  publishCampaign,
  createCampaign,
  updateCampaign,
  changeCampaignRaiting,
  deleteCampaign
} from '../../../Redux/Actions/mailing.js';

import styles from './MailingCRUD.module.css';


const MailingCRUD = () => {
  const [input, setInput] = useState({
    filter: '',
    campaignTitle: '',
    campaignContent: '',
    id: false,
    new: false
  });
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(null);
  const [mode, setMode] = useState({archived: false});
  
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [publishId, setPublishId] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  
  const campaigns = useSelector(state => state.campaigns);
  const mails = useSelector(state => state.mails);
  
  const user = useSelector(state => state.user)
  const [token, setToken] = useState('');
  const auth = getAuth();

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setInput({
      ...input,
      id: false,
      new: false,
      campaignTitle: '',
      campaignContent: ''
    });
    setShow(false);
  }
  
  const handleShowModal = (e) => {
    if (e.target.value !== '0') {
      setInput({
        ...input,
        new: false,
        id: e.target.value,
        campaignTitle: campaigns.filter(p => p.id === e.target.value )[0].title,
        campaignContent: campaigns.filter(p => p.id === e.target.value )[0].content
      });
    } else {
      setInput({
        ...input,
        id: false,
        new: false,
        campaignTitle: '',
        campaignContent: ''
      });
    }
    setShow(true);
  };

  const handleNewCopy = (e) => {
    setInput({
      ...input,
      new: true,
      id: e.target.value,
      campaignTitle: campaigns.filter(p => p.id === e.target.value )[0].title,
      campaignContent: campaigns.filter(p => p.id === e.target.value )[0].content
    });
    setShow(true);
  };

  const handleSaveModal = (e) => {
    if (input.id) {
      if (!input.new) {
        dispatch(updateCampaign({title: input.campaignTitle, content: input.campaignContent, id: input.id, mode: mode, token: token}));
        setShow(false);
      } else {
        dispatch(createCampaign({title: input.campaignTitle, content: input.campaignContent, token: token}));
        setShow(false);
      }
    } else {
      dispatch(createCampaign({title: input.campaignTitle, content: input.campaignContent, token: token}));
      setShow(false);
    }
  }
  
  const handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitDelete = e => {
    setDeleteId(e.target.value);
    setAlert2(true);
  };

  const handleConfirmDelete = (e) => {
    dispatch(deleteCampaign({id: deleteId, archived: mode.archived, token: token}));
    setDeleteId(false);
    setAlert2(false);
    setSelected([]);
  }

  const handleCancelDelete = (e) => {
    setDeleteId(false);
    setAlert2(false);
  }

  const handleChangeArchive = e => {
    dispatch(changeCampaignArchive({ids: [e.target.value], archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeCampaignArchive({ids: selected, archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handlePublish = e => {
    setPublishId(e.target.value);
    setAlert(true);
  };

  const handleConfirmPublish = (e) => {
    dispatch(publishCampaign({
      id: publishId,
      subject: campaigns.filter(p => p.id === publishId )[0].title,
      text: campaigns.filter(p => p.id === publishId )[0].content,
      token: token
    }));
    setPublishId(false);
    setAlert(false);
  }

  const handleCancelPublish = (e) => {
    setPublishId(false);
    setAlert(false);
  }
  
  const handleSubmitAllCampaigns = e => {
    setScore(null);
  };
  
  const handleChangeTables = e => {
    if (mode.archived === true) {
      setMode({archived: false});
    } else {
      setMode({archived: true})
    }
    setSelected([]);
  };

  const handleSubmitFilterScore = e => {
    setScore(e.target.value);
  };

  const handleRating = (e) => {
    dispatch(changeCampaignRaiting({id: e.target.name, value: e.target.value, mode: mode, token: token}))
    
  }

  const handleCheckboxes = e => {
    if (e.target.checked) {
      if (selected.indexOf(e.target.name) === -1) {
        setSelected([...selected, e.target.name]);
      }
    } else {
      setSelected(selected.filter(item => item !== e.target.name));
    }
  };

  const handleChange = (content, editor) => {
    setInput({
      ...input,
      campaignContent: content
    });
  }

  useEffect(() => {
    dispatch(getCampaigns(mode))
    
    onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((result) => {
					setToken(result);
				});
			}
		});
    
  }, [dispatch, mode, token, auth]);


  return (
    <div className={ styles.container }>
      <Modal show={show} onHide={ handleCloseModal } size="lg">
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
              <Editor
                apiKey='9ju8stu224tmneh7mkv47tvbpez050e351zdc5tqsky6z86r'
                value={ input.campaignContent }
                init={{
                  height: 400,
                  menubar: true,
                  toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat'
                }}
                onEditorChange={ handleChange }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Discard" onClick={ handleCloseModal } />
          <Button text={ input.new ? `Create` : `Save` } onClick={ handleSaveModal } />
        </Modal.Footer>
      </Modal>
      <Alert show={alert} variant="warning">
        <Alert.Heading>Warning</Alert.Heading>
        <p>
          You are about to send aprox. {mails} e-mails.<br />Do you want to proced? (this action <b>can not be undone</b>)
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button text="CANCEL" onClick={ handleCancelPublish } />
          <Button text="Ok, proced!" onClick={ handleConfirmPublish } />
        </div>
      </Alert>
      <Alert2 show={alert2} variant="danger">
        <Alert2.Heading>Danger</Alert2.Heading>
        <p>
          You are about to delete campaign <i>'{deleteId ? campaigns.filter(p => p.id === deleteId )[0].title : <></>}'</i>.<br />Do you want to proced? (this action <b>can not be undone</b>)
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button text="CANCEL" onClick={ handleCancelDelete } />
          <Button text="Ok, delete!" onClick={ handleConfirmDelete } />
        </div>
      </Alert2>
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: <Button text={ mode.archived ? 'Restore' : 'Archive' } disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
        </div>
        {
          !mode.archived ?
          <div>
            <Button text='New campaign' onClick={ handleShowModal } value='0' /> 
          </div>
          :
          <></>
        }
        <div>
          Filter by title or content: <Input type='text' name='filter' value={ input.filter } onChange={ handleInputChange } />
        </div>
        Viewing {campaigns
          .filter(p => p.title.toLowerCase().includes(input.filter.toLowerCase())
                        ||
                        p.content.toLowerCase().includes(input.filter.toLowerCase()))
          .length} campaigns
        <div>
          Filter by rating: <Rating name="rating" defaultValue='0' value={score === null ? 0 : score} precision={1} onChange={ handleSubmitFilterScore }/>
          <Button text='All' onClick={ handleSubmitAllCampaigns } />
        </div>
        <div>
          <Button text={ mode.archived ? 'View current' : 'View archived' } onClick={ handleChangeTables } /> 
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
                  <td>{ p.content.substring(0, 150).replace(/<[^>]*>/g,'') }{ p.content.length > 150 ? `...` : <></> }</td>
                  <td>{ new Date(p.created).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }</td>
                  <td>{ p.contacts > 0 ? p.contacts : `n/a` }</td>
                  <td><Rating name={ p.id } defaultValue={ +p.rating } precision={1} onChange={ handleRating } /></td>
                  <td>{ p.published ? `Sent` : `Not sent` }</td>
                  <td>{ p.published || mode.archived ? 'n/d' : <Button text='Publish' onClick={ handlePublish } value={ p.id } /> }</td>
                  <td>{ p.published ?
                    mode.archived ? 'n/d'
                    :
                    <Button text='New copy' onClick={ handleNewCopy } value={ p.id } />
                    :
                    <Button text='Edit' onClick={ handleShowModal } value={ p.id } /> }</td>
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
        <div className={ styles.emptyCrud }>No {mode.archived ? 'archived' : 'current'} campaigns</div>
      }  
    </div>
  );
};

export default MailingCRUD;