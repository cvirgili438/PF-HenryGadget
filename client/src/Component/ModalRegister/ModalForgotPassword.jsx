import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from '@mui/material/Button';
import { Box, Container, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { Button_contained_primary } from '../../Utils/MiuStyles/MiuStyles';


function ModalForgotPassword(props) {

  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title>
        Restore password
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <Container>
      <FormControl sx={{width:'100%'}}>
         <InputLabel htmlFor='Email'>Email</InputLabel>
           <OutlinedInput  
              id='Email' 
              label='Email'
              name='email_restore'
              value={props.input.email_restore}
              onChange={props.handleInput}
                  />
           <FormHelperText sx={{color:'orange'}}>{props.errors.msg_password_restore ? props.errors.msg_password_restore : " "}</FormHelperText>
      </FormControl>
     </Container>
    </Modal.Body>
    <Modal.Footer>
      <Box sx={{
        width:'100%',
        display:'flex',
        justifyContent:'space-between'
      }}>
        
        <Button variant='contained' sx={Button_contained_primary} onClick={props.handleDisplayForgotPassword}>Back</Button>
        <Button variant='contained' sx={Button_contained_primary} onClick={()=>props.forgotPassword(props.input.email_restore)}>Restore</Button>
      </Box>
    </Modal.Footer>
    </>
  )
}

export default ModalForgotPassword