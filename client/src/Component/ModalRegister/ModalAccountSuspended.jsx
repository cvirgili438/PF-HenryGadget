import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from '@mui/material/Button';
import { Box, Container, FormControl, FormHelperText, InputLabel, OutlinedInput, Separator } from '@mui/material';
import { Button_contained_primary } from '../../Utils/MiuStyles/MiuStyles';


function ModalAccountSuspended(props) {

  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title>
        Account suspended
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Your account has been suspended, contact support for help.
    </Modal.Body>
    <Modal.Footer>
      <Box sx={{
        width:'100%',
        display:'flex',
        justifyContent:'space-between'
      }}>
        
        <Button variant='contained' sx={Button_contained_primary} onClick={props.handleDisplayAccountSuspended}>Back</Button>
      </Box>
    </Modal.Footer>
    </>
  )
}

export default ModalAccountSuspended