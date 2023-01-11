import React from 'react';
import { TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { putProfileUser } from '../../../Redux/Actions/users';
import { getAuth, onAuthStateChanged,  } from 'firebase/auth';
import styles from './addressForm/AddressForm.module.css'
import UploadImage from './UploadImageGoogle';
import UploadImageGoogle from './UploadImageGoogle';



export default function ProfileFormGoogle(props) {
    let errors = {}
    function error (input){
        var numberRegex = /^\d+$/;
        if(!numberRegex.test(input)){
            errors.phoneNumber = false    }
        return numberRegex.test(input);
    }
    function disabledButton(errors){
        if(errors.phoneNumber === false){
            return true
        }
        else return false
    }
    console.log('propsdeformgoogle',props)
    const dispatch=useDispatch()   
    const [state, setState] = React.useState({phoneNumber: '', photoURL : ''});
    
 

    const handleChange = (event) => {        
        setState({
        ...state,
        [event.target.name]: event.target.value,
        });        
        
    };
    function onClick(e){
      e.preventDefault();
      if(e.target.disabled === true){
        return
      }
      if(e.target.disabled === false){
        e.target.value= ''
      }
    }
    const phone = document.getElementsByName('phoneNumber')
  
    const handleSubmit = (event) => {
        event.preventDefault();
        // submit the form
        if(state.photoURL === '' && props.user.photoURL !== '' ){setState({...state,photoURL:props.user.photoURL})}
       dispatch(putProfileUser({
        google:true,
        idUser:props.user.uid,
        phoneNumber:state.phoneNumber,
        photoURL:state.photoURL}))               
    };

  return (
   <div className={styles.divCenter}>    
     
      {/* <TextField        
        error={!error(state.phoneNumber)}
        helperText={'Without spaces'}
        label="phoneNumber"
        name="phoneNumber"
        defaultValue={props.user.phoneNumber || 'Please fill this field' }
        onClick={e => onClick(e)}
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      /> */}
      {/* <TextField
        label="photoURL"
        name="photoURL"
        defaultValue={props.user.photoURL || 'Please fill this field'  }
        onClick={e => onClick(e)}
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />    */}
      <UploadImageGoogle
      currentPhoto={props.user.photoURL ? props.user.photoURL : ''}
      google={true} 
      disabled={props.disabled}
      phoneNumber={props.user.phoneNumber}
       idUser={props.user.uid} />
        {/* <Button onClick={handleSubmit} variant="contained" 
        disabled={disabledButton(errors)}
        sx={{
          backgroundColor: 'black',
          color:'white'
          }}
          color="primary">
      Submit
    </Button> */}
    </div>
  )
}
