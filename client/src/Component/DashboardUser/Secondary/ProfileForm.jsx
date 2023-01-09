import React from 'react';
import { TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { putProfileUser } from '../../../Redux/Actions/users';
import { getAuth, onAuthStateChanged,  } from 'firebase/auth';




export default function ProfileForm(props) {

    const dispatch=useDispatch()   
    const [state, setState] = React.useState({});
    const auth = getAuth()
 

    const handleChange = (event) => {
        setState({
        ...state,
        [event.target.name]: event.target.value,
        });
        
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit the form
       
        dispatch(putProfileUser({displayName:state.displayName,photoURL:state.photoURL}))
               
    };

  return (
    <Box    
        sx={{        
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
            }}
     >
    
      <TextField  
        label="Name"
        name="displayName"
        onClick={e => e.target.value=''}
        value={props.user.displayName }
        disabled={props.disabled}
        variant="standard"  
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        value={props.user.email } 
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />
      <TextField
        label="phoneNumber"
        name="phoneNumber"
        value={props.user.phoneNumber}
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />
      <TextField
        label="photoURL"
        name="photoURL"
        value={props.user.photoURL }
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />
   
    <Button onClick={handleSubmit} variant="contained" sx={{
    backgroundColor: 'black',
    color:'white'
  }} color="primary">
      Submit
    </Button>
  </Box>
  )
}
