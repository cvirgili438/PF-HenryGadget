import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert2 from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Switch from '@mui/material/Switch';
// import Rating from '@mui/material/Rating';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Buttons/Button';


import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  getAdminLocations,
  changeLocationVisible,
  changeLocationArchive,
  updateLocation,
  createLocation,
  deleteLocation
} from '../../../Redux/Actions/locations.js';

import styles from './LocationCRUD.module.css';

const LocationCRUD = () => {
  const [input, setInput] = useState({
    filter: '',
    name: '',
    address: '',
    contact: '',
    lat: null,
    lon: null,
    id: false,
    new: false
  });

  const [selected, setSelected] = useState([]);
  // const [score, setScore] = useState(null);
  const [mode, setMode] = useState({archived: false});

  const user = useSelector(state => state.user)
  const [token, setToken] = useState('');
  const auth = getAuth();

  const [show, setShow] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const locations = useSelector(state => state.locations);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeVisible = e => {
    dispatch(changeLocationVisible({ids: [e.target.id], archived: mode.archived, token: token}));
  };

  const handleChangeArchive = e => {
    dispatch(changeLocationArchive({ids: [e.target.value], archived: mode.archived, token: token}));
    setSelected([]);
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeLocationArchive({ids: selected, archived: mode.archived, token: token}));
    setSelected([]);
  };

  // const handleSubmitFilterScore = e => {
  //   setScore(e.target.value);
  // };

  // const handleSubmitAllReviews = e => {
  //   setScore(null);
  // };

  const handleShowModal = (e) => {
    if (e.target.value !== '0') {
      setInput({
        ...input,
        new: false,
        id: e.target.value,
        name: locations.filter(p => p.id === e.target.value )[0].name,
        address: locations.filter(p => p.id === e.target.value )[0].address,
        contact: locations.filter(p => p.id === e.target.value )[0].contact,
        lat: locations.filter(p => p.id === e.target.value )[0].lat,
        lon: locations.filter(p => p.id === e.target.value )[0].lon,
      });
    } else {
      setInput({
        ...input,
        id: false,
        new: false,
        name: '',
        address: '',
        contact: '',
        lat: null,
        lon: null
      });
    }
    setShow(true);
  };

  const handleSaveModal = (e) => {
    if (input.id) {
      dispatch(updateLocation({
        name: input.name,
        address: input.address,
        contact: input.contact,
        lat: input.lat, 
        lon: input.lon,
        id: input.id,
        mode: mode,
        token: token}));
      setShow(false);
    } else {
      dispatch(createLocation({
        name: input.name, 
        address: input.address, 
        contact: input.contact,
        lat: input.lat, 
        lon: input.lon,
        token: token}));
      setShow(false);
    }
    setShow(false);
  }
  

  const handleShowModalAp = (e) => {
    if (e.target.value !== '0') {
      setInput({
        ...input,
        new: false,
        id: e.target.value,
        name: locations.filter(p => p.id === e.target.value )[0].name,
        address: locations.filter(p => p.id === e.target.value )[0].address,
        contact: locations.filter(p => p.id === e.target.value )[0].contact,
        lat: locations.filter(p => p.id === e.target.value )[0].lat,
        lon: locations.filter(p => p.id === e.target.value )[0].lon,
      });
    } else {
      setInput({
        ...input,
        id: false,
        new: false,
        name: '',
        address: '',
        contact: '',
        lat: null,
        lon: null
      });
    }
    setShow(true);
  };


  const handleSubmitDelete = e => {
    setDeleteId(e.target.value);
    setAlert2(true);
  };

  const handleConfirmDelete = (e) => {
    dispatch(deleteLocation({id: deleteId, archived: mode.archived, token: token}));
    setDeleteId(false);
    setAlert2(false);
    setSelected([]);
  }

  const handleCancelDelete = (e) => {
    setDeleteId(false);
    setAlert2(false);
  }

  const handleCloseModal = () => {
    setInput({
      ...input,
      id: false,
      new: false,
      name: '',
      address: '',
      contact: '',
      lat: null,
      lon: null
    });
    setShow(false);
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

  const handleChangeTables = e => {
    if (mode.archived === true) {
      setMode({archived: false});
    } else {
      setMode({archived: true})
    }
    setSelected([]);
  };

  useEffect(() => {
    dispatch(getAdminLocations({archived: mode.archived, token: token}))

    onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((result) => {
					setToken(result);
				});
			}
		});

  }, [dispatch, mode, auth, token]);

  return (
    <div className={ styles.container }>
      <Modal show={show} onHide={ handleCloseModal } size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="* required *" autoFocus name='name' value={ input.name } onChange={ handleInputChange } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="* required *" name='address' value={ input.address } onChange={ handleInputChange } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" placeholder="" name='contact' value={ input.contact } onChange={ handleInputChange } />
            </Form.Group>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="exampleForm.ControlInput4">
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="number" placeholder=""  name='lat' value={ input.lat } onChange={ handleInputChange } />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlInput5">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="number"  placeholder="" name='lon' value={ input.lon } onChange={ handleInputChange } />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Discard" onClick={ handleCloseModal } />
          <Button text={ input.new ? `Create` : `Save` } onClick={ handleSaveModal } />
        </Modal.Footer>
      </Modal>
      <Alert2 show={alert2} variant="danger">
        <Alert2.Heading>Danger</Alert2.Heading>
        <p>
          You are about to delete store <i>'{deleteId ? locations.filter(p => p.id === deleteId )[0].title : <></>}'</i>.<br />Do you want to proced? (this action <b>can not be undone</b>)
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
            <Button text='New store' onClick={ handleShowModal } value='0' /> 
          </div>
          :
          <></>
        }
        <div>
          Filter by name, address or contact: <Input type='text' name='filter' value={input.filter} onChange={ handleInputChange } />
        </div>
        Viewing {locations
          .filter(p => p.name.toLowerCase().includes(input.filter.toLowerCase())
                      ||
                      p.address.toLowerCase().includes(input.filter.toLowerCase())
                      ||
                      p.contact.toLowerCase().includes(input.filter.toLowerCase()))
          // .filter(p => score === null ? p : +p.score === +score)
          .length} locations
        {/* <div>
          Filter by rating: <Rating name="rating" defaultValue='0' value={score === null ? 0 : score} precision={0.5} onChange={handleSubmitFilterScore}/>
          <Button text='All' onClick={handleSubmitAllReviews} />
        </div> */}
        <div>
          <Button text={ mode.archived ? 'View current' : 'View archived' } onClick={ handleChangeTables } /> 
        </div>
      </div>
      { 
        locations.length > 0 ?
          <div className={ styles.tableContainer }>
            <table className={ styles.table }>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Select</th>
                  {/* <th>Img</th> */}
                  <th>Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Position</th>
                  {/* <th>Rating</th> */}
                  <th>Visible</th>
                  <th>Appointments</th>
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
                locations
                .filter(p => p.name.toLowerCase().includes(input.filter.toLowerCase())
                            ||
                            p.address.toLowerCase().includes(input.filter.toLowerCase())
                            ||
                            p.contact.toLowerCase().includes(input.filter.toLowerCase()))
                // .filter(p => score === null ? p : +p.score === +score)
                .map((p, i) => (
                  <tr key={ p.id }>
                    <td>{ i + 1 }</td>
                    <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                    {/* <td><img src={ p.product.img[0] } alt={ p.product.name } className={ styles.productImage } /></td> */}
                    <td>{ p.name }</td>
                    <td>{ p.address }</td>
                    <td>{ p.contact }</td>
                    <td>{ p.lat ? `Lat: ${p.lat}` : 'n/d' } / { p.lon ? `Lon: ${p.lon}` : 'n/d' }</td>
                    {/* <td><Rating name="rating" defaultValue={ p.score } precision={0.5} readOnly='true' /></td> */}
                    <td><Switch checked={ p.visible } onChange={ handleChangeVisible } id={ p.id } /></td>
                    <td><Button text='Appointments' onClick={ handleShowModalAp } value={ p.id } /></td>
                    <td><Button text='Edit' onClick={ handleShowModal } value={ p.id } /></td>
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
      <div className={ styles.emptyCrud }>No {mode.archived ? 'archived' : 'current'} locations to admin</div>
    }  
  </div>
  );
};

export default LocationCRUD;