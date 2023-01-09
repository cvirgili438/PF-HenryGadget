import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TextField,Box, FormControl } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setLocalAdress } from '../../../Redux/Actions/checkout';
import { useRef } from 'react';

import styles from "./Address.module.css";
import AddressBox from './AddressBox.jsx';

import { URL } from '../../../Redux/Constants';
import Total from '../../CartPage/Total';
import { width } from '@mui/system';

export default function Adress() {
  const [address, setAddress] = useState([]);
  const [inputt,setInputt] = React.useState({region:'',city:'',postalCode:'',street:'',name:'', type: 'shipping', principal: true});
  const [idActive, setIdActive] = useState('');

  const input = useRef({region:'',city:'',postalCode:'',street:'',name:'',type: 'shipping', principal: true});
  
  const stepperButton = document.getElementById('stepper-button');
  
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    axios(`${URL}/address?idUser=${user.uid}`)
         .then(res => {
            if(res.data.result.length === 0) return;

            setAddress([...address, ...res.data.result]);
         })
         .catch(err => console.log(err))

    return stepperButton.className= stepperButton.className.concat(' Mui-disabled')
  }, [])
  
  
  useEffect(()=>{
    let {region,city,postalCode,street,name} = input.current

    if(region === '' || city === '' || postalCode === '' || street === '' || name === ''){
      if(stepperButton.className.includes(' Mui-disabled')) {return}
      else return stepperButton.className= stepperButton.className.concat(' Mui-disabled')
    }
    
    if(region !== '' || city !== '' || postalCode !== '' || street !== '' || name !== ''){
      if(!stepperButton.className.includes(' Mui-disabled')){return }
      let location = stepperButton.className.indexOf(' Mui-disabled')
      return stepperButton.className= stepperButton.className.slice(0,location)
    }
  },[inputt])
  
  function handleInput(event){
    event.preventDefault();
    setInputt({...inputt,
      [event.target.id]:event.target.value
    })
    input.current = {...input.current,[event.target.id]:event.target.value}
    dispatch(setLocalAdress(input.current))    
  }  
  
  function setAsPrincipal(addressId){
    axios.put(`${URL}/address/principal`, {idUser: user.uid, idAddress: addressId});
    setIdActive(addressId)
  }

  function setNotPrincipal(addressId){
    axios.put(`${URL}/address`, {idUser: user.uid, address: {principal: false}, idAddress: addressId});
    setIdActive('')
  }

  return(
    <div className={styles.divGlobal}>
      <div className={styles.divTitle}>
        {address.length === 0
          ? <h3>Please add your shipping address</h3>
          : <h3>Select your shipping address</h3>
        }
      </div>
      <hr className={styles.hr1}/>
      <div className={styles.divContent}> 
        <div>
        {address.length === 0 
          ?
          <div className={styles.divInputAddress}>
            <Box
              component={'form'}        
              sx={{        
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                flexWrap: 'wrap',
                marginLeft: "200px",
                marginTop: "20px"
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
          </div> 
          : address.map(a => {
              if(a.type === 'shipping' && a.id === idActive){
                return <AddressBox
                key={a.id}
                id={a.id}
                name={a.name}
                street={a.street}
                city={a.city}
                postalCode={a.postalCode}
                region={a.region}
                type='address'
                principal={true}
                setFunction={setNotPrincipal}
              />
              }

              if(a.type === 'shipping'){
                return <AddressBox
                  key={a.id}
                  id={a.id}
                  name={a.name}
                  street={a.street}
                  city={a.city}
                  postalCode={a.postalCode}
                  region={a.region}
                  type='address'
                  principal={false}
                  setFunction={setAsPrincipal}
                />
              }
            })
        }
        {address.length !== 0 && <AddressBox type='add'/>}
        <div>
          <label className={styles.checkbox} for="myCheckboxId">
            <input onClick={() => {/* Future code */}} className={styles.checkbox__input} type="checkbox" name="myCheckboxName" id="myCheckboxId"/>
            <div className={styles.checkbox__box}></div>
            Yes, I want to use my shipping address as billing address.
          </label>
        </div>
        </div>
        <div className={styles.divTotal}>
          <Total/>
        </div>
      </div>
    </div>
  )
}
