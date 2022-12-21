import React from 'react'
import { TextField,Box } from '@mui/material'

export default function Adress() {
  const [input,setInput] = React.useState({country:'',city:'',postalCode:'',adress:''})

  function handleInput(event){
    event.preventDefault();
    setInput({
      [event.target.id]:event.target.value
    })
    

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
          error={input.country === '' ? true : false}
          required
          id="country"
          label="Country"          
          variant="standard"
          onChange={e => handleInput(e)}
                   
        />
        <TextField
          error={input.city === '' ? true : false}
          required
          id="city"
          label="City"          
          variant="standard"
          onChange={e => handleInput(e)}
                   
        />
        <TextField
          error={input.postalCode === '' ? true : false}
          required
          id="postalCode"
          label="Postal Code"          
          variant="standard"
          onChange={e => handleInput(e)}
                   
        />
        <TextField
          error={input.adress === '' ? true : false}
          required
          id="adress"
          label="Adress"          
          variant='standard'
          onChange={e => handleInput(e)}
                   
        />
        </Box>
    </div>
  )
}
