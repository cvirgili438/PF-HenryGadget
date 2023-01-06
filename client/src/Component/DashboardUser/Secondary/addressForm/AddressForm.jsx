import React, { useEffect } from 'react'
import { TextField,Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setLocalAdress } from '../../../../Redux/Actions/checkout';
import { useRef } from 'react';


export default function AddressForm(props) {
  const id = props.id
  const token = props.token
  const [inputt,setInputt] = React.useState({
    region:props.region,
    city:props.city,
    postalCode:props.postalCode,
    street:props.street,
    name:props.name
  })
  const input = useRef({region:'',city:'',postalCode:'',street:'',name:''})
  const dispatch = useDispatch()
  const stepperButton = document.getElementById('Finish-Button')  
  useEffect(()=>{
    input.current = {
      region:inputt.region,
      city:inputt.city,
      postalCode:inputt.postalCode,
      street:inputt.street,
      name:inputt.name}
    dispatch(setLocalAdress(input.current))
     
    
  },[inputt])
  
  function handleInput(event){
    event.preventDefault();
    setInputt({...inputt,
      [event.target.id]:event.target.value
    })
    input.current = {...input.current,[event.target.id]:event.target.value}
    dispatch(setLocalAdress(input.current))    
  }    
  return (
    
      <Box
       component={'form'}        
       sx={{        
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}
       >
         <TextField
          error={inputt.name === '' ? true : false}
          value={inputt.name}
          required
          id="name"
          label="Name"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
      <TextField
          error={inputt.region === '' ? true : false}
          value={inputt.region}
          required
          id="region"
          label="Country"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={inputt.city === '' ? true : false}
          value={inputt.city}
          required
          id="city"
          label="City"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={inputt.postalCode === '' ? true : false}
          value={inputt.postalCode}
          required
          id="postalCode"
          label="Postal Code"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={inputt.street === '' ? true : false}
          value={inputt.street}
          required
          id="street"
          label="Adress"          
          variant='standard'
          onChange={e => handleInput(e)}                   
        />
        <Button id='Finish-Button' 
        variant="contained" 
        sx={{
        backgroundColor: 'black',
        color:'white'
      }}>Finish</Button>
        </Box>
    
  )
}
