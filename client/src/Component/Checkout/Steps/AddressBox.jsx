import React from 'react';
import axios from 'axios';

import { TextField,Box, FormControl } from '@mui/material'

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "./AddressBox.module.css";

import {MdLocationOn} from "react-icons/md";
import {IoAddCircleOutline} from "react-icons/io5";
import {BsCheckCircle} from "react-icons/bs";

import { setLocalAdress } from '../../../Redux/Actions/checkout';

import { URL } from '../../../Redux/Constants';

export default function AddressBox({name, street, region, city, postalCode, type, id, setFunction, principal}) {

  const [formActive, setFormActive] = useState(true);
  const [addressSettled, setAddressSettled] = useState(false)
  const [inputt,setInputt] = React.useState({region:'',city:'',postalCode:'',street:'',name:'', type: 'shipping', principal: true});
  
  const input = useRef({region:'',city:'',postalCode:'',street:'',name:'',type: 'shipping', principal: true});

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const stepperButton = document.getElementById('stepper-button');

  useEffect(()=>{
    let {region,city,postalCode,street,name} = input.current

    if(region === '' || city === '' || postalCode === '' || street === '' || name === ''){
      if(!stepperButton.className.includes(' Mui-disabled')){return }
      let location = stepperButton.className.indexOf(' Mui-disabled')
      return stepperButton.className= stepperButton.className.slice(0,location)
    }
    
    if(region !== '' || city !== '' || postalCode !== '' || street !== '' || name !== ''){
      if(stepperButton.className.includes(' Mui-disabled')) {return}
      else return stepperButton.className= stepperButton.className.concat(' Mui-disabled')
    }
  },[inputt])

  function handleInput(event){
    event.preventDefault();
    setInputt({...inputt,
      [event.target.id]:event.target.value
    })  
  }  

  function setAddressAsPrincipal(){
    axios.post(`${URL}/address`, {idUser: user.uid, address: inputt})
      .then(res => {
        const idAddress = res.data.result.id;

        axios.put(`${URL}/address/principal`, {idUser: user.uid, idAddress: idAddress})
             .then(res => {setAddressSettled(true)})
             .catch(err => console.log(err));
      })
      .catch(err => console.log(err))

    axios.post(`${URL}/address`, {idUser: user.uid, address:{...inputt, type: 'billing'}})
      .then(res => {})
      .catch(err => console.log(err))

      return;
  }


  if(type === 'add'){
    return(
      <div>
        <div onClick={() => setFormActive(!formActive)} className={styles.divGlobal}>
          <div>
            {addressSettled
              ? <BsCheckCircle className={styles.icon}/>
              : <IoAddCircleOutline className={styles.icon}/>
            }
          </div>
          <div className={styles.divContent}>
            <div className={styles.divBody}>
              <span>Add a different address</span>
            </div>
          </div>
        </div>

        <div>
          <div className={formActive ? styles.divHidden : styles.divInputAddress}>
              <Box
                component={'form'}        
                sx={{        
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  flexWrap: 'wrap',
                  width: "80%",
                  marginTop: "20px",
                  marginLeft: "60px"
                }}
              >
                <TextField
                  error={input.current.name === '' ? true : false}
                  required
                  fullWidth
                  id="name"
                  label="Home or Work"  
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.region === '' ? true : false}
                  required
                  fullWidth
                  id="street"
                  label="Street"          
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.city === '' ? true : false}
                  required
                  fullWidth
                  id="city"
                  label="City"          
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.postalCode === '' ? true : false}
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"          
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.street === '' ? true : false}
                  required
                  fullWidth
                  id="region"
                  label="Country"          
                  variant='standard'
                  onChange={e => handleInput(e)}                   
                />
              </Box>
              <button disabled={addressSettled} onClick={() => setAddressAsPrincipal()} className={styles.addButton}>{addressSettled ? 'Address succesfully added' : 'Use as shipping address'}</button>
            </div> 
          </div>
        </div>
    )
  }
  if(type === 'address') {
    return (
      <div onClick={() => {setFunction(id)}} className={principal ? styles.divGlobalActive : styles.divGlobal}>
        <div>
          <MdLocationOn className={styles.icon}/>
        </div>
        <div className={styles.divContent}>
          <div className={styles.divName}>
            <h4 className={styles.name}>{name}</h4>
          </div>
          <div className={styles.divBody}>
            <span>{street}</span>
            <span>{city}</span>
            <span>{postalCode}</span>
            <span>{region}</span>
          </div>
        </div>
      </div>
    )
  }
}
