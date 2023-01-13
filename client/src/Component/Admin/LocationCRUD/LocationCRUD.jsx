import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalAp from 'react-bootstrap/Modal';
import ModalNx from 'react-bootstrap/Modal';
import Alert2 from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
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
  deleteLocation,
  updateLocationAp,
  getLocationAppointments,
  deleteAppointmentAdmin
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
    new: false,
    normalDates: [],
    specialDates: ''
  });

  const [selected, setSelected] = useState([]);
  // const [score, setScore] = useState(null);
  const [mode, setMode] = useState({archived: false});

  const user = useSelector(state => state.user)
  const [token, setToken] = useState('');
  const auth = getAuth();

  const [show, setShow] = useState(false);
  const [showAp, setShowAp] = useState(false);
  const [showNx, setShowNx] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [switchDay, setSwitchDay] = useState({0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false})
  const [initialAp, setInitialAp] = useState({})
  const [finalAp, setFinalAp] = useState({})

  const locations = useSelector(state => state.locations);
  const appointments = useSelector(state => state.appointments);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    let temp = e.target.value;
    if (e.target.name === 'lat') {
      if (temp > 90) temp = 90; 
      if (temp < -90) temp = -90;
    }
    if (e.target.name === 'lon') {
      if (temp > 180) temp = 180; 
      if (temp < -180) temp = -180;
    }
    setInput({
      ...input,
      [e.target.name]: temp,
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

  const handleShowModalAp = (e) => {
    setInput({
      ...input,
      new: false,
      id: e.target.value,
      name: locations.filter(p => p.id === e.target.value )[0].name,
      normalDates: locations.filter(p => p.id === e.target.value )[0].aPnormalDates,
      specialDates: locations.filter(p => p.id === e.target.value )[0].aPspecialDates
    });
    let tempDay, tempInitialAp, tempFinalAp = {}
    for (let i = 0; i < 7; i++) {
      tempDay = {...tempDay, [i]: locations.filter(p => p.id === e.target.value )[0].aPnormalDates[i][i].length !== 0}
      tempInitialAp = {...tempInitialAp, [i]: locations.filter(p => p.id === e.target.value )[0].aPnormalDates[i][i][0]}
      tempFinalAp = {...tempFinalAp, [i]: locations.filter(p => p.id === e.target.value )[0].aPnormalDates[i][i][1]}
    }
    setSwitchDay(tempDay);
    setInitialAp(tempInitialAp);
    setFinalAp(tempFinalAp);
    setShowAp(true);
  };

  const handleCloseModalAp = () => {
    setInput({
      ...input,
      new: false,
      id: false,
      normalDates: [],
      specialDates: ''
    });
    setSwitchDay({0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false})
    setInitialAp({});
    setFinalAp({});
    setShowAp(false);
  }

  const handleSaveModalAp = (e) => {
    dispatch(updateLocationAp({
      id: input.id,
      mode: mode,
      token: token,
      aPspecialDates: input.specialDates,
      aPnormalDates: [
        {0: switchDay[0] ? [initialAp[0], finalAp[0]] : []},
        {1: switchDay[1] ? [initialAp[1], finalAp[1]] : []},
        {2: switchDay[2] ? [initialAp[2], finalAp[2]] : []},
        {3: switchDay[3] ? [initialAp[3], finalAp[3]] : []},
        {4: switchDay[4] ? [initialAp[4], finalAp[4]] : []},
        {5: switchDay[5] ? [initialAp[5], finalAp[5]] : []},
        {6: switchDay[6] ? [initialAp[6], finalAp[6]] : []}
      ]
    }));
    setShowAp(false);
  }

  const handleShowModalNx = (e) => {
    setInput({
      ...input,
      id: e.target.value,
      name: locations.filter(p => p.id === e.target.value )[0].name,
    });
    dispatch(getLocationAppointments({id: e.target.value, token: token}))
    setShowNx(true);
  }

  const handleCloseModalNx = () => {
    setInput({
      ...input,
      id: false,
      name: false,
    });
    setShowNx(false);
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

  const handleChangeDay = (e) => {
    setSwitchDay({
      ...switchDay,
      [e.target.id]: !switchDay[e.target.id]
    })
  }

  const handleChangeInitial = (e) => {
    setInitialAp({
      ...initialAp,
      [e.target.id - 1]: e.target.value
    })
    if (e.target.value > finalAp[e.target.id - 1]) {
      setFinalAp({
        ...finalAp,
        [e.target.id - 1]: e.target.value
      })
    }
  }

  const handleChangeFinal = (e) => {
    setFinalAp({
      ...finalAp,
      [e.target.id - 1]: e.target.value
    })
    if (e.target.value < initialAp[e.target.id - 1]) {
      setInitialAp({
        ...initialAp,
        [e.target.id - 1]: e.target.value
      })
    }
  }

  const handleDeleteAppointment = (e) => {
    dispatch(deleteAppointmentAdmin({id: e.nativeEvent.originalTarget.id, token: token, location: input.id}))
  }
 
  var intervals = [];
  for (var hours = 0; hours <= 23; hours++) {
      for (var minutes = 0; minutes <= 45; minutes += 15) {
          var time = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
          intervals.push(time);
      }
  }    

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
          {
            !input.name || !input.address ?
            <Button text={ `Missing data!` } disabled={ true } />
            :
            <Button text={ input.new ? `Create` : `Save` } onClick={ handleSaveModal } />
          }
        </Modal.Footer>
      </Modal>
      <ModalAp show={showAp} onHide={ handleCloseModalAp } size="lg">
        <ModalAp.Header closeButton>
          <ModalAp.Title>Available appointments for { input.name }</ModalAp.Title>
        </ModalAp.Header>
        <ModalAp.Body>
          <Form>
            <div className={ styles.formAp }>
              <table className={ styles.formApTable }>
                <thead>
                  <tr>
                    <th></th>
                    <th>First appointment</th>
                    <th>Last appointment</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {
                    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    .map((p, i) => (
                      <tr>
                        <td>
                          <Switch checked={ switchDay[i] } onChange={ handleChangeDay } id={ i } size="lg" />
                          <Form.Label srOnly={false} >{ p }</Form.Label>
                        </td>
                        <td>
                          <Form.Select aria-label="First appointment" style={{ width: "130px" }}
                                onChange={ handleChangeInitial } id={ i + 1 } disabled={ !switchDay[i] }>
                            {
                              switchDay[i] ?
                                intervals.map((p, j) => (
                                  <option value={ p } selected={ initialAp[i] === p ? 'selected' : null } 
                                                    className={ initialAp[i] === p ? styles.selected : null }>{ p }</option>
                                ))
                              : null
                            }
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Select aria-label="First appointment" style={{ width: "130px" }}
                                onChange={ handleChangeFinal } id={ i + 1 } disabled={ !switchDay[i] }>
                            {
                              switchDay[i] ?
                                intervals.map((p, j) => (
                                  <option value={ p } selected={ finalAp[i] === p ? 'selected' : null }
                                                    className={ finalAp[i] === p ? styles.selected : null }>{ p }</option>
                                ))
                              : null
                            }
                          </Form.Select>
                        </td>
                      </tr>
                    ))
                  }
                  
                </tbody>
              </table>
            </div>
            <Form.Group as={Col} controlId="exampleForm.ControlInput5">
            <Tooltip title="These dates will not be available for this location. Everything between * * are comments. Dates in YYYY-MM-DD format. Use ',' as separator. Use ',' at end of each line. Invalid dates will be ommited.">
              <IconButton>
              <HelpIcon  />
              </IconButton>
            </Tooltip>&nbsp;<Form.Label>Special no appointment dates</Form.Label>
                <Form.Control as="textarea"  placeholder="*see instructions for setting special dates*"
                              name='specialDates' value={ input.specialDates } onChange={ handleInputChange } />
              </Form.Group>
          </Form>
        </ModalAp.Body>
        <ModalAp.Footer>
          <Button text="Discard" onClick={ handleCloseModalAp } />
          <Button text="Save" onClick={ handleSaveModalAp } />
        </ModalAp.Footer>
      </ModalAp>
      <ModalNx show={showNx} onHide={ handleCloseModalNx } size="md">
        <ModalNx.Header closeButton>
          <ModalNx.Title>Next clients appointed for { input.name }</ModalNx.Title>
        </ModalNx.Header>
        <ModalNx.Body>
          {
            appointments && appointments.length > 0 ?
              <>
              {
                appointments.map((p, i) => (
                  <ListGroup.Item>
                    <Tooltip title="Delete appointment... THIS CAN'T BE UNDONE">
                      <DeleteForeverOutlinedIcon onClick={ handleDeleteAppointment } id={ p.id } />
                    </Tooltip>
                    &nbsp;{ p.date } - { p.time }: { p.email }
                  </ListGroup.Item>
                ))
              }
              </>
              
              :
              'No appointments'
          }
          <ListGroup>
            
          </ListGroup>
        </ModalNx.Body>
        <ModalNx.Footer>
          <Button text="Close" onClick={ handleCloseModalNx } />
        </ModalNx.Footer>
      </ModalNx>
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
                  <th>Clients</th>
                  <th>Calendar</th>
                  <th>Location</th>
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
                    <td><Button text='Next clients' onClick={ handleShowModalNx } value={ p.id } /></td>
                    <td><Button text='Edit calendar' onClick={ handleShowModalAp } value={ p.id } /></td>
                    <td><Button text='Edit location' onClick={ handleShowModal } value={ p.id } /></td>
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