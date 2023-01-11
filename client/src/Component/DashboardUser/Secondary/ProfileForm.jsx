import React from 'react';
import { TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { putProfileUser } from '../../../Redux/Actions/users';
import { getAuth, onAuthStateChanged,  } from 'firebase/auth';
import styles from './addressForm/AddressForm.module.css'
import ProfileFormGoogle from './ProfileFormGoogle.jsx';
import UploadImage from './UploadImage';




export default function ProfileForm(props) {
    console.log('Props en ProfileForm', props)
    const dispatch=useDispatch()   
    const [state, setState] = React.useState({});
    const auth = getAuth()
 

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
   
    const handleSubmit = (event) => {
        event.preventDefault();
        // submit the form
       if (state.displayName === '' && state.displayName === ''){
        return dispatch(putProfileUser({displayName:props.user.displayName,photoURL:props.user.photoURL}))
       }
       if (state.displayName === '' && state.displayName !== ''){
        return dispatch(putProfileUser({displayName:props.user.displayName,photoURL:state.photoURL}))
       }
       if (state.displayName !== '' && state.displayName === ''){
        return dispatch(putProfileUser({displayName:state.displayName,photoURL:props.user.photoURL}))
       }
       if (state.displayName !== '' && state.displayName !== ''){
        return dispatch(putProfileUser({displayName:state.displayName,photoURL:state.photoURL}))   
       }
                    
    };

  return (
    <Box    
    className={styles.divGlobalActive}
        sx={{        
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
            }}
     >
    {props.user.providerId ===  'google.com' ? (
    <ProfileFormGoogle token={props.token} user={props.user} disabled={props.disabled} />): 
    (
      <div>
        <UploadImage
        token={props.token}
        currentPhoto={props.user.photoURL ? props.user.photoURL : ''}
        displayName={props.user.displayName}
        google={false} 
        disabled={props.disabled}
        phoneNumber={props.user.phoneNumber}
         idUser={props.user.uid}
        />
         {/* <TextField  
        label="Name"
        name="displayName"
        onClick={e => onClick(e)}
        defaultValue={props.user.displayName || 'Please fill this field' }
        disabled={props.disabled}
        variant="standard"  
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        onClick={e => onClick(e)}
        defaultValue={props.user.email || 'Please fill this field'  } 
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />
      <TextField
        label="phoneNumber"
        name="phoneNumber"
        defaultValue={props.user.phoneNumber || 'Please fill this field' }
        onClick={e => onClick(e)}
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />
      <TextField
        label="photoURL"
        name="photoURL"
        defaultValue={props.user.photoURL || 'Please fill this field'  }
        onClick={e => onClick(e)}
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      /> */}
         {/* <Button onClick={handleSubmit} variant="contained" sx={{
          backgroundColor: 'black',
          color:'white'
          }}
          color="primary">
      Submit
    </Button> */}
      </div>
    )}
     
   
 
  </Box>
  )
}
