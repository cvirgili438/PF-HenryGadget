import { React, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import styles from './ModalRegister.module.css'
import Button from '@mui/material/Button';
import { Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import validateRegister from '../../Utils/ValidateRegister/ValidateRegister';

function ModalRegister(props) {
  useEffect(()=>{
    props.setErrors(validateRegister(props.input))
  },[props.input])
  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Create account
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Container>
          <Stack spacing={2}>
            <Stack direction='row' spacing={2}>
              <FormControl >
                <InputLabel htmlFor='name'>Name</InputLabel>
                <OutlinedInput 
                  id='name' 
                  label='name'
                  name='name'
                  value={props.input.name}
                  onChange={props.handleInput}
                  />
                <FormHelperText sx={{color:'orange'}}>{props.errors.name ? props.errors.name : ' '}</FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor='Last'>Last name</InputLabel>
                <OutlinedInput 
                  id='Last' 
                  label='Last name'
                  name='lastname'
                  value={props.input.lastname}
                  onChange={props.handleInput}
                  />
                <FormHelperText sx={{color:'orange'}}>{props.errors.lastname ? props.errors.lastname : ' '}</FormHelperText>
              </FormControl>
            </Stack>

            <FormControl sx={{width:'100%'}}>
                <InputLabel htmlFor='Email'>Email</InputLabel>
                <OutlinedInput  
                  id='Email' 
                  label='Email'
                  name='email'
                  value={props.input.email}
                  onChange={props.handleInput}
                  />
                <FormHelperText sx={{color:'orange'}}>{props.errors.email ? props.errors.email : ' '}</FormHelperText>
            </FormControl>

            <FormControl sx={{width:'100%'}}>
                <InputLabel htmlFor='Password'>Password</InputLabel>
                <OutlinedInput  
                  id='Password' 
                  label='Password'
                  name='password'
                  value={props.input.password}
                  onChange={props.handleInput}
                  type={props.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                      onClick={props.handleClickShowPassword}
                      onMouseDown={props.handleMouseDownPassword}
                      edge="end"
                      >
                        {props.showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText sx={{color:'orange'}}>{props.errors.password ? props.errors.password : ' '}</FormHelperText>
            </FormControl>

            <FormControl sx={{width:'100%'}}>
                <InputLabel htmlFor='Confirm'>Confirm Password</InputLabel>
                <OutlinedInput 
                  id='Confirm' 
                  label='Confirm Password'
                  name='confirmPassword'
                  value={props.input.confirmPassword}
                  onChange={props.handleInput}
                  type={props.showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                      onClick={props.handleClickConfrimPassword}
                      onMouseDown={props.handleMouseDownPassword}
                      edge="end"
                      >
                        {props.showConfirmPassword ?<VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText sx={{color:'orange'}}>{props.errors.confirmPassword ? props.errors.confirmPassword : ' '}</FormHelperText>
            </FormControl>
          </Stack>
        </Container>
    </Modal.Body>
    <Modal.Footer>
      <div className={styles.register_container_footer}>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button
          className={styles.register_container_footer_button}
          variant="contained"
          size="lg"
          onClick={props.handleDisplayRegisterModal}
        >
          Back
        </Button>
        <Button
          className={styles.register_container_footer_button}
          variant='contained' 
          size="lg"
          onClick={!props.isLoading ? props.handleSubmit : null}
          disabled={Object.keys(props.errors).length > 0 ? true : false}
        >
          {props.isLoading ? 'Loading...' : 'Register'}
        </Button>
      </div>
    </Modal.Footer>
  </>
  )
}

export default ModalRegister