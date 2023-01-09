import React, { useEffect } from 'react'
import { TextField,Box, Button, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../../../Redux/Actions/checkout';
import { useRef } from 'react';
import { deleteAddress, putAddresses } from '../../../../Redux/Actions/adresses';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as style from './style.js'


export default function AddressForm(props) {
  const id = props.id
  const token = props.token
  const create = props.create || false
  const user = useSelector(state=>state.user)
  const adress = useSelector(state=>state.adress)
  const [loading,setLoading] = React.useState(false)
  const [inputt,setInputt] = React.useState({
    region:props.region,
    city:props.city,
    postalCode:props.postalCode,
    street:props.street,
    name:props.name,
    disabled:props.disabled
  })
  const input = useRef({region:'',city:'',postalCode:'',street:'',name:''})
  const dispatch = useDispatch()  
  function verification (input){
    if(input.region===''||input.city===''||input.postalCode===''||input.street===''||input.name==='' || loading=== true){
      return true
    }
    else return false
  }
  useEffect(()=>{
    input.current = {
      region:inputt.region,
      city:inputt.city,
      postalCode:inputt.postalCode,
      street:inputt.street,
      name:inputt.name} 
            
  },[inputt,adress])
  
  function handleInput(event){
    event.preventDefault();
    setInputt({...inputt,
      [event.target.id]:event.target.value
    })
    input.current = {...input.current,[event.target.id]:event.target.value}       
  }    
  function handleCreate(event){
    event.preventDefault()
    dispatch(setAddress({idUser:user.uid,token:token,address:input.current}))  
    setLoading(true)  
    setTimeout(()=>{
      window.location.reload()
    },3000)
  }
  function handleSubmit(event){
    event.preventDefault();
    dispatch(putAddresses({idAddress:id,address:input.current,idUser:user.uid, token:token}))
    setInputt({...inputt,disabled:true})    
  }
  function handleDelete(event){
    event.preventDefault();
    dispatch(deleteAddress({
      idUser:user.uid,
      idAddress:id,
      token:token,
    }))
  }


  return (    
      <Box
            
       sx={{        
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}
       >
         <TextField
          error={inputt.name === '' ? true : false}
          value={inputt.name}
          disabled={inputt.disabled}
          required
          id="name"
          label="Name"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
      <TextField
          error={inputt.region === '' ? true : false}
          value={inputt.region}
          disabled={inputt.disabled}
          required
          id="region"
          label="Country"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={inputt.city === '' ? true : false}
          value={inputt.city}
          disabled={inputt.disabled}
          required
          id="city"
          label="City"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={inputt.postalCode === '' ? true : false}
          value={inputt.postalCode}
          disabled={inputt.disabled}
          required
          id="postalCode"
          label="Postal Code"          
          variant="standard"
          onChange={e => handleInput(e)}                   
        />
        <TextField
          error={inputt.street === '' ? true : false}
          value={inputt.street}
          disabled={inputt.disabled}
          required
          id="street"
          label="Adress"          
          variant='standard'
          onChange={e => handleInput(e)}                   
        />
        {inputt.disabled === false && create=== false? (<Button 
        onClick={e=>handleSubmit(e)}
        disabled={verification(inputt)}
        variant="contained" 
        sx={style.button}>Update</Button>): 
      <></>
      }
      {inputt.disabled === false && create === true &&(<Button 
        onClick={e=>handleCreate(e)}
        disabled={verification(inputt)}
        variant="contained" 
        sx={style.button}>Create</Button>)}
      {loading ? <CircularProgress/> : <></>}
      {props && (props.open=== false || !props.open )&&(<Box sx={style.box}>
        <Button 
        onClick={e=>handleDelete(e)}
        variant="contained" 
        sx={style.button} >Delete Address{<DeleteForeverIcon />}</Button>
        
      </Box>)}
      
        </Box>
    
  )
}
