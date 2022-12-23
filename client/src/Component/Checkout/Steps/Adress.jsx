import React from 'react'
import { TextField,Box } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setLocalAdress } from '../../../Redux/Actions/checkout';
import { useRef } from 'react';


export default function Adress() {
  const [inputt,setInputt] = React.useState({region:'',city:'',postalCode:'',street:'',name:''})
  const input = useRef({region:'',city:'',postalCode:'',street:'',name:''})
  const dispatch = useDispatch()
  
  function handleInput(event){
    event.preventDefault();
    setInputt({
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
        </Box>
    </div>
  )
}
