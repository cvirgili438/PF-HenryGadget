import React, { useEffect } from 'react'
import { TextField,Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setLocalAdress } from '../../../Redux/Actions/checkout';
import { useRef } from 'react';


export default function AddressForm() {
  const [inputt,setInputt] = React.useState({region:'',city:'',postalCode:'',street:'',name:''})
  const input = useRef({region:'',city:'',postalCode:'',street:'',name:''})
  const dispatch = useDispatch()
  const stepperButton = document.getElementById('Finish-Button')  
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
  return (
    <div>
      <Box
       component={'form'}        
       sx={{        
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}
       >
         <TextField
          error={input.current.name === '' ? true : false}
          required
          id="name"
          label="Name"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
      <TextField
          error={input.current.region === '' ? true : false}
          required
          id="region"
          label="Country"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={input.current.city === '' ? true : false}
          required
          id="city"
          label="City"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={input.current.postalCode === '' ? true : false}
          required
          id="postalCode"
          label="Postal Code"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={input.current.street === '' ? true : false}
          required
          id="street"
          label="Adress"          
          variant='standard'
          onChange={e => handleInput(e)}                   
        />
        <Button id='Finish-Button'>Finish</Button>
        </Box>
    </div>
  )
}
